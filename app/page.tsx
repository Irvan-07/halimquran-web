import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroCarousel } from "@/components/sections";
import { Reveal } from "@/components/layout/Reveal";
import { LifestyleMarquee, type LifestyleItem } from "@/components/layout/LifestyleMarquee";
import { getMergedCatalog } from "@/lib/scalev/catalog";
import type { Product } from "@/types/product";

// Real lifestyle media from the scrolling gallery strip halimquran.com
// shows just above its footer (saved 26 Sep 2026): 3 photos + 1 short
// looping video (confirmed on the live site — the 4th slot is a <video>,
// not a still photo; a frame of it was mistaken for a photo earlier).
// The live strip is a step carousel (see LifestyleMarquee), looping this
// same 4-item set back-to-back.
const LIFESTYLE_ITEMS: LifestyleItem[] = [
  { type: "image", src: "/lifestyle/photo-1.png" },
  { type: "image", src: "/lifestyle/photo-2.png" },
  { type: "image", src: "/lifestyle/photo-3.png" },
  // Only this specific item carries the "All Product / Here" overlay on
  // the live site (confirmed by the user against the real homepage) — the
  // other 3 are plain media.
  { type: "video", src: "/lifestyle/video-1.mp4", cta: true },
];

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
    href: "/produk",
    productSlugs: [
      "mushaf-al-quran-al-wafa-b7-pocket-edition",
      "al-quran-madinah-huzaifi-a5-standar-internasional",
      "al-quran-tajwid-al-mumtaz-a7-resleting",
      "mushaf-al-quran-al-wafa-a6-pocket-edition",
    ],
  },
  {
    slug: "gift",
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
    banner: { imageUrl: "/category-banners/quran-tematik.jpg", pillLabel: "Quran Tematik", aspectRatio: "4/3" },
    href: "/produk/quran-tematik",
    productSlugs: ["al-quran-terjemah-tajwid-samara-a6-dompet"],
  },
  {
    slug: "quran-lainnya",
    // No pill label on the live site's own banner here either — not an
    // omission on our part, matching that as-is.
    banner: { imageUrl: "/category-banners/quran-lainnya.jpg", aspectRatio: "4/3" },
    href: "/produk/quran-lainnya",
    productSlugs: [
      "al-quran-madinah-huzaifi-a5-standar-internasional",
      "al-quran-kalimatul-ulya-a5-resleting",
      "al-quran-al-azhim-a5-hard-cover",
      "al-quran-terjemah-besar-al-haqq-a4-hard-cover-box",
    ],
  },
];

export default async function HomePage() {
  const catalog = await getMergedCatalog();
  const bySlug = new Map(catalog.map((p) => [p.slug, p]));

  return (
    <div className="flex flex-col">
      <HeroCarousel />

      <div className="flex flex-col gap-10 pb-4 pt-6">
        {RAILS.map((rail) => {
          const products = rail.productSlugs
            .map((slug) => bySlug.get(slug))
            .filter((p): p is Product => Boolean(p));
          if (products.length === 0) return null;

          return (
            <Reveal
              key={rail.slug}
              className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8"
            >
              {rail.banner && (
                <Link
                  href={rail.href}
                  className="group relative -mx-4 w-[calc(100%+2rem)] overflow-hidden bg-secondary sm:mx-0 sm:w-full sm:rounded-lg"
                  style={{ aspectRatio: rail.banner.aspectRatio }}
                >
                  <Image
                    src={rail.banner.imageUrl}
                    alt={rail.banner.pillLabel ?? ""}
                    fill
                    sizes="(min-width: 1024px) 1152px, 100vw"
                    className="object-cover"
                  />
                  {rail.banner.pillLabel && (
                    <span className="absolute bottom-3 left-3 rounded-full border border-foreground/70 bg-background px-4 py-1.5 text-sm font-medium text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      {rail.banner.pillLabel}
                    </span>
                  )}
                </Link>
              )}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Link
                href={rail.href}
                className="mx-auto w-fit rounded-full border border-primary px-6 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Tampilkan Semua
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-6 pb-10">
        <LifestyleMarquee items={LIFESTYLE_ITEMS} />
      </div>
    </div>
  );
}
