import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryTabs } from "@/components/product/CategoryTabs";
import { ProductGridWithSort } from "@/components/product/ProductGridWithSort";
import { getMergedCatalog } from "@/lib/scalev/catalog";
import { productCategories } from "@/lib/mock-data/categories";

interface KategoriPageProps {
  params: Promise<{ kategori: string }>;
}

export function generateStaticParams() {
  return productCategories.map((category) => ({ kategori: category.slug }));
}

export async function generateMetadata({
  params,
}: KategoriPageProps): Promise<Metadata> {
  const { kategori } = await params;
  const category = productCategories.find((c) => c.slug === kategori);
  return { title: category?.label ?? "Kategori Produk" };
}

export default async function KategoriPage({ params }: KategoriPageProps) {
  const { kategori } = await params;
  const category = productCategories.find((c) => c.slug === kategori);

  if (!category) {
    notFound();
  }

  const catalog = await getMergedCatalog();
  const products = catalog.filter((p) => p.category === category.slug);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-12 pt-3 sm:px-6 sm:pt-6 lg:px-8">
      {/* Matches halimquran.com: no visible headline — the category row says
          where you are. Kept for screen readers and search engines. */}
      <h1 className="sr-only">{category.label}</h1>

      <CategoryTabs active={category.slug} />

      {products.length > 0 ? (
        <ProductGridWithSort products={products} />
      ) : (
        <p className="text-sm text-muted-foreground">
          Belum ada produk untuk kategori ini.
        </p>
      )}
    </div>
  );
}
