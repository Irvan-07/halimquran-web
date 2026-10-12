// Receives a short report when "Buat Pesanan" fails in a buyer's browser and
// writes it to the Worker log (Workers Logs). It carries only the failure
// itself (HTTP status, a snippet of the answer, payment and courier ids): no
// name, phone, e-mail or address.

const ALLOWED_HOSTS = ["halimquran.com", "www.halimquran.com"];
const MAX_BODY_BYTES = 2 * 1024;

export async function POST(request: Request) {
  let origin: URL | null = null;
  try {
    origin = new URL(request.headers.get("origin") ?? "");
  } catch {
    origin = null;
  }
  if (!origin || !ALLOWED_HOSTS.includes(origin.hostname)) return new Response(null, { status: 403 });

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return new Response(null, { status: 413 });
  let report: Record<string, unknown>;
  try {
    report = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }

  console.error(
    "Checkout failed",
    JSON.stringify({
      status: report.status ?? null,
      body: typeof report.body === "string" ? report.body.slice(0, 300) : null,
      online: report.online ?? null,
      paymentMethod: typeof report.paymentMethod === "string" ? report.paymentMethod.slice(0, 40) : null,
      courier: report.courier ?? null,
      items: report.items ?? null,
      ua: (request.headers.get("user-agent") ?? "").slice(0, 160),
      country: request.headers.get("cf-ipcountry"),
    }),
  );
  return new Response(null, { status: 204 });
}
