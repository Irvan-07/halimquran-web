import Image from "next/image";
import { Banknote, Landmark } from "lucide-react";

// Order the payment methods are shown in. Anything Scalev adds later that is
// not listed here goes after these, in the order Scalev returns it.
const PAYMENT_ORDER = ["qris", "cod", "invoice", "dana", "ovo", "shopeepay"];

// Scalev's labels are lowercase/English ("Cash on delivery"); show ours.
const PAYMENT_LABELS: Record<string, string> = {
  qris: "QRIS",
  cod: "Cash on Delivery (COD)",
};

export function sortPaymentMethods<T extends { code: string }>(methods: T[]): T[] {
  const rank = (code: string) => {
    const i = PAYMENT_ORDER.indexOf(code);
    return i === -1 ? PAYMENT_ORDER.length : i;
  };
  return [...methods].sort((a, b) => rank(a.code) - rank(b.code));
}

export function paymentLabel(code: string, fallback: string): string {
  return PAYMENT_LABELS[code] ?? fallback;
}

// Brand logos in /public/payment (SVGs from Wikimedia Commons; the marks
// belong to their owners). ShopeePay shows the Shopee logo: no separate
// ShopeePay file is available there.
const LOGOS: Record<string, string[]> = {
  qris: ["qris"],
  dana: ["dana"],
  ovo: ["ovo"],
  shopeepay: ["shopee"],
  // Scalev's "Virtual Account / GoPay / DANA" page: show the two e-wallets.
  invoice: ["gopay", "dana"],
};

export function PaymentMethodLogo({ code }: { code: string }) {
  const logos = LOGOS[code];
  return (
    <span
      aria-hidden
      className="flex h-10 w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-md border border-border bg-white px-1.5"
    >
      {logos ? (
        logos.map((logo) => (
          <Image
            key={logo}
            src={`/payment/${logo}.svg`}
            alt=""
            width={96}
            height={32}
            unoptimized
            className={logos.length > 1 ? "h-3.5 w-full object-contain" : "h-5 w-full object-contain"}
          />
        ))
      ) : code === "cod" ? (
        <Banknote className="size-5 text-success" />
      ) : (
        <Landmark className="size-5 text-primary" />
      )}
    </span>
  );
}
