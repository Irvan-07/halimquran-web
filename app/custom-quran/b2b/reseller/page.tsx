import type { Metadata } from "next";
import { CmsPageView } from "@/components/content/CmsPageView";
import { pageMetadata } from "@/sanity/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("custom-quran-reseller", "Custom Quran — Reseller");
}

export default function ResellerPage() {
  return (
    <CmsPageView
      slug="custom-quran-reseller"
      fallbackTitle="Reseller"
      fallbackDescription="Halaman Custom Quran untuk reseller masih dalam pengembangan."
    />
  );
}
