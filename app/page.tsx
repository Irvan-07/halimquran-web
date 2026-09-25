import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mock-data/products";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
          Halim Quran
        </h1>
        <p className="max-w-lg text-base text-muted-foreground">
          Mushaf Al-Quran dan program Wakaf Quran. Fondasi tampilan baru
          sedang dalam pengembangan.
        </p>
        <Button asChild>
          <Link href="/produk">Lihat Produk</Link>
        </Button>
      </section>

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
