import { ProductCard } from "@/components/product/ProductCard";
import { HeroCarousel } from "@/components/sections";
import { mockProducts } from "@/lib/mock-data/products";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroCarousel />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Produk Pilihan
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
