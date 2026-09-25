"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { SortMenu, sortProducts, type SortOption } from "@/components/product/SortMenu";
import type { Product } from "@/types/product";

export function ProductGridWithSort({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <div className="flex flex-col gap-4">
      <SortMenu sort={sort} onSortChange={setSort} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
