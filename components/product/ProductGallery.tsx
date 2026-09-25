"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Heart } from "lucide-react";
import type { Product } from "@/types/product";

// Matches the live halimquran.com PDP: selecting a color swatch swaps the
// displayed photo to that variant's own image, with a checkmark on the
// selected swatch. Only active when `colorVariants` has real per-color
// photos (currently Scalev-sourced products) — plain `colors` still show
// as swatches elsewhere (PDP spec table via the parent page) without a
// photo to switch to.
export function ProductGallery({ product }: { product: Product }) {
  const variants = product.colorVariants ?? [];
  const [selected, setSelected] = useState(0);

  const imageUrl = variants[selected]?.imageUrl ?? product.imageUrl;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary">
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
        <button
          type="button"
          aria-label="Simpan ke wishlist"
          className="absolute right-3 top-3 rounded-full bg-background/80 p-2 text-muted-foreground transition-colors hover:text-destructive"
        >
          <Heart className="size-5" />
        </button>
      </div>

      {variants.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {variants.map((variant, i) => (
            <button
              key={variant.hex + i}
              type="button"
              aria-label={`Pilih warna ${i + 1}`}
              onClick={() => setSelected(i)}
              className="flex size-8 items-center justify-center rounded-full border border-border"
              style={{ backgroundColor: variant.hex }}
            >
              {i === selected && (
                <Check className="size-4 text-white drop-shadow-[0_0_1px_rgba(0,0,0,0.8)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
