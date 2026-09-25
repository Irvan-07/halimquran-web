"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mock-data/products";

// "Pencarian Populer" tags are the real ones shown on the live search
// overlay (verified 2026-09-17): wafa, mawaddah, ta'lim.
const popularSearches = ["wafa", "mawaddah", "ta'lim"];

export function SearchPageContent() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return mockProducts.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari Produk Kami"
          className="pl-9"
        />
      </div>

      {!query.trim() && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-foreground">
            Pencarian Populer
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="rounded-full bg-destructive px-4 py-1.5 text-sm font-medium text-destructive-foreground hover:opacity-90"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {query.trim() && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {results.length} Hasil Ditemukan
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tidak ada produk yang cocok dengan &quot;{query}&quot;.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
