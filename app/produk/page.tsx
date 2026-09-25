import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getMergedCatalog } from "@/lib/scalev/catalog";
import { productCategories } from "@/lib/mock-data/categories";

export const metadata: Metadata = {
  title: "Produk",
};

export default async function ProdukPage() {
  const products = await getMergedCatalog();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          Semua Produk
        </h1>
        <p className="text-sm text-muted-foreground">
          Koleksi mushaf Al-Quran Halim Quran — pilih berdasarkan kategori di
          bawah.
        </p>
      </div>

      <nav className="flex flex-wrap gap-2">
        {productCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/produk/${category.slug}`}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground hover:border-primary hover:text-primary"
          >
            {category.label}
          </Link>
        ))}
      </nav>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
