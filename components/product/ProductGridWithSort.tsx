"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, SlidersHorizontal } from "lucide-react";
import { useThemeSlots } from "@/themes/client";
import { FilterSheet } from "@/components/product/FilterSheet";
import { SortSheet } from "@/components/product/SortMenu";
import { scalevStorefront } from "@/lib/scalev/storefront-client";
import {
  DEFAULT_SORT,
  EMPTY_FILTERS,
  activeFilterCount,
  applyFilters,
  sortProducts,
  stockVariantIds,
  type FilterState,
  type SortOption,
} from "@/lib/utils/product-filters";
import type { Product } from "@/types/product";

// Live availability per Scalev variant (null = couldn't be checked), shared
// between visits to category pages so "Ada Stok" doesn't re-check variants it
// already knows.
const stockCache = new Map<number, boolean | null>();

// Toolbar (Filter + Urutan, side by side as on halimquran.com's category
// pages) over a grid of the products, filtered and sorted client-side.
export function ProductGridWithSort({ products }: { products: Product[] }) {
  const { ProductCard, ProductGrid } = useThemeSlots();
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [version, setVersion] = useState(0); // bumped when new availability arrives

  // "Ada Stok" needs live availability; look it up once, a few at a time.
  const wantStock = filters.inStockOnly;
  const stockIds = useMemo(() => [...new Set(products.flatMap(stockVariantIds))], [products]);
  const missingIds = wantStock ? stockIds.filter((id) => !stockCache.has(id)) : [];
  const checkingStock = missingIds.length > 0;
  const missingKey = missingIds.join(",");

  useEffect(() => {
    if (!missingKey) return;
    let cancelled = false;
    const queue = missingKey.split(",").map(Number);
    const worker = async () => {
      for (let id = queue.shift(); id !== undefined; id = queue.shift()) {
        try {
          stockCache.set(id, (await scalevStorefront.getVariantAvailability(id)).available);
        } catch {
          stockCache.set(id, null); // unknown: the product is kept
        }
      }
    };
    Promise.all(Array.from({ length: 6 }, worker)).then(() => {
      if (!cancelled) setVersion((v) => v + 1);
    });
    return () => {
      cancelled = true;
    };
  }, [missingKey]);

  const stock = useMemo(() => {
    if (!wantStock) return {};
    const map: Record<number, boolean | undefined> = {};
    for (const id of stockIds) map[id] = stockCache.get(id) ?? undefined;
    return map;
    // `version` re-reads the shared cache after a lookup finishes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantStock, stockIds, version]);

  const shown = useMemo(
    () => sortProducts(applyFilters(products, filters, stock), sort),
    [products, filters, stock, sort],
  );
  const activeCount = activeFilterCount(filters);

  const toolbarButton =
    "flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-base text-foreground transition-colors hover:bg-primary/10 hover:text-primary";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <button type="button" onClick={() => setFilterOpen(true)} className={toolbarButton}>
          <SlidersHorizontal className="size-5" />
          Filter
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {activeCount}
            </span>
          )}
        </button>
        <button type="button" onClick={() => setSortOpen(true)} className={toolbarButton}>
          <ArrowDownUp className="size-5" />
          Urutan
        </button>
      </div>

      <FilterSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        applied={filters}
        onApply={setFilters}
        products={products}
      />
      <SortSheet open={sortOpen} onOpenChange={setSortOpen} sort={sort} onSortChange={setSort} />

      {checkingStock && <p className="text-sm text-muted-foreground">Memeriksa stok…</p>}

      {shown.length > 0 ? (
        <ProductGrid>
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="text-sm text-muted-foreground">Tidak ada produk yang cocok dengan filter ini.</p>
          <button
            type="button"
            onClick={() => setFilters(EMPTY_FILTERS)}
            className="rounded-full border border-primary px-5 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Hapus filter
          </button>
        </div>
      )}
    </div>
  );
}
