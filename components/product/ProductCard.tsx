"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { formatIDR } from "@/lib/utils/format";

interface ProductCardProps {
  product: Product;
}

// Matches halimquran.com's real product card exactly (re-checked 26 Sep
// 2026): no category label line, wishlist heart sits bottom-right of the
// image (not top-right), rating is its own line under the price rather
// than inline with it, and — confirmed by testing the live card directly,
// not just looking at it — clicking a color swatch swaps the card's own
// photo (not a hover effect). Swap only works where we have a real photo
// per color (colorVariants); plain `colors` still render as static dots.
export function ProductCard({ product }: ProductCardProps) {
  const variants = product.colorVariants ?? [];
  const [selected, setSelected] = useState<number | null>(null);
  const imageUrl =
    (selected !== null ? variants[selected]?.imageUrl : undefined) ?? product.imageUrl;

  return (
    <Link
      href={`/produk/${product.category}/${product.slug}`}
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full bg-secondary">
        {imageUrl && (
          <Image
            key={imageUrl}
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 rounded-full bg-background/80 p-1.5 text-muted-foreground"
        >
          <Heart className="size-4" />
        </span>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-sm font-medium text-foreground">{product.name}</h3>

        {variants.length > 0 ? (
          <div className="flex items-center gap-1">
            {variants.slice(0, 7).map((variant, i) => (
              <button
                key={variant.hex + i}
                type="button"
                aria-label={variant.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelected(i);
                }}
                className={`size-3 rounded-full border ${
                  i === selected ? "border-primary ring-1 ring-primary" : "border-border"
                }`}
                style={{ backgroundColor: variant.hex }}
              />
            ))}
          </div>
        ) : (
          product.colors &&
          product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 7).map((color, i) => (
                <span
                  key={i}
                  className="size-3 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )
        )}

        <p className="text-sm font-semibold text-primary">
          {formatIDR(product.price)}
        </p>
        {product.rating && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <Star className="size-3.5 fill-primary text-primary" />
              {product.rating}
            </span>
            {product.ratingCount && <span>· Terjual {product.ratingCount}</span>}
          </span>
        )}
      </div>
    </Link>
  );
}
