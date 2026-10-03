// Plain data (no React) so the CMS schema and every theme's banner can share it.

export interface HeroSlide {
  src: string;
  alt: string;
  /** Where a click goes: a path on this site ("/promo") or a full https:// URL. No href = not clickable. */
  href?: string;
}

// Real campaign banners from halimquran.com's homepage carousel (saved
// 26 Sep 2026 — source filenames Artboard_6 through Artboard_11 plus
// HALIMOMENT_SEKOLAH). The text/logo seen in each banner is baked into the
// image itself (the business's own design asset). These show when the CMS
// ("Pengaturan Situs" > "Banner beranda") has no banners of its own.
export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  { src: "/hero/banner-1.jpg", alt: "Siswa berprestasi selalu punya waktu untuk mengaji" },
  { src: "/hero/banner-2.jpg", alt: "Promo Halim Quran" },
  { src: "/hero/banner-3.jpg", alt: "Promo Halim Quran" },
  { src: "/hero/banner-4.jpg", alt: "Promo Halim Quran" },
  { src: "/hero/banner-5.jpg", alt: "Promo Halim Quran" },
  { src: "/hero/banner-6.jpg", alt: "Promo Halim Quran" },
  { src: "/hero/banner-7.jpg", alt: "Promo Halim Quran" },
];

/** Built-in banners as CMS choices, so links can be set on them without re-uploading the pictures. */
export const builtinHeroBanners = DEFAULT_HERO_SLIDES.map((s, i) => ({
  id: `banner-${i + 1}`,
  title: `Banner bawaan ${i + 1}`,
  src: s.src,
  alt: s.alt,
}));
