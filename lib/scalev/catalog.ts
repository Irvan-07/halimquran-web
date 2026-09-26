import "server-only";
import { scalev } from "./client";
import type { ScalevProductDetail, ScalevProductVariantDetail } from "@/types/scalev";
import type { Product, ProductCategorySlug, ProductSize } from "@/types/product";
import { mockProducts } from "@/lib/mock-data/products";

// Adapter: real Scalev API data -> this app's existing `Product` shape, so
// every UI component built against mock data (ProductCard, PurchasePanel,
// the PDP page) keeps working unchanged regardless of the data source.
//
// Known, deliberate simplifications (live account only has 2 products as of
// 26 Sep 2026, both variants of one mushaf — revisit these once the real
// catalog is populated):
// - Scalev products carry NO category/label data yet, so every real
//   product falls back to "quran-lainnya" rather than guessing a category
//   that isn't actually assigned in Scalev.
// - A Scalev product can have multiple variants at different prices; this
//   app's Product type is single-priced, so we show the FIRST variant's
//   price (here that's a moot point — every variant on both real products
//   is Rp109.000 regardless of color).
// - wakafEligible / giftEligible / customNameEligible / badge / rating have
//   no Scalev equivalent (those are live-site marketing signals, not
//   commerce data) — left undefined for Scalev-sourced products rather
//   than guessed.

const SIZE_PATTERN = /\b(A4|A5|A6|A7|B5|B7)\b/i;

// Best-effort Indonesian color name -> hex, for the swatch UI. Approximate,
// not pixel-sampled — same caveat as the earlier mock `colors` data.
const COLOR_NAME_TO_HEX: Record<string, string> = {
  cream: "#E8DCC4",
  "biru tua": "#1E3A5F",
  navy: "#1E3A5F",
  maroon: "#7B2D26",
  hitam: "#111827",
  black: "#111827",
  beige: "#C9A876",
  pink: "#C2417A",
  coklat: "#8B5E34",
  brown: "#8B5E34",
  hijau: "#0F7A5C",
  green: "#0F7A5C",
  ungu: "#8E7CC3",
  putih: "#F5F5F0",
  white: "#F5F5F0",
  abu: "#6B7280",
  grey: "#6B7280",
  gray: "#6B7280",
};

function colorNameToHex(name: string): string | undefined {
  return COLOR_NAME_TO_HEX[name.trim().toLowerCase()];
}

function detectSize(name: string): ProductSize | undefined {
  const match = name.match(SIZE_PATTERN);
  return match ? (match[1].toUpperCase() as ProductSize) : undefined;
}

/** No Scalev label maps to a category yet — see file header. */
const FALLBACK_CATEGORY: ProductCategorySlug = "quran-lainnya";

export function scalevProductToProduct(detail: ScalevProductDetail): Product {
  const variants: ScalevProductVariantDetail[] = detail.variants ?? [];
  const primary = variants[0];

  const isColorVariant = detail.option1_name?.toLowerCase().includes("warna");
  const colors = isColorVariant
    ? variants
        .map((v) => (v.option1_value ? colorNameToHex(v.option1_value) : undefined))
        .filter((c): c is string => Boolean(c))
    : undefined;
  // Pair each variant's own hex with its own photo, so the PDP gallery can
  // swap image on color select instead of just tinting a swatch dot.
  const colorVariants = isColorVariant
    ? variants
        .map((v) => {
          const hex = v.option1_value ? colorNameToHex(v.option1_value) : undefined;
          const imageUrl = v.images?.[0];
          return hex && imageUrl && v.option1_value
            ? { hex, name: v.option1_value, imageUrl }
            : undefined;
        })
        .filter((c): c is { hex: string; name: string; imageUrl: string } => Boolean(c))
    : undefined;

  return {
    id: String(detail.id),
    slug: detail.slug,
    name: detail.name.trim(),
    price: primary?.price ?? 0,
    category: FALLBACK_CATEGORY,
    size: detectSize(detail.name),
    imageUrl: detail.images?.[0] ?? detail.featured_image_url,
    source: "scalev",
    ...(colors && colors.length > 0 ? { colors } : {}),
    ...(colorVariants && colorVariants.length > 0 ? { colorVariants } : {}),
  };
}

// The live Scalev account has two separate product listings for the same
// physical mushaf (Madinah Huzaifi A5) — confirmed 26 Sep 2026, not a merge
// bug on our end: "al-quran-madinah-huzaifi-a5" (the complete one, now
// merged with the mock catalog's rating/description/9 color variants) and
// this one, a sparse duplicate with just 1 color variant and no
// category/rating. Dropped here until the merchant deletes/merges it in
// the Scalev dashboard directly — that's the real fix; this is a stopgap
// so customers don't see the same mushaf listed twice.
const KNOWN_DUPLICATE_SCALEV_SLUGS = new Set([
  "al-quran-madinah-huzaifi-a5-standar-internasional",
]);

/**
 * Fetches the full real catalog (list -> per-product detail, in parallel,
 * since the list endpoint doesn't carry pricing — see types/scalev.ts).
 * Cached/revalidated via Next.js fetch caching (see lib/scalev/client.ts);
 * callers don't need their own cache layer on top of this.
 */
export async function getScalevCatalog(): Promise<Product[]> {
  const { data: summaries } = await scalev.listProducts();
  const active = summaries.filter((p) => p.id); // defensive; no status filter yet confirmed reliable
  const details = await Promise.all(
    active.map((p) => scalev.getProduct(p.id).catch(() => null)),
  );
  return details
    .filter((d): d is ScalevProductDetail => d !== null)
    .map(scalevProductToProduct)
    .filter((p) => !KNOWN_DUPLICATE_SCALEV_SLUGS.has(p.slug));
}

export async function getScalevProductBySlug(slug: string): Promise<Product | null> {
  const catalog = await getScalevCatalog();
  return catalog.find((p) => p.slug === slug) ?? null;
}

/**
 * Scalev catalog merged with the legacy mock catalog, so listing/detail
 * pages stay fully populated while the real Scalev catalog is still being
 * filled in (2 products as of 26 Sep 2026 — see file header). On a slug
 * collision the Scalev entry wins (real price/image) but borrows the mock
 * entry's category, since Scalev itself has no category/label data yet
 * (FALLBACK_CATEGORY above) while the mock catalog's categories were
 * checked against the live site — otherwise a product we already know the
 * real category for would regress to "Quran Lainnya" once it's live in
 * Scalev. Never throws: a Scalev failure just means 0 real products and an
 * all-mock result, so callers don't need their own try/catch.
 */
export async function getMergedCatalog(): Promise<Product[]> {
  let scalevProducts: Product[] = [];
  try {
    scalevProducts = await getScalevCatalog();
  } catch {
    scalevProducts = [];
  }

  const mockBySlug = new Map(mockProducts.map((p) => [p.slug, p]));
  const merged = scalevProducts.map((p) => {
    const mockMatch = mockBySlug.get(p.slug);
    if (!mockMatch) return p;
    // Mock supplies every marketing/rich-content field Scalev has no
    // equivalent for (badge, rating, colors, wakaf/gift/customName
    // eligibility, description); Scalev overrides with its own
    // commerce-critical fields (price, imageUrl, id, name); category stays
    // mock's either way since Scalev has no category data at all.
    return { ...mockMatch, ...p, category: mockMatch.category };
  });

  const scalevSlugs = new Set(scalevProducts.map((p) => p.slug));
  const mockFallback = mockProducts.filter((p) => !scalevSlugs.has(p.slug));

  return [...merged, ...mockFallback];
}

export async function getMergedProductBySlug(slug: string): Promise<Product | null> {
  const catalog = await getMergedCatalog();
  return catalog.find((p) => p.slug === slug) ?? null;
}
