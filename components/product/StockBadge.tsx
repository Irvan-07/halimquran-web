"use client";

import { useProductMedia } from "@/components/product/ProductMediaContext";
import type { Product } from "@/types/product";

// Real stock label from Scalev availability (replaces a hard-coded "Ada
// Stok"). Renders nothing until availability has loaded, and nothing for
// products whose stock isn't tracked.
export function StockBadge({ product }: { product: Product }) {
  const { availability } = useProductMedia();
  const ids = product.colorVariants?.length
    ? product.colorVariants.map((v) => v.variantId)
    : [product.variantId];
  const known = ids
    .filter((id): id is number => id !== undefined)
    .map((id) => availability[id])
    .filter(Boolean);
  if (known.length === 0) return null;

  const allOut = known.every((a) => !a.available);
  const anyLow = known.some((a) => a.available && a.stock_status === "low_stock");
  const tracked = known.some((a) => a.available_qty !== null);

  if (allOut) {
    return <span className="w-fit rounded bg-muted-foreground px-2 py-0.5 text-xs font-semibold text-white">Stok Habis</span>;
  }
  if (anyLow) {
    return <span className="w-fit rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">Stok Terbatas</span>;
  }
  if (tracked) {
    return <span className="w-fit rounded bg-success px-2 py-0.5 text-xs font-semibold text-success-foreground">Ada Stok</span>;
  }
  return null;
}
