import type { Metadata } from "next";
import { CmsPageView } from "@/components/content/CmsPageView";
import { pageMetadata } from "@/sanity/lib/content";

// On the live site, every "Moment" sub-item (Haji/Umroh, Wisuda, Memorial)
// is itself a dead link (href="/") — the real site hasn't built these out
// either (verified 2026-09-17). Listing the real labels as non-interactive
// chips accurately mirrors that current state instead of inventing
// destinations or content that don't exist yet.
const momentTopics = ["Haji/Umroh", "Wisuda", "Memorial"];

function MomentPageStatic() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold text-foreground">
        Moment
      </h1>
      <p className="max-w-xl text-sm text-muted-foreground">
        Quran untuk momen khusus. Halaman per momen masih dalam pengembangan.
      </p>
      <div className="flex flex-wrap gap-2">
        {momentTopics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("moment", "Moment");
}

export default function MomentPage() {
  return <CmsPageView slug="moment" fallback={<MomentPageStatic />} />;
}
