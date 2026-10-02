import { notFound, permanentRedirect } from "next/navigation";
import { getMergedProductBySlug } from "@/lib/scalev/catalog";

// Legacy Plugo URL shape (/products/{numeric id}/{slug}) from the old
// halimquran.com. Only the slug is meaningful; look the product up by it
// and send visitors/search engines to the new canonical PDP.
export default async function LegacyProductRedirect({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = await getMergedProductBySlug(decodeURIComponent(slug));
  if (!product) notFound();
  permanentRedirect(`/produk/${product.category}/${product.slug}`);
}
