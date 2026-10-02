import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
