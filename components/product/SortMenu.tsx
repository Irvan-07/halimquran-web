"use client";

import { useState } from "react";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types/product";

export type SortOption = "default" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortOption, string> = {
  default: "Rekomendasi",
  "price-asc": "Harga Terendah",
  "price-desc": "Harga Tertinggi",
};

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  if (sort === "default") return products;
  const sorted = [...products];
  sorted.sort((a, b) => (sort === "price-asc" ? a.price - b.price : b.price - a.price));
  return sorted;
}

// Matches halimquran.com's category-page toolbar (Filter + Urutan side by
// side, saved 26 Sep 2026). Filter is present for visual parity but isn't
// wired to real filtering yet — the live site's filter covers price/size/
// color facets we haven't built a panel for; Urutan (sort) is fully
// functional since it only needed the price field we already have.
export function SortMenu({
  sort,
  onSortChange,
}: {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled
        title="Filter produk (segera hadir)"
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors disabled:cursor-not-allowed sm:flex-none"
      >
        <SlidersHorizontal className="size-4" />
        Filter
      </button>

      <div className="relative flex-1 sm:flex-none">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowUpDown className="size-4" />
          Urutan
        </button>
        {open && (
          <div className="absolute right-0 z-10 mt-1 w-44 rounded-lg border border-border bg-background py-1 shadow-md">
            {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onSortChange(option);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-secondary ${
                  option === sort ? "font-medium text-primary" : "text-foreground"
                }`}
              >
                {SORT_LABELS[option]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
