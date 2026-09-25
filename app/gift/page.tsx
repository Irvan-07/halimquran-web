import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mock-data/products";

export const metadata: Metadata = {
  title: "Gift & Souvenir",
};

// The live halimquran.com has no separate Gift/Souvenir landing copy — the
// "Hadiah/Gift" section on its homepage is just a filtered product
// carousel, so this page mirrors that (product grid, no invented marketing
// copy) rather than padding it out with content the real site doesn't have.
export default function GiftPage() {
  const giftProducts = mockProducts.filter((p) => p.giftEligible);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          Gift & Souvenir
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Paket mushaf dalam kemasan box, cocok dijadikan hadiah — termasuk
          layanan ukir nama gratis.
        </p>
      </div>

      {giftProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {giftProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Belum ada produk contoh untuk Gift & Souvenir.
        </p>
      )}
    </div>
  );
}
