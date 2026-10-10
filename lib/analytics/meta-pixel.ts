import type { AnalyticsEvent } from "@/types/analytics";

// The Meta Pixel / dataset that Scalev's server-side Conversions API also feeds
// ("Halim Quran Scalev" in Scalev > Settings > Analitik). Browser events and
// Scalev's server events therefore land in the SAME dataset. The id is public
// by design (every visitor's browser sees it); override it per environment
// with NEXT_PUBLIC_META_PIXEL_ID.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1726278068703179";

// Only the real storefront reports to the pixel: localhost, *.workers.dev and
// preview deployments must not pollute the production data.
const PIXEL_HOSTS = ["halimquran.com", "www.halimquran.com"];

// Pages whose address carries a secret (an order's access token in /o/<slug>/…,
// a password-reset token) or is private to one customer. The pixel sends the
// full page URL with every event, so these pages never report anything.
const PRIVATE_PREFIXES = ["/o/", "/reset-password", "/akun", "/pesanan"];

export function isPrivatePath(pathname: string): boolean {
  return PRIVATE_PREFIXES.some((prefix) => pathname === prefix.replace(/\/$/, "") || pathname.startsWith(prefix));
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Meta's standard base code, loaded before hydration (see app/layout.tsx) so
// window.fbq exists by the time any component fires an event.
//  - autoConfig false: no automatic button-click / form-field events; only the
//    events fired below are sent.
//  - no PageView here: <MetaPixelPageView> sends it per route, and skips the
//    private pages above.
export const META_PIXEL_BASE_CODE = `if(${JSON.stringify(PIXEL_HOSTS)}.indexOf(location.hostname)!==-1){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('set','autoConfig',false,'${META_PIXEL_ID}');fbq('init','${META_PIXEL_ID}');}`;

const CURRENCY = "IDR";

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// Ad-click id. The pixel writes the _fbc cookie from ?fbclid=, but not always
// before the first event of a visit, so rebuild it from the address when the
// cookie is not there yet.
function fbcValue(): string | undefined {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

function newEventId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// One event, two routes: the pixel (browser) and Meta's Conversions API through
// our own endpoint (/api/meta/events, which holds the access token). Both carry
// the same event_id, so Meta counts the event once, yet still has it when an ad
// blocker or browser privacy setting stops the pixel. The server copy also
// carries the full page address (the pixel only reports the bare domain) plus
// the fbp / fbc browser ids. The server call is fire-and-forget: it can fail
// without any effect on the page.
function sendMetaEvent(name: string, parameters: Record<string, unknown>): void {
  const eventId = newEventId();
  window.fbq?.("track", name, parameters, { eventID: eventId });

  const fbp = readCookie("_fbp");
  const fbc = fbcValue();
  fetch("/api/meta/events", {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: eventId,
      event_name: name,
      event_source_url: window.location.origin + window.location.pathname,
      fbp,
      fbc,
      parameters,
    }),
  }).catch(() => {});
}

function contentsOf(items: { item_id: string; price: number; quantity?: number }[]) {
  return items.map((item) => ({ id: item.item_id, quantity: item.quantity ?? 1, item_price: item.price }));
}

// Maps the app's GA4-shaped events to Meta's standard events. Purchase is
// deliberately NOT sent from the browser: Scalev fires it server-side
// (Conversions API, on Confirmed / transfer proof), and a second copy from the
// browser would count every order twice unless both carried the same event_id.
export function trackMetaPixel(event: AnalyticsEvent): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (isPrivatePath(window.location.pathname)) return;

  switch (event.name) {
    case "view_item":
      sendMetaEvent("ViewContent", {
        content_type: "product",
        content_ids: event.items.map((i) => i.item_id),
        content_name: event.items[0]?.item_name,
        content_category: event.items[0]?.item_category,
        contents: contentsOf(event.items),
        value: event.items[0]?.price ?? 0,
        currency: CURRENCY,
      });
      break;
    case "add_to_cart":
      sendMetaEvent("AddToCart", {
        content_type: "product",
        content_ids: event.items.map((i) => i.item_id),
        content_name: event.items[0]?.item_name,
        contents: contentsOf(event.items),
        value: event.value,
        currency: CURRENCY,
      });
      break;
    case "begin_checkout":
      sendMetaEvent("InitiateCheckout", {
        content_type: "product",
        content_ids: event.items.map((i) => i.item_id),
        contents: contentsOf(event.items),
        num_items: event.items.reduce((sum, i) => sum + (i.quantity ?? 1), 0),
        value: event.value,
        currency: CURRENCY,
      });
      break;
    default:
      break; // purchase: see above
  }
}
