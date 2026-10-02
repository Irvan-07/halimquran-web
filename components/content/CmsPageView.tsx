import { RichText } from "@/components/content/RichText";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { getPage } from "@/sanity/lib/content";

/**
 * Renders the Sanity "Halaman" whose slug matches, or the given placeholder
 * text while that page hasn't been written/published in the Studio yet.
 */
export async function CmsPageView({
  slug,
  fallbackTitle,
  fallbackDescription,
}: {
  slug: string;
  fallbackTitle: string;
  fallbackDescription: string;
}) {
  const page = await getPage(slug).catch(() => null);
  if (!page) {
    return <PagePlaceholder title={fallbackTitle} description={fallbackDescription} />;
  }
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-foreground">{page.title}</h1>
      <RichText value={page.body} />
    </div>
  );
}
