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

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...legacyCategoryRedirects,
      { source: "/categories/:path*", destination: "/produk", permanent: true },
    ];
  },
  images: {
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
