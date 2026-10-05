import type { NextConfig } from "next";

// Old Plugo category URLs (/categories/{id}/{slug}) -> new category pages.
const legacyCategoryRedirects = [
  ["40066", "quran-harian"],
  ["40090", "quran-hafalan"],
  ["21390", "quran-terjemah"],
  ["40088", "quran-tajwid"],
  ["40091", "quran-tematik"],
  ["40093", "quran-lainnya"],
].map(([id, slug]) => ({
  source: `/categories/${id}/:rest*`,
  destination: `/produk/${slug}`,
  permanent: true,
}));

// The two old categories that live outside /produk, and the old static
// pages (all from the old site's sitemap).
const legacyPageRedirects = [
  { source: "/categories/40520/:rest*", destination: "/gift", permanent: true },
  { source: "/categories/41264/:rest*", destination: "/wakaf", permanent: true },
  { source: "/info", destination: "/tentang-kami", permanent: true },
  { source: "/testimonial", destination: "/tentang-kami", permanent: true },
  { source: "/featured-products", destination: "/produk", permanent: true },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // One canonical host: the old Plugo site answered on both, so links to
      // www.halimquran.com (all of Google's) keep working and land on the apex.
      // Two rules, not one `/:path*`: on Cloudflare (OpenNext) an empty match
      // leaves the literal ":path*" in the destination, so www/ landed on a 404.
      {
        source: "/",
        has: [{ type: "host", value: "www.halimquran.com" }],
        destination: "https://halimquran.com/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.halimquran.com" }],
        destination: "https://halimquran.com/:path+",
        permanent: true,
      },
      // The Studio now lives on Sanity's own hosting (see studio-hosted/); old
      // /studio bookmarks land there. Not permanent, in case it moves again.
      { source: "/studio", destination: "https://halimquran.sanity.studio", permanent: false },
      { source: "/studio/:path+", destination: "https://halimquran.sanity.studio", permanent: false },
      ...legacyCategoryRedirects,
      ...legacyPageRedirects,
      { source: "/categories/:path*", destination: "/produk", permanent: true },
    ];
  },
  images: {
    // No request-time resizing: Cloudflare Workers has no Next image optimizer,
    // and Vercel's Hobby quota was what took the site down. Local photos are
    // pre-generated at build time (scripts/build-image-variants.mjs).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    remotePatterns: [
      {
        // Real Scalev product images (verified 26 Sep 2026).
        protocol: "https",
        hostname: "cdn.scalev.com",
      },
      {
        // halimquran.com's own CloudFront-hosted product photos — used
        // directly as Scalev variant `images` URLs during the catalog
        // migration (2 Oct 2026) instead of re-uploading to Scalev's own
        // CDN, since Scalev's image fields just accept any public URL.
        protocol: "https",
        hostname: "d2kchovjbwl1tk.cloudfront.net",
      },
      {
        // Some halimquran.com color-swatch images resolve from the
        // underlying S3 bucket directly rather than through the CloudFront
        // host above (same migration, same reasoning).
        protocol: "https",
        hostname: "s3-ap-southeast-1.amazonaws.com",
      },
      {
        // Images uploaded through the Sanity Studio (articles, pages).
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        // A handful of products (e.g. Al Halim New Fancy A5 Resleting)
        // have no live halimquran.com PDP any more but are still sold on
        // this shop's Shopee listing — swatch images sourced from there
        // instead (same migration, same reasoning).
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
      },
    ],
  },
};

export default nextConfig;
