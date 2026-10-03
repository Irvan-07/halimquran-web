import { getHeroSlides } from "@/sanity/lib/content";
import { getActiveTheme } from "@/themes/server";
import type { HomeRail } from "@/themes/types";
import { getMergedCatalog } from "@/lib/scalev/catalog";
import type { Product } from "@/types/product";

// Each rail below is hardcoded to the EXACT product set/order read off
// halimquran.com's real homepage (26 Sep 2026) — not derived from our own
// `category` field — because the ask was to match the live homepage
// itself, including which specific products it features, not just "some
// products from this category". Once real Scalev data covers this catalog
// (currently 2 of ~44 real products), this can move to a Scalev-driven
// "featured on homepage" flag instead of a hardcoded slug list.
// No h2 text heading — the live homepage doesn't have one either; the
// category name only appears as the pill overlaid on each rail's banner
// (Quran Lainnya has no banner on the live site, so it also has no
// heading here, matching that inconsistency rather than inventing one).
const RAILS: {
  slug: string;
  /** Plain section title for themes that don't overlay the banner's pill label. */
  title: string;
  // Each banner's real source aspect ratio (checked via `file` on the
  // downloaded image) — most are 2048x1536 (4/3), but not all, and using
  // one ratio for every banner cropped the odd ones out on the sides
  // (object-cover fits the shorter dimension, so a 4/3 box on a wider
  // 16/9 source crops left/right — confirmed on the Gift banner).
  banner?: { imageUrl: string; pillLabel?: string; aspectRatio: string };
  href: string;
  productSlugs: string[];
}[] = [
  {
    // Unlabeled row right after the hero on the live homepage — no banner,
    // no heading, just 4 products (re-confirmed via full section-by-section
    // DOM walk 26 Sep 2026: index 1, directly after the hero at index 0).
    slug: "featured",
    title: "Produk Pilihan",
    href: "/produk",
    productSlugs: [
      "mushaf-al-quran-al-wafa-b7-pocket-edition",
      "al-quran-madinah-huzaifi-a5",
      "al-quran-tajwid-al-mumtaz-a7-resleting",
      "mushaf-al-quran-al-wafa-a6-pocket-edition",
    ],
  },
  {
    slug: "gift",
    title: "Hadiah / Gift",
    banner: { imageUrl: "/category-banners/gift.jpg", pillLabel: "Hadiah/Gift", aspectRatio: "3120/1752" },
    href: "/gift",
    productSlugs: [
      "bundling-mushaf-al-quran-madinah-huzaifi-a5-2-pcs-box-exclusive-free-custom-nama",
      "bundling-mushaf-al-quran-al-wafa-a6-pocket-2-pcs-box-exclusive-free-custom-nama",
      "bundling-mushaf-al-quran-terjemah-al-halim-a6-pocket-2-pcs-box-exclusive-free-custom-nama",
    ],
  },
  {
    slug: "quran-harian",
    title: "Quran Harian",
    banner: { imageUrl: "/category-banners/quran-harian.jpg", pillLabel: "Quran Daily", aspectRatio: "4/3" },
    href: "/produk/quran-harian",
    productSlugs: [
      "mushaf-al-quran-al-wafa-a7-pocket-edition",
      "mushaf-al-quran-al-wafa-b7-pocket-edition",
      "mushaf-al-quran-al-wafa-b7-mujazza-per-5-juz",
      "mushaf-al-quran-al-wafa-rubu-b7-resleting",
    ],
  },
  {
    slug: "quran-hafalan",
    title: "Quran Hafalan",
    banner: { imageUrl: "/category-banners/quran-hafalan.jpg", pillLabel: "Quran Hafalan", aspectRatio: "4/3" },
    href: "/produk/quran-hafalan",
    productSlugs: [
      "al-quran-hafalan-a6-hard-cover",
      "al-quran-hafalan-b7-per-5-juz",
      "al-quran-hafalan-a7-resleting",
      "al-quran-hafalan-a6-resleting-batik",
    ],
  },
  {
    slug: "quran-tajwid",
    title: "Quran Tajwid",
    banner: { imageUrl: "/category-banners/quran-tajwid.jpg", pillLabel: "Quran Tajwid", aspectRatio: "4/3" },
    href: "/produk/quran-tajwid",
    productSlugs: [
      "al-quran-tajwid-al-mumtaz-a7-resleting",
      "al-quran-tajwid-al-mumtaz-a6-resleting",
      "al-quran-tajwid-al-mumtaz-a5-resleting",
      "al-quran-tajwid-al-mumtaz-a5-hard-cover",
    ],
  },
  {
    slug: "quran-terjemah",
    title: "Quran Terjemah",
    banner: { imageUrl: "/category-banners/quran-terjemah.jpg", pillLabel: "Quran Terjemah", aspectRatio: "3199/2133" },
    href: "/produk/quran-terjemah",
    productSlugs: [
      "al-quran-terjemah-al-halim-b7-rubu-qpp-resleting",
      "al-quran-terjemah-al-halim-b7-rubu-qpp-resleting-colorfull-edition",
      "al-quran-terjemah-al-halim-rubu-b7-pocket-series",
      "al-quran-terjemah-al-halim-b7-rubu-hvs-resleting",
    ],
  },
  {
    slug: "quran-tematik",
    title: "Quran Tematik",
    banner: { imageUrl: "/category-banners/quran-tematik.jpg", pillLabel: "Quran Tematik", aspectRatio: "4/3" },
    href: "/produk/quran-tematik",
    productSlugs: ["al-quran-terjemah-tajwid-samara-a6-dompet"],
  },
  {
    slug: "quran-lainnya",
    title: "Quran Lainnya",
    // No pill label on the live site's own banner here either — not an
    // omission on our part, matching that as-is.
    banner: { imageUrl: "/category-banners/quran-lainnya.jpg", aspectRatio: "4/3" },
    href: "/produk/quran-lainnya",
    productSlugs: [
      "al-quran-madinah-huzaifi-a5",
      "al-quran-kalimatul-ulya-a5-resleting",
      "al-quran-al-azhim-a5-hard-cover",
      "al-quran-terjemah-besar-al-haqq-a4-hard-cover-box",
    ],
  },
];

export default async function HomePage() {
  const { Home } = (await getActiveTheme()).slots;
  const [catalog, banners] = await Promise.all([getMergedCatalog(), getHeroSlides()]);
  const bySlug = new Map(catalog.map((p) => [p.slug, p]));

  const rails: HomeRail[] = RAILS.map(({ productSlugs, ...rail }) => ({
    ...rail,
    products: productSlugs
      .map((slug) => bySlug.get(slug))
      .filter((p): p is Product => Boolean(p)),
  })).filter((rail) => rail.products.length > 0);

  return <Home rails={rails} catalog={catalog} banners={banners} />;
}
