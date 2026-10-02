import Image from "next/image";
import Link from "next/link";
import { Plus, Star, Truck } from "lucide-react";
import type { Product } from "@/types/product";

function formatAmount(n: number): string {
  return new Intl.NumberFormat("id-ID").format(n);
}

// Marketplace card with soft rounded photo, a round "+" affordance bottom
// right (the card itself opens the product page — options like color must
// be chosen there), two-line title, bold price, and quiet meta lines. Only
// shows what we really know about the product.
export function BlibliProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produk/${product.category}/${product.slug}`} className="group flex flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
        {product.badge && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-primary px-2 py-1 text-[10px] font-semibold leading-none text-primary-foreground">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-background text-primary shadow-[0_1px_4px_rgba(0,0,0,0.18)] transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Plus className="size-4" strokeWidth={2.5} />
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-2 min-h-9 text-[13px] font-medium leading-[18px] text-foreground lg:text-sm">
          {product.name}
        </h3>
        <p className="text-foreground">
          <span className="text-xs font-semibold">Rp</span>
          <span className="text-base font-semibold">{formatAmount(product.price)}</span>
        </p>
        {(product.rating || product.soldCount) && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {product.rating ? (
              <>
                <Star className="size-3.5 fill-[#FFC600] text-[#FFC600]" />
                <span className="text-foreground">{product.rating}</span>
              </>
            ) : null}
            {product.rating && product.soldCount ? <span>·</span> : null}
            {product.soldCount ? <span>Terjual {formatAmount(product.soldCount)}</span> : null}
          </p>
        )}
        <span className="flex items-center gap-1 text-xs font-semibold text-success">
          <Truck className="size-3.5" />
          Dikirim 24 jam
        </span>
      </div>
    </Link>
  );
}
