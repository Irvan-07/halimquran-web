import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Real Scalev product images (verified 26 Sep 2026).
        protocol: "https",
        hostname: "cdn.scalev.com",
      },
    ],
  },
};

export default nextConfig;
