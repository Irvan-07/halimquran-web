import type { Metadata } from "next";
import { CmsPageView } from "@/components/content/CmsPageView";
import { pageMetadata } from "@/sanity/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("custom-quran-sekolah-pesantren", "Custom Quran — Sekolah / Pesantren");
}

export default function SekolahPesantrenPage() {
  return (
    <CmsPageView
      slug="custom-quran-sekolah-pesantren"
      fallbackTitle="Sekolah / Pesantren"
      fallbackDescription="Halaman Custom Quran untuk sekolah dan pesantren masih dalam pengembangan."
    />
  );
}
