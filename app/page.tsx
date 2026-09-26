import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroCarousel } from "@/components/sections";
import { getMergedCatalog } from "@/lib/scalev/catalog";
import type { Product } from "@/types/product";

// Real lifestyle photos from the scrolling gallery strip halimquran.com
// shows just above its footer (saved 26 Sep 2026). The live version
// auto-scrolls continuously; this is a simpler manual horizontal-scroll
// row with the same 4 real photos rather than reproducing that exact
// animation. No specific link target was found for it on the live site
// (no <a> inside that section), so "Lihat Semua Produk" points at /produk
// as a reasonable stand-in for its implied intent.
const LIFESTYLE_PHOTOS = [
  "/lifestyle/photo-1.png",
  "/lifestyle/photo-2.png",
  "/lifestyle/photo-3.png",
  "/lifestyle/photo-4.png",
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
  banner?: { imageUrl: string; pillLabel: string };
  href: string;
  productSlugs: string[];
}[] = [
  {
    slug: "gift",
    banner: { imageUrl: "/category-banners/gift.jpg", pillLabel: "Hadiah/Gift" },
    href: "/gift",
    productSlugs: [
      "bundling-mushaf-al-quran-madinah-huzaifi-a5-2-pcs-box-exclusive-free-custom-nama",
      "bundling-mushaf-al-quran-al-wafa-a6-pocket-2-pcs-box-exclusive-free-custom-nama",
      "bundling-mushaf-al-quran-terjemah-al-halim-a6-pocket-2-pcs-box-exclusive-free-custom-nama",
    ],
  },
  {
    slug: "quran-harian",
    banner: { imageUrl: "/category-banners/quran-harian.jpg", pillLabel: "Quran Daily" },
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
    banner: { imageUrl: "/category-banners/quran-hafalan.jpg", pillLabel: "Quran Hafalan" },
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
    banner: { imageUrl: "/category-banners/quran-tajwid.jpg", pillLabel: "Quran Tajwid" },
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
    banner: { imageUrl: "/category-banners/quran-terjemah.jpg", pillLabel: "Quran Terjemah" },
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
    banner: { imageUrl: "/category-banners/quran-tematik.jpg", pillLabel: "Quran Tematik" },
    href: "/produk/quran-tematik",
    productSlugs: ["al-quran-terjemah-tajwid-samara-a6-dompet"],
  },
  {
    slug: "quran-lainnya",
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

      <div className="flex flex-col gap-10 py-10">
        {RAILS.map((rail) => {
          const products = rail.productSlugs
            .map((slug) => bySlug.get(slug))
            .filter((p): p is Product => Boolean(p));
          if (products.length === 0) return null;

          return (
            <section
              key={rail.slug}
              className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8"
            >
              {rail.banner && (
                <Link
                  href={rail.href}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary sm:aspect-[16/9]"
                >
                  <Image
                    src={rail.banner.imageUrl}
                    alt={rail.banner.pillLabel}
                    fill
                    sizes="(min-width: 1024px) 1152px, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white bg-background/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                    {rail.banner.pillLabel}
                  </span>
                </Link>
              )}
              <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
                {products.map((product) => (
                  <div key={product.id} className="w-40 shrink-0 sm:w-48">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <Link
                href={rail.href}
                className="mx-auto w-fit rounded-full border border-primary px-6 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Tampilkan Semua
              </Link>
            </section>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-6 pb-10">
        <Link
          href="/produk"
          className="rounded-full border border-primary px-6 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Lihat Semua Produk
        </Link>
        <div className="flex w-full gap-1 overflow-x-auto sm:justify-center">
          {LIFESTYLE_PHOTOS.map((src) => (
            <div key={src} className="relative aspect-[2/3] w-1/3 shrink-0 sm:w-64">
              <Image src={src} alt="" fill sizes="256px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
