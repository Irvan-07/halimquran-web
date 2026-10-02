import type { Metadata } from "next";
import { CmsPageView } from "@/components/content/CmsPageView";
import { pageMetadata } from "@/sanity/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("custom-quran-corporate-umkm", "Custom Quran — Corporate / UMKM");
}

export default function CorporateUmkmPage() {
  return (
    <CmsPageView
      slug="custom-quran-corporate-umkm"
      fallbackTitle="Corporate / UMKM"
      fallbackDescription="Halaman Custom Quran untuk corporate dan UMKM masih dalam pengembangan."
    />
  );
}
