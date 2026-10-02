import type { Metadata } from "next";
import { CmsPageView } from "@/components/content/CmsPageView";
import { pageMetadata } from "@/sanity/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("custom-quran-yayasan", "Custom Quran — Yayasan");
}

export default function YayasanPage() {
  return (
    <CmsPageView
      slug="custom-quran-yayasan"
      fallbackTitle="Yayasan"
      fallbackDescription="Halaman Custom Quran untuk yayasan masih dalam pengembangan."
    />
  );
}
