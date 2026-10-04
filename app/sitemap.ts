import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { productCategories } from "@/lib/mock-data/categories";
import { getMergedCatalog } from "@/lib/scalev/catalog";

// The old Plugo site published its own sitemap and Google Search Console
// still points at it, so the new domain needs one too: every public page,
// category and product (live from the same catalog the storefront uses).
export const revalidate = 3600;

const STATIC_PAGES = ["", "/produk", "/gift", "/wakaf", "/custom-quran", "/tentang-kami", "/artikel", "/promo"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const catalog = await getMergedCatalog();

  return [
    ...STATIC_PAGES.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...productCategories.map((category) => ({
      url: `${base}/produk/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...catalog.map((product) => ({
      url: `${base}/produk/${product.category}/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
