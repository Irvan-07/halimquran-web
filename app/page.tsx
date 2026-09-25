import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroCarousel } from "@/components/sections";
import { getMergedCatalog } from "@/lib/scalev/catalog";
import { productCategories } from "@/lib/mock-data/categories";

// Homepage below the hero is a rail per category (heading + "Tampilkan
// Semua" + horizontal-scroll row), matching halimquran.com's actual
// structure (re-checked 26 Sep 2026) — not one flat "Produk Pilihan" grid.
export default async function HomePage() {
  const catalog = await getMergedCatalog();

  return (
    <div className="flex flex-col">
      <HeroCarousel />

      <div className="flex flex-col gap-10 py-10">
        {productCategories.map((category) => {
          const products = catalog
            .filter((p) => p.category === category.slug)
            .slice(0, 6);
          if (products.length === 0) return null;

          return (
            <section
              key={category.slug}
              className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  {category.label}
                </h2>
                <Link
                  href={`/produk/${category.slug}`}
                  className="shrink-0 text-sm font-medium text-primary hover:underline"
                >
                  Tampilkan Semua
                </Link>
              </div>
              <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
                {products.map((product) => (
                  <div key={product.id} className="w-40 shrink-0 sm:w-48">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
