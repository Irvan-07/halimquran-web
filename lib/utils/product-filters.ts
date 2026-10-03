import type { Product } from "@/types/product";

// ---- Sorting ("Urutkan produk berdasarkan") -------------------------------

export type SortOption =
  | "unggulan"
  | "terbaru"
  | "terlama"
  | "terpopuler"
  | "rating"
  | "harga-terendah"
  | "harga-tertinggi"
  | "nama-az"
  | "nama-za";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "unggulan", label: "Unggulan" },
  { value: "terbaru", label: "Terbaru" },
  { value: "terlama", label: "Terlama" },
  { value: "terpopuler", label: "Terpopuler" },
  { value: "rating", label: "Rating Tertinggi" },
  { value: "harga-terendah", label: "Harga Terendah" },
  { value: "harga-tertinggi", label: "Harga Tertinggi" },
  { value: "nama-az", label: "Nama Produk (A-Z)" },
  { value: "nama-za", label: "Nama Produk (Z-A)" },
];

/** The list arrives newest-first from the catalog, so "Terbaru" keeps that order and "Terlama" flips it. */
export const DEFAULT_SORT: SortOption = "terbaru";

/** "Produk Unggulan": flagged best-sellers — the "Terfavorit" badge, or 1,000+ sold. */
export function isFeatured(p: Product): boolean {
  return p.badge === "Terfavorit" || (p.soldCount ?? 0) >= 1000;
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case "terbaru":
      return list;
    case "terlama":
      return list.reverse();
    case "unggulan":
      // Stable sort: featured first, everything else keeps catalog order.
      return list.sort((a, b) => Number(isFeatured(b)) - Number(isFeatured(a)));
    case "terpopuler":
      return list.sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0));
    case "rating":
      return list.sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.ratingCount ?? 0) - (a.ratingCount ?? 0),
      );
    case "harga-terendah":
      return list.sort((a, b) => a.price - b.price);
    case "harga-tertinggi":
      return list.sort((a, b) => b.price - a.price);
    case "nama-az":
      return list.sort((a, b) => a.name.localeCompare(b.name, "id"));
    case "nama-za":
      return list.sort((a, b) => b.name.localeCompare(a.name, "id"));
  }
}

// ---- Filtering -------------------------------------------------------------

export type PriceRange = "lt110" | "110-230" | "230-340" | "gt340";

export const PRICE_RANGES: { value: PriceRange; label: string; test: (price: number) => boolean }[] = [
  { value: "lt110", label: "Di bawah Rp 110,000", test: (p) => p < 110_000 },
  { value: "110-230", label: "Rp 110,000 - 230,000", test: (p) => p >= 110_000 && p < 230_000 },
  { value: "230-340", label: "Rp 230,000 - 340,000", test: (p) => p >= 230_000 && p < 340_000 },
  { value: "gt340", label: "Rp 340,000 +", test: (p) => p >= 340_000 },
];

export interface FilterState {
  featuredOnly: boolean;
  inStockOnly: boolean;
  price: PriceRange | null;
  /** Colour family ids (see COLOR_FAMILIES). */
  colors: string[];
}

export const EMPTY_FILTERS: FilterState = { featuredOnly: false, inStockOnly: false, price: null, colors: [] };

/** How many filter groups are active (shown on the Filter button). */
export function activeFilterCount(f: FilterState): number {
  return Number(f.featuredOnly) + Number(f.inStockOnly) + Number(f.price !== null) + Number(f.colors.length > 0);
}

// Swatches in the filter panel. Product colour names ("Biru Tua", "Hitam
// Kuning", "Coklat (Emas)"...) are matched to these families; more specific
// patterns come first and are consumed so "Biru Tua" doesn't also count as
// plain "Biru".
export const COLOR_FAMILIES: { id: string; label: string; hex: string; match: RegExp }[] = [
  { id: "navy", label: "Biru Tua", hex: "#1F3A5F", match: /biru tua|navy/ },
  { id: "hijau-tua", label: "Hijau Tua", hex: "#4A5A3E", match: /hijau tua|army|olive/ },
  { id: "krem", label: "Cream", hex: "#F0DCC0", match: /light cream|cream|krem|putih|beige/ },
  { id: "hitam", label: "Hitam", hex: "#1F2328", match: /hitam|black/ },
  { id: "abu", label: "Abu-abu", hex: "#767680", match: /abu|grey|gray/ },
  { id: "maroon", label: "Maroon", hex: "#6B2D35", match: /maroon/ },
  { id: "merah", label: "Merah", hex: "#E63946", match: /merah/ },
  { id: "coklat", label: "Coklat", hex: "#7B4A1E", match: /coklat|cokelat|brown/ },
  { id: "emas", label: "Emas", hex: "#C9A227", match: /emas|gold/ },
  { id: "perak", label: "Perak", hex: "#C4D2DA", match: /perak|silver/ },
  { id: "ungu", label: "Ungu", hex: "#8E8CCF", match: /ungu|lilac|violet/ },
  { id: "biru", label: "Biru", hex: "#1E54C0", match: /biru/ },
  { id: "hijau-muda", label: "Hijau Muda", hex: "#B5E48C", match: /mint|lime/ },
  { id: "hijau", label: "Hijau", hex: "#1BA67B", match: /hijau|tosca|teal/ },
  { id: "pink", label: "Pink", hex: "#FF66CC", match: /pink|magenta|dusty/ },
  { id: "oranye", label: "Oranye", hex: "#F97316", match: /orange|oranye|peach/ },
  { id: "kuning", label: "Kuning", hex: "#E8C547", match: /kuning|mustard|yellow/ },
];

export function colorFamiliesOf(name: string): Set<string> {
  let rest = name.toLowerCase();
  const found = new Set<string>();
  for (const family of COLOR_FAMILIES) {
    if (family.match.test(rest)) {
      found.add(family.id);
      rest = rest.replace(family.match, " ");
    }
  }
  return found;
}

function colorNamesOf(p: Product): string[] {
  if (p.colorVariants?.length) return p.colorVariants.map((v) => v.name);
  return p.colorNames ?? [];
}

export function productColorFamilies(p: Product): Set<string> {
  const all = new Set<string>();
  for (const name of colorNamesOf(p)) for (const id of colorFamiliesOf(name)) all.add(id);
  return all;
}

/** Colour families that actually occur in these products, in swatch order. */
export function availableColorFamilies(products: Product[]) {
  const present = new Set<string>();
  for (const p of products) for (const id of productColorFamilies(p)) present.add(id);
  return COLOR_FAMILIES.filter((f) => present.has(f.id));
}

/** Scalev variant ids that decide whether a product can be bought. */
export function stockVariantIds(p: Product): number[] {
  const ids = p.colorVariants?.length ? p.colorVariants.map((v) => v.variantId) : [p.variantId];
  return ids.filter((id): id is number => id !== undefined);
}

/**
 * `stock` is the live availability per Scalev variant id (true/false), once
 * loaded; while a variant is unknown the product is kept.
 */
export function applyFilters(
  products: Product[],
  f: FilterState,
  stock: Record<number, boolean | undefined> = {},
): Product[] {
  const range = f.price ? PRICE_RANGES.find((r) => r.value === f.price) : undefined;
  return products.filter((p) => {
    if (f.featuredOnly && !isFeatured(p)) return false;
    if (range && !range.test(p.price)) return false;
    if (f.colors.length > 0) {
      const fams = productColorFamilies(p);
      if (!f.colors.some((c) => fams.has(c))) return false;
    }
    if (f.inStockOnly) {
      const ids = stockVariantIds(p);
      if (ids.length === 0) return false; // not purchasable here
      const known = ids.map((id) => stock[id]).filter((v) => v !== undefined);
      if (known.length > 0 && !known.some(Boolean) && known.length === ids.length) return false;
      if (known.length > 0 && known.length < ids.length && !known.some(Boolean)) return true; // still loading some
    }
    return true;
  });
}
