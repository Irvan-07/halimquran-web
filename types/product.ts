// Category set verified against the real halimquran.com nav (2026-09-16):
// Harian, Hafalan, Terjemah, Tajwid, Tematik, Lainnya. "Pocket" and
// "Madinah" (used in the plan doc) are product/size names, not categories.
export type ProductCategorySlug =
  | "quran-harian"
  | "quran-hafalan"
  | "quran-terjemah"
  | "quran-tajwid"
  | "quran-tematik"
  | "quran-lainnya";

export interface ProductCategory {
  slug: ProductCategorySlug;
  label: string;
}

// Real size taxonomy from halimquran.com's "Ukuran Quran" filter.
export type ProductSize = "A4" | "A5" | "A6" | "A7" | "B5" | "B7";

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Price in IDR, integer (no decimals). */
  price: number;
  category: ProductCategorySlug;
  size?: ProductSize;
  /** Promo/feature badge text, e.g. "Ukir Nama", "Terfavorit". */
  badge?: string;
  /** Rating out of 5, when shown on the live site. */
  rating?: number;
  /** Approximate swatch colors observed on the live product card — illustrative, not pixel-sampled. */
  colors?: string[];
  /** Shown as "Cocok untuk Wakaf" on the live site's Wakaf page. */
  wakafEligible?: boolean;
  /** Shown in the live site's homepage "Hadiah/Gift" carousel. */
  giftEligible?: boolean;
  /** Carries the real "Ukir Nama" badge on the live site (name-engraving offered). */
  customNameEligible?: boolean;
  /** Real product photo (currently only set for Scalev-sourced products). */
  imageUrl?: string;
  /** Real PDP copy, verbatim from halimquran.com, when we actually have it — falls back to a generated description otherwise (see app/produk/[kategori]/[slug]/page.tsx). May contain literal "\n" line breaks. */
  description?: string;
  /** "mock" (lib/mock-data) or "scalev" (live API) — which source this record came from. */
  source?: "mock" | "scalev";
}
