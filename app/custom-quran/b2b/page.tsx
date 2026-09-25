import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Custom Quran — B2B",
};

// Positioning copy below is taken directly from the real qurancustom.com
// (the actual B2B sub-brand site, verified 2026-09-16) — not invented.
const segments = [
  { label: "Sekolah / Pesantren", href: "/custom-quran/b2b/sekolah-pesantren" },
  { label: "Yayasan", href: "/custom-quran/b2b/yayasan" },
  { label: "Corporate / UMKM", href: "/custom-quran/b2b/corporate-umkm" },
  { label: "Komunitas", href: "/custom-quran/b2b/komunitas" },
  { label: "Reseller", href: "/custom-quran/b2b/reseller" },
  { label: "Portofolio", href: "/custom-quran/b2b/portofolio" },
];

export default function CustomQuranB2BPage() {
  return (
    <div className="flex flex-col">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pt-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-primary">
          Powered by Halim Quran
        </p>
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          Solusi Qur&apos;an Custom Untuk Program, Brand dan Institusi Anda
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Spesialis Custom Cover Al-Qur&apos;an Premium untuk Berbagai
          Kebutuhan.
        </p>
      </div>
      <p className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        Detail penawaran, proses, dan form konsultasi masih dalam
        pengembangan.
      </p>
      <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 pb-16 sm:px-6 lg:px-8">
        {segments.map((segment) => (
          <Link
            key={segment.href}
            href={segment.href}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground hover:border-primary hover:text-primary"
          >
            {segment.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
