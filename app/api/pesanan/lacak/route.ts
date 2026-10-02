import { NextResponse } from "next/server";
import { scalev } from "@/lib/scalev/client";

// Order tracking by order number + the phone number used at checkout. The
// public Scalev order page is addressed by a secret code, so this is the
// only place that code is handed out — and only after the phone matches.
// The same generic error is returned for "no such order" and "wrong phone"
// so the endpoint can't be used to probe which order numbers exist.

const NOT_FOUND = "Pesanan tidak ditemukan atau nomor telepon tidak cocok.";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;
// Best-effort only: in-memory per server instance (serverless instances
// don't share it), but it still blunts casual brute-forcing.
const attempts = new Map<string, { count: number; resetAt: number }>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Coba lagi beberapa menit lagi." },
      { status: 429 },
    );
  }

  const body = (await request.json().catch(() => null)) as { orderId?: unknown; phone?: unknown } | null;
  const orderId = typeof body?.orderId === "string" ? body.orderId.trim().toUpperCase() : "";
  const phone = typeof body?.phone === "string" ? normalizePhone(body.phone) : "";
  if (!/^[A-Z0-9]{8,20}$/.test(orderId) || phone.length < 9) {
    return NextResponse.json({ error: NOT_FOUND }, { status: 404 });
  }

  try {
    const order = await scalev.findOrderByNumber(orderId);
    const orderPhone = order?.customer?.phone ? normalizePhone(order.customer.phone) : "";
    if (!order || !orderPhone || orderPhone !== phone) {
      return NextResponse.json({ error: NOT_FOUND }, { status: 404 });
    }
    return NextResponse.json({ slug: order.secret_slug });
  } catch {
    return NextResponse.json({ error: "Layanan sedang sibuk, coba lagi sebentar." }, { status: 502 });
  }
}
