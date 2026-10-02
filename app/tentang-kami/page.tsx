import type { Metadata } from "next";
import { CmsPageView } from "@/components/content/CmsPageView";
import { getPage } from "@/sanity/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("tentang-kami").catch(() => null);
  return { title: page?.title ?? "Tentang Kami", description: page?.description };
}

export default function TentangKamiPage() {
  return (
    <CmsPageView
      slug="tentang-kami"
      fallbackTitle="Tentang Halim Quran"
      fallbackDescription="Halaman Tentang Kami masih dalam pengembangan."
    />
  );
}
