import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promo",
};

// On the live site, every "Promo" sub-item is a dead link (href="/") — the
// real site hasn't built these out either (verified 2026-09-17), and promo
// campaigns are inherently time-limited, so there's no stable real content
// to mirror here beyond the real category labels themselves.
const promoTopics = [
  "Promo Hari Ini",
  "Flash Sale",
  "Gratis Ukir Nama",
  "Voucher Belanja",
  "Bundling Hemat",
  "Clearance Sale",
];

export default function PromoPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold text-foreground">
        Promo
      </h1>
      <p className="max-w-xl text-sm text-muted-foreground">
        Belum ada promo aktif saat ini. Cek kembali secara berkala.
      </p>
      <div className="flex flex-wrap gap-2">
        {promoTopics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
