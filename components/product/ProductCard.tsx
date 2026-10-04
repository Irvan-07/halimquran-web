import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { formatIDR, formatSoldCount } from "@/lib/utils/format";

interface ProductCardProps {
  product: Product;
}

// Matches halimquran.com's product card (text colours and weights measured
// off the live site: #333 title, regular-weight blue price, 60% #333
// rating line): borderless (only the photo is
// rounded, hovering tints the whole card), no category label line, wishlist
// heart bottom-right of the image, rating as its own line under the price.
// The photo is always the product's hero image (see withHeroImage in
// lib/scalev/catalog.ts); colours are chosen on the product page, so the
// card carries no colour swatches.
export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/produk/${product.category}/${product.slug}`}
      className="flex flex-col gap-2 overflow-hidden bg-background transition-colors hover:bg-black/5"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded bg-secondary">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
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

      <div className="flex flex-col gap-2 px-2 pb-2">
        <h3 className="text-sm font-medium text-[#333]">{product.name}</h3>

        <p className="text-sm text-primary">
          {formatIDR(product.price)}
        </p>
        {(product.rating || product.soldCount) && (
          <span className="flex items-center gap-1 text-xs text-[#333]/60">
            {product.rating ? (
              <span className="flex items-center gap-0.5">
                <Star className="size-3.5 fill-primary text-primary" />
                {product.rating}
              </span>
            ) : null}
            {product.rating && product.soldCount ? <span>·</span> : null}
            {product.soldCount ? <span>Terjual {formatSoldCount(product.soldCount)}</span> : null}
          </span>
        )}
      </div>
    </Link>
  );
}
