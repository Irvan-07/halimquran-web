import type { NavItem } from "@/types/nav";

// Structure mirrors the real halimquran.com mega menu ("Pilih Quran"),
// verified 2026-09-16. "Ukuran Quran" (size filter) and the deeper
// Moment/Rekomendasi/Media/Promo sub-menus are not yet built as separate
// pages — their top-level entry points exist, sub-items to follow.
export const mainNav: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Pilih Quran",
    href: "/produk",
    children: [
      { label: "Quran Harian", href: "/produk/quran-harian" },
      { label: "Quran Hafalan", href: "/produk/quran-hafalan" },
      { label: "Quran Terjemah", href: "/produk/quran-terjemah" },
      { label: "Quran Tajwid", href: "/produk/quran-tajwid" },
      { label: "Quran Tematik", href: "/produk/quran-tematik" },
      { label: "Quran Lainnya", href: "/produk/quran-lainnya" },
      { label: "Hadiah/Gift", href: "/gift" },
      { label: "Wakaf Quran", href: "/wakaf" },
      { label: "Custom Quran", href: "/custom-quran" },
      { label: "Moment", href: "/moment" },
      { label: "Rekomendasi", href: "/produk" },
    ],
  },
  { label: "Tentang Halim", href: "/tentang-kami" },
  { label: "Media", href: "/media" },
  { label: "Promo", href: "/promo" },
];
