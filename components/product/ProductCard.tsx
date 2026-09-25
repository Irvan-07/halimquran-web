import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { productCategories } from "@/lib/mock-data/categories";
import { formatIDR } from "@/lib/utils/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = productCategories.find(
    (c) => c.slug === product.category,
  )?.label;

  return (
    <Link
      href={`/produk/${product.category}/${product.slug}`}
      className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-secondary">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        )}
        {product.badge && (
          <span className="absolute left-2 top-2 rounded bg-brand-yellow px-2 py-0.5 text-[11px] font-bold text-brand-yellow-foreground">
            {product.badge}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-muted-foreground"
        >
          <Heart className="size-4" />
        </span>
      </div>

      {categoryLabel && (
        <span className="text-[11px] font-bold uppercase tracking-wide text-primary">
          {categoryLabel}
        </span>
      )}

      <h3 className="text-sm font-medium text-foreground">{product.name}</h3>

      {product.colors && product.colors.length > 0 && (
        <div className="flex items-center gap-1">
          {product.colors.slice(0, 7).map((color, i) => (
            <span
              key={i}
              className="size-3 rounded-full border border-border"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-primary">
          {formatIDR(product.price)}
        </p>
        {product.rating && (
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-brand-yellow text-brand-yellow" />
            {product.rating}
          </span>
        )}
      </div>
    </Link>
  );
}
