import type { Metadata } from "next";
import { CmsPageView } from "@/components/content/CmsPageView";
import { pageMetadata } from "@/sanity/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("custom-quran-portofolio", "Portofolio — Custom Quran B2B");
}

export default function PortofolioPage() {
  return (
    <CmsPageView
      slug="custom-quran-portofolio"
      fallbackTitle="Portofolio"
      fallbackDescription="Contoh proyek Custom Quran untuk institusi masih dalam pengembangan."
    />
  );
}
