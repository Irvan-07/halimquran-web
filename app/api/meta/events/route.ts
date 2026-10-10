import { META_PIXEL_ID, isPrivatePath } from "@/lib/analytics/meta-pixel";

// Server copy of the browser pixel events, sent to Meta's Conversions API.
// The browser calls this endpoint with the same event_id it gave the pixel, so
// Meta counts the pair once (deduplication) yet still has the event when an ad
// blocker or privacy setting stops the pixel. Scalev's own relay never
// delivered these (only 2 server events in 3 days), hence this route.
//
// The access token is a Worker secret (META_CAPI_TOKEN) and never leaves the
// server. Purchase is NOT accepted here: Scalev fires it with the order id.

const GRAPH_VERSION = "v23.0";
const ALLOWED_HOSTS = ["halimquran.com", "www.halimquran.com"];
const ALLOWED_EVENTS = new Set(["ViewContent", "AddToCart", "InitiateCheckout"]);
const MAX_BODY_BYTES = 8 * 1024;
const CUSTOM_DATA_KEYS = [
  "content_type",
  "content_ids",
  "content_name",
  "content_category",
  "contents",
  "value",
  "currency",
  "num_items",
] as const;

const NO_CONTENT = new Response(null, { status: 204 });

function str(value: unknown, max: number): string | undefined {
  return typeof value === "string" && value.length > 0 && value.length <= max ? value : undefined;
}

export async function POST(request: Request) {
  // Browsers always send Origin on a cross-origin-capable POST; scripts that
  // omit it or use another site's origin are turned away.
  let origin: URL | null = null;
  try {
    origin = new URL(request.headers.get("origin") ?? "");
  } catch {
    origin = null;
  }
  if (!origin || !ALLOWED_HOSTS.includes(origin.hostname)) {
    return new Response(null, { status: 403 });
  }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) return new Response(null, { status: 503 });

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return new Response(null, { status: 413 });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }

  const eventName = str(body.event_name, 40);
  const eventId = str(body.event_id, 80);
  if (!eventName || !ALLOWED_EVENTS.has(eventName) || !eventId) {
    return new Response(null, { status: 400 });
  }

  // Only page addresses on our own domain, and never the private ones.
  let sourceUrl: URL;
  try {
    sourceUrl = new URL(String(body.event_source_url));
  } catch {
    return new Response(null, { status: 400 });
  }
  if (!ALLOWED_HOSTS.includes(sourceUrl.hostname) || isPrivatePath(sourceUrl.pathname)) {
    return new Response(null, { status: 400 });
  }

  const input = (body.parameters && typeof body.parameters === "object" ? body.parameters : {}) as Record<
    string,
    unknown
  >;
  const customData: Record<string, unknown> = {};
  for (const key of CUSTOM_DATA_KEYS) {
    if (input[key] !== undefined) customData[key] = input[key];
  }

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent");
  const fbp = str(body.fbp, 120);
  const fbc = str(body.fbc, 240);

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: sourceUrl.origin + sourceUrl.pathname,
        action_source: "website",
        user_data: {
          ...(ip ? { client_ip_address: ip } : {}),
          ...(userAgent ? { client_user_agent: userAgent } : {}),
          ...(fbp ? { fbp } : {}),
          ...(fbc ? { fbc } : {}),
        },
        custom_data: customData,
      },
    ],
  };

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      // Log Meta's reason (no token, no personal data) so it shows in Workers Logs.
      console.error("Meta CAPI rejected event", eventName, res.status, (await res.text()).slice(0, 300));
      return new Response(null, { status: 502 });
    }
  } catch (error) {
    console.error("Meta CAPI request failed", eventName, error instanceof Error ? error.message : error);
    return new Response(null, { status: 502 });
  }
  return NO_CONTENT.clone();
}
