import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Keep crawlers out of the CMS, the cart/checkout flow and account pages;
// everything else is public.
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/", "/keranjang", "/checkout", "/akun", "/reset-password", "/pesanan", "/o/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
