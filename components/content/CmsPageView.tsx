import type { ReactNode } from "react";
import { RichText } from "@/components/content/RichText";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { getPage } from "@/sanity/lib/content";

interface CmsPageViewProps {
  /** Slug of the Sanity "Halaman" document that controls this route. */
  slug: string;
  /** Shown while that page hasn't been written/published in the Studio. */
  fallback?: ReactNode;
  /** Shorthand for a plain placeholder fallback (when no `fallback` node is given). */
  fallbackTitle?: string;
  fallbackDescription?: string;
}

/**
 * Renders the Sanity page whose slug matches; otherwise the existing static
 * content, so a route keeps working before anyone has written it in the CMS.
 */
export async function CmsPageView({ slug, fallback, fallbackTitle, fallbackDescription }: CmsPageViewProps) {
  const page = await getPage(slug).catch(() => null);
  if (!page) {
    return (
      fallback ?? (
        <PagePlaceholder title={fallbackTitle ?? slug} description={fallbackDescription ?? ""} />
      )
    );
  }
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-foreground">{page.title}</h1>
      <RichText value={page.body} />
    </div>
  );
}

/**
 * Optional intro block for pages that keep their own product grid (Gift,
 * Wakaf): shows the Sanity page's text above the grid when it exists.
 */
export async function CmsIntro({ slug }: { slug: string }) {
  const page = await getPage(slug).catch(() => null);
  if (!page || !page.body?.length) return null;
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8 sm:px-6">
      <h2 className="font-heading text-2xl font-semibold text-foreground">{page.title}</h2>
      <RichText value={page.body} />
    </section>
  );
}
