import type { Metadata } from "next";
import { CmsPageView } from "@/components/content/CmsPageView";
import { pageMetadata } from "@/sanity/lib/content";
import Link from "next/link";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

function CustomQuranPageStatic() {
  return (
    <div className="flex flex-col">
      <PagePlaceholder
        title="Custom Quran"
        description="Personalisasi Quran untuk perorangan maupun kebutuhan institusi/bisnis."
      />
      <div className="mx-auto flex max-w-7xl gap-3 px-4 pb-16 sm:px-6 lg:px-8">
        <Link
          href="/custom-quran/personal"
          className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground hover:border-primary hover:text-primary"
        >
          Personal / Custom Nama
        </Link>
        <Link
          href="/custom-quran/b2b"
          className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground hover:border-primary hover:text-primary"
        >
          B2B
        </Link>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("custom-quran", "Custom Quran");
}

export default function CustomQuranPage() {
  return <CmsPageView slug="custom-quran" fallback={<CustomQuranPageStatic />} />;
}
