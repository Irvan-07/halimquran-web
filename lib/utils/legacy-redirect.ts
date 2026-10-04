import type { Product, ProductCategorySlug } from "@/types/product";

// The old Plugo site had one URL per colour variant plus a few long-gone
// products (e.g. /products/918275/al__wafa-a5-(resleting)-__-coklat), and
// Google still lists ~360 of them. Only the product *name* is meaningful in
// those slugs ("Al-Wafa A5 (Resleting) - Coklat" slugified: "-" became "__",
// spaces "-"), so we resolve a legacy slug to the best current destination:
// the matching product, else its category, else the all-products page. Old
// links must never end in a 404.

const STOP_WORDS = new Set(["al", "quran", "mushaf", "edisi", "dus", "lama", "new", "product", "series"]);

/** "al__wafa-a5-(resleting)-__-coklat" -> the parent product's words. */
function productTokens(legacySlug: string): string[] {
  const parentPart = legacySlug.split("-__-")[0] ?? legacySlug;
  return parentPart
    .toLowerCase()
    .replace(/%26/g, "&")
    .replace(/__/g, "")
    .replace(/[()'’]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((t) => t && !STOP_WORDS.has(t) && t !== "rest")
    // "Mushaf M. Huzaifi" in the old names is the Madinah Huzaifi.
    .map((t) => (t === "m" ? "madinah" : t));
}

const KEYWORD_CATEGORIES: [RegExp, ProductCategorySlug][] = [
  [/hafalan/, "quran-hafalan"],
  [/tajwid|mumtaz/, "quran-tajwid"],
  [/terjemah|keluarga|halim|samara/, "quran-terjemah"],
  [/wafa/, "quran-harian"],
  [/huzaifi|azhim|yasir|kalimatul|haqq|madinah/, "quran-lainnya"],
];

export function resolveLegacyProduct(legacySlug: string, catalog: Product[]): string {
  const exact = catalog.find((p) => p.slug === legacySlug);
  if (exact) return `/produk/${exact.category}/${exact.slug}`;

  const tokens = productTokens(legacySlug);
  if (tokens.length > 0) {
    // Best product = the one whose name covers the most of the legacy
    // name's words; the size (a5/a6/b7...) has to be among them.
    const size = tokens.find((t) => /^[ab]\d$/.test(t));
    let best: { product: Product; score: number } | null = null;
    for (const product of catalog) {
      const words = new Set(productTokens(product.slug));
      if (size && !words.has(size)) continue;
      const covered = tokens.filter((t) => words.has(t)).length;
      const score = covered / tokens.length - (words.size - covered) * 0.01;
      if (covered / tokens.length >= 0.75 && (!best || score > best.score)) best = { product, score };
    }
    if (best) return `/produk/${best.product.category}/${best.product.slug}`;

    const joined = tokens.join(" ");
    for (const [pattern, category] of KEYWORD_CATEGORIES) {
      if (pattern.test(joined)) return `/produk/${category}`;
    }
  }

  return "/produk";
}
