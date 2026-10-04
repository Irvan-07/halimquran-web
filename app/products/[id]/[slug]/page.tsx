import { permanentRedirect } from "next/navigation";
import { getMergedCatalog } from "@/lib/scalev/catalog";
import { resolveLegacyProduct } from "@/lib/utils/legacy-redirect";

// Legacy Plugo URL shape (/products/{numeric id}/{slug}) from the old
// halimquran.com — one URL per colour variant, many of them for products
// that no longer exist. Only the slug is meaningful; send visitors and
// search engines to the best current page (see resolveLegacyProduct) instead
// of a 404.
export default async function LegacyProductRedirect({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { slug } = await params;
  const catalog = await getMergedCatalog();
  permanentRedirect(resolveLegacyProduct(decodeURIComponent(slug), catalog));
}
