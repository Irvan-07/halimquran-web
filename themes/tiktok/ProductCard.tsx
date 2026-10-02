"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { formatIDR } from "@/lib/utils/format";

function formatSold(n: number): string {
  return n >= 1000 ? `${Math.floor(n / 1000)}rb+` : String(n);
}

// Dense social-commerce card: image-first, two-line title, bold accent
// price, and a single meta line (rating · terjual). Only shows facts we
// actually have for the product.
export function TikTokProductCard({ product }: { product: Product }) {
  const colorCount = product.colorVariants?.length ?? product.colors?.length ?? 0;

  return (
    <Link
      href={`/produk/${product.category}/${product.slug}`}
      className="flex flex-col overflow-hidden rounded-md bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full bg-secondary">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 20vw, 50vw"
            className="object-cover"
          />
        )}
        {product.badge && (
          <span className="absolute left-0 top-2 rounded-r-sm bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-2.5">
        <h3 className="line-clamp-2 min-h-[2.4em] text-[13px] leading-snug text-foreground">{product.name}</h3>

        <p className="text-base font-bold text-primary">{formatIDR(product.price)}</p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
          {product.rating ? (
            <span className="flex items-center gap-0.5">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          ) : null}
          {product.soldCount ? <span>Terjual {formatSold(product.soldCount)}</span> : null}
          {colorCount > 1 ? <span>{colorCount} warna</span> : null}
        </div>
      </div>
    </Link>
  );
}
