"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";

// Matches the live halimquran.com PDP gallery: a vertical thumbnail rail
// (horizontal strip on mobile) next to one large main image, both driven
// by the same selection. We only have one photo per color variant (no
// separate angle shots or info-graphic images the live site also has), so
// the rail is populated from colorVariants — a smaller but honest subset
// of the real pattern rather than fabricated extra images.
export function ProductGallery({ product }: { product: Product }) {
  const variants = product.colorVariants ?? [];
  const [selected, setSelected] = useState(0);

  const imageUrl = variants[selected]?.imageUrl ?? product.imageUrl;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {variants.length > 1 && (
        <div className="order-2 flex shrink-0 gap-2 overflow-x-auto sm:order-1 sm:w-16 sm:flex-col sm:overflow-visible">
          {variants.map((variant, i) => (
            <button
              key={variant.hex + i}
              type="button"
              aria-label={variant.name}
              onClick={() => setSelected(i)}
              className={`relative size-14 shrink-0 overflow-hidden rounded-md border sm:size-16 ${
                i === selected ? "border-primary" : "border-border"
              }`}
            >
              <Image src={variant.imageUrl} alt={variant.name} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="relative order-1 aspect-square w-full min-w-0 overflow-hidden rounded-lg bg-secondary sm:order-2 sm:flex-1">
        {imageUrl && (
          <Image
            key={imageUrl}
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded bg-brand-yellow px-2.5 py-1 text-xs font-bold text-brand-yellow-foreground">
            {product.badge}
          </span>
        )}
      </div>

      {variants.length > 1 && (
        <div className="order-3 flex w-full flex-col gap-2 sm:basis-full">
          <span className="text-sm font-medium text-foreground">Warna</span>
          <div className="flex flex-wrap gap-3">
            {variants.map((variant, i) => (
              <button
                key={variant.hex + i}
                type="button"
                onClick={() => setSelected(i)}
                className="flex w-14 flex-col items-center gap-1"
              >
                <span
                  className={`relative size-14 overflow-hidden rounded-md border ${
                    i === selected ? "border-primary" : "border-border"
                  }`}
                >
                  <Image src={variant.imageUrl} alt={variant.name} fill sizes="56px" className="object-cover" />
                </span>
                <span className="w-full truncate text-center text-[11px] text-muted-foreground">
                  {variant.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
