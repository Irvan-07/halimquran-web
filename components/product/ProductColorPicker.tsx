"use client";

import { useState } from "react";
import Image from "next/image";
import { useProductMedia } from "@/components/product/ProductMediaContext";
import type { Product } from "@/types/product";

// The PDP's "Warna" section — matches the live site's placement (below
// price, above the sticky purchase bar) and grid layout (4 per row, own
// photo + name each). Picking a color here swaps the gallery's main
// image above via ProductMediaContext, same as clicking a gallery
// thumbnail does. Falls back to plain color chips (no image swap) for
// products we only have flat hex colors for, no per-variant photo.
export function ProductColorPicker({ product }: { product: Product }) {
  const { setSelectedImage, selectedVariantId, setSelectedVariantId, availability } = useProductMedia();
  const [plainSelected, setPlainSelected] = useState(0);

  if (product.colorVariants && product.colorVariants.length > 0) {
    return (
      <div id="pilih-warna" className="flex flex-col gap-2 scroll-mt-20">
        <span className="text-sm font-medium text-foreground">Warna</span>
        <div className="grid grid-cols-4 gap-3">
          {product.colorVariants.map((variant, i) => {
            const soldOut =
              variant.variantId !== undefined && availability[variant.variantId]?.available === false;
            return (
            <button
              key={variant.hex + i}
              type="button"
              onClick={() => {
                setSelectedImage(variant.imageUrl);
                setSelectedVariantId(soldOut ? null : (variant.variantId ?? null));
              }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className={`relative block aspect-square w-full overflow-hidden rounded-md border-2 ${
                  variant.variantId !== undefined && variant.variantId === selectedVariantId ? "border-primary" : "border-border"
                }`}
              >
                <Image
                  src={variant.imageUrl}
                  alt={variant.name}
                  fill
                  sizes="120px"
                  className={`object-cover ${soldOut ? "opacity-40 grayscale" : ""}`}
                />
                {soldOut && (
                  <span className="absolute inset-x-0 bottom-0 bg-foreground/70 py-0.5 text-center text-[10px] font-semibold uppercase text-background">
                    Habis
                  </span>
                )}
              </span>
              <span className={`w-full truncate text-center text-xs ${soldOut ? "text-muted-foreground/60 line-through" : "text-muted-foreground"}`}>
                {variant.name}
              </span>
            </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (product.colors && product.colors.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground">Warna</span>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((hex, i) => (
            <button
              key={hex + i}
              type="button"
              onClick={() => setPlainSelected(i)}
              className="flex w-14 flex-col items-center gap-1"
            >
              <span
                className={`size-14 rounded-md border-2 ${
                  i === plainSelected ? "border-primary" : "border-border"
                }`}
                style={{ backgroundColor: hex }}
              />
              <span className="w-full truncate text-center text-[11px] text-muted-foreground">
                {product.colorNames?.[i] ?? hex}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
