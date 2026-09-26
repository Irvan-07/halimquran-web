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
  /** Total number of ratings behind `rating` (e.g. from a marketplace listing's rating breakdown) — shown as "dari N peringkat", independent of how many individual reviews are listed in `reviews`. */
  ratingCount?: number;
  /** Approximate swatch colors observed on the live product card — illustrative, not pixel-sampled. */
  colors?: string[];
  /** Indonesian color names, parallel to `colors` (same index), shown on the PDP's "Warna" section for products with no per-variant photo. */
  colorNames?: string[];
  /** Color swatches paired with that variant's own real photo — lets the PDP gallery switch image on color select, like the live site. Only set where we actually have a per-variant photo (currently Scalev-sourced products, plus the PDP template product); other mock products show `colors` as plain swatches with no image swap. */
  colorVariants?: { hex: string; name: string; imageUrl: string }[];
  /** The PDP gallery's own thumbnail strip — main shot, lifestyle/detail photos, and marketing infographics (size chart etc.), in display order. Separate from `colorVariants`, which drives the "Warna" section further down the page. Only set where we've scraped a product's real gallery (currently just the PDP template product). */
  galleryImages?: string[];
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
  /** Shipping weight in grams — shown on the PDP's "Pengiriman" block, matching the live site. */
  weightGrams?: number;
  /** Real customer reviews, verbatim from the live site or marketplace listings where we have them (see ProductReviews). Not fabricated — omitted rather than invented for products we haven't scraped a review for yet. */
  reviews?: {
    author: string;
    rating: number;
    tags?: string[];
    text: string;
    date: string;
    variant?: string;
    /** Where this review was pulled from — shown as a small badge in ProductReviews. */
    reviewSource?: "halimquran.com" | "Shopee" | "TikTok Shop";
    /** Photo/video the reviewer attached to their review (real, downloaded from the source listing) — shown as a thumbnail strip under the review text. */
    media?: { type: "image" | "video"; src: string }[];
  }[];
  /** "mock" (lib/mock-data) or "scalev" (live API) — which source this record came from. */
  source?: "mock" | "scalev";
}
