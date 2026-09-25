import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mock-data/products";

export const metadata: Metadata = {
  title: "Custom Quran — Personal",
};

// The live halimquran.com has no dedicated "Custom Quran Personal" page
// (its "Ukir Nama" menu entry doesn't link anywhere — verified 2026-09-17,
// /pages/custom-quran 404s). Name engraving is a per-product option on the
// PDP itself (already built — see PurchasePanel), not a separate flow. This
// page is a discovery/explainer page pointing at that real capability,
// rather than inventing a standalone page the live site doesn't have.
const options = [
  {
    title: "Quran Saja",
    description: "Mushaf standar tanpa personalisasi tambahan.",
  },
  {
    title: "Quran + Nama",
    description: "Nama diukir pada cover sesuai keinginan Anda.",
  },
  {
    title: "Quran + Nama + Box",
    description: "Nama diukir, dilengkapi box eksklusif — cocok untuk hadiah.",
  },
];

export default function CustomQuranPersonalPage() {
  const eligibleProducts = mockProducts.filter((p) => p.customNameEligible);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          Custom Quran — Personal
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Tambahkan sentuhan personal pada mushaf Anda. Pilihan personalisasi
          tersedia langsung di halaman setiap produk yang mendukungnya.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {options.map((option) => (
          <div
            key={option.title}
            className="flex flex-col gap-1.5 rounded-lg border border-border p-4"
          >
            <h2 className="text-sm font-semibold text-foreground">
              {option.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {option.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Produk dengan Layanan Ukir Nama
        </h2>
        {eligibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {eligibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Belum ada produk contoh dengan layanan ukir nama.
          </p>
        )}
      </div>
    </div>
  );
}
