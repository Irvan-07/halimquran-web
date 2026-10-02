import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";

function formatSold(n: number): string {
  return n >= 1000 ? `${Math.floor(n / 1000)}RB+` : String(n);
}

function formatAmount(n: number): string {
  return new Intl.NumberFormat("id-ID").format(n);
}

// Dense marketplace card: square image, two-line title, a "Rp" prefix
// price in the accent color, and one meta row (rating / terjual). Only
// shows what we actually know about the product.
export function ShopeeProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produk/${product.category}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-transparent bg-card shadow-[0_1px_1px_rgba(0,0,0,0.08)] transition hover:-translate-y-px hover:border-primary hover:shadow-md"
    >
      <div className="relative aspect-square w-full bg-secondary">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        )}
        {product.badge && (
          <span className="absolute left-0 top-0 rounded-br-sm bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-2 p-2">
        <h3 className="line-clamp-2 min-h-[2.5em] text-xs leading-tight text-foreground lg:text-[13px]">
          {product.name}
        </h3>

        <div className="flex flex-col gap-1">
          {product.size && (
            <span className="w-fit rounded-[2px] border border-primary/60 px-1 text-[10px] leading-4 text-primary">
              Ukuran {product.size}
            </span>
          )}
          <div className="flex items-end justify-between gap-2">
            <p className="text-primary">
              <span className="text-xs">Rp</span>
              <span className="text-base font-medium">{formatAmount(product.price)}</span>
            </p>
            {product.soldCount ? (
              <span className="shrink-0 text-[11px] text-muted-foreground">
                {formatSold(product.soldCount)} terjual
              </span>
            ) : null}
          </div>
          {product.rating ? (
            <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
