import type { Metadata } from "next";
import { CmsPageView } from "@/components/content/CmsPageView";
import { pageMetadata } from "@/sanity/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("custom-quran-komunitas", "Custom Quran — Komunitas");
}

export default function KomunitasPage() {
  return (
    <CmsPageView
      slug="custom-quran-komunitas"
      fallbackTitle="Komunitas"
      fallbackDescription="Halaman Custom Quran untuk komunitas masih dalam pengembangan."
    />
  );
}
