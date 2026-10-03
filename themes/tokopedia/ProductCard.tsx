import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";

function formatAmount(n: number): string {
  return new Intl.NumberFormat("id-ID").format(n);
}

function formatSold(n: number): string {
  return n >= 1000 ? `${Math.floor(n / 1000)} rb+` : String(n);
}

// White card with a soft shadow, square photo, two-line title, bold "Rp"
// price, the shop's city and a rating | terjual line. Only shows what we
// actually know about the product.
export function TokopediaProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produk/${product.category}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-background shadow-[0_1px_6px_rgba(141,150,170,0.4)] transition-shadow hover:shadow-[0_3px_12px_rgba(141,150,170,0.55)]"
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
          <span className="absolute left-0 top-2 rounded-r-md bg-primary px-2 py-0.5 text-[10px] font-bold leading-4 text-primary-foreground">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2">
        <h3 className="line-clamp-2 min-h-9 text-xs leading-[18px] text-foreground lg:text-[13px]">{product.name}</h3>
        <p className="text-sm font-extrabold text-foreground lg:text-base">
          Rp{formatAmount(product.price)}
        </p>
        <p className="text-xs text-muted-foreground">Kab. Bandung</p>
        {(product.rating || product.soldCount) && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {product.rating ? (
              <>
                <Star className="size-3.5 fill-[#FFC400] text-[#FFC400]" />
                <span>{product.rating}</span>
              </>
            ) : null}
            {product.rating && product.soldCount ? <span className="text-border">|</span> : null}
            {product.soldCount ? <span>{formatSold(product.soldCount)} terjual</span> : null}
          </p>
        )}
      </div>
    </Link>
  );
}
