import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductMediaProvider } from "@/components/product/ProductMediaContext";
import { ProductColorPicker } from "@/components/product/ProductColorPicker";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductReviews } from "@/components/product/ProductReviews";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { StockBadge } from "@/components/product/StockBadge";
import { ShippingAreaField } from "@/components/product/ShippingAreaField";
import { TrackViewItem } from "@/components/tracking";
import { formatIDR } from "@/lib/utils/format";
import type { ProductDetailProps } from "../types";
import { HalimProductGrid } from "./ProductGrid";

// The original halimquran.com product page layout (moved here unchanged
// from the route file so other themes can swap it out).
export function HalimProductDetail({ product, related, descriptionText }: ProductDetailProps) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-24 sm:px-6 sm:py-8 lg:px-8">
      <TrackViewItem product={product} />

      <ProductMediaProvider product={product}>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Gallery */}
          <ProductGallery product={product} />

          {/* Product Info + Purchase Panel */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <StockBadge product={product} />
              <h1 className="font-heading text-lg font-semibold text-foreground">
                {product.name}
              </h1>
              {product.rating && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < Math.round(product.rating!)
                            ? "fill-primary text-primary"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </span>
                  {product.rating.toFixed(1)} ({product.ratingCount ?? 1})
                </span>
              )}
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-bold text-foreground">
                  {formatIDR(product.price)}
                </p>
                <button
                  type="button"
                  aria-label="Simpan ke wishlist"
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Heart className="size-6" />
                </button>
              </div>
            </div>

            <ProductColorPicker product={product} />

            <PurchasePanel product={product} />

            {product.wakafEligible && (
              <Link
                href="/wakaf"
                className="flex items-center justify-between rounded-lg border border-primary/30 bg-secondary px-4 py-3 text-sm text-foreground hover:border-primary"
              >
                <span>
                  Produk ini <strong>cocok untuk Wakaf Quran</strong>
                </span>
                <span className="text-primary">Lihat Wakaf &rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </ProductMediaProvider>

      <ProductDescription text={descriptionText} />

      <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
        <span className="text-base font-bold text-foreground">Pengiriman</span>
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground">Dikirim ke:</span>
          <ShippingAreaField />
        </div>
        {product.weightGrams && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Berat:</span>
            <span className="text-foreground">{product.weightGrams}g</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Dikirim dalam 24 jam,
          <br />
          (Setelah pembayaran dikonfirmasi)
        </p>
      </div>

      <ProductReviews product={product} />

      {/* Related Products */}
      {related.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Rekomendasi lainnya
          </h2>
          <HalimProductGrid>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </HalimProductGrid>
        </div>
      )}
    </div>
  );
}
