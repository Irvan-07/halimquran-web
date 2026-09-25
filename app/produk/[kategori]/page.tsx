import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
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
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <Link href="/produk" className="text-sm text-muted-foreground hover:text-primary">
          &larr; Semua Produk
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          {category.label}
        </h1>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Belum ada produk untuk kategori ini.
        </p>
      )}
    </div>
  );
}
