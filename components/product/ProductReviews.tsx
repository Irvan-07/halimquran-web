import { Star } from "lucide-react";
import type { Product } from "@/types/product";

// Matches halimquran.com's PDP "Rating" section: overall score + a list of
// real per-order reviews (reviewer, tags, text, date, variant bought).
// Renders only reviews we actually have (see Product.reviews) — no
// fabricated testimonials. The project owner plans to add more, sourced
// from Shopee/TikTok reviews, later.
export function ProductReviews({ product }: { product: Product }) {
  const reviews = product.reviews ?? [];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-lg font-semibold text-foreground">Rating</h2>

      {product.rating ? (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-foreground">
            {product.rating.toFixed(1)}
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-4 ${
                    i < Math.round(product.rating!)
                      ? "fill-brand-yellow text-brand-yellow"
                      : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              dari {reviews.length || 1} peringkat
            </span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Belum ada rating untuk produk ini.</p>
      )}

      {reviews.length > 0 && (
        <div className="flex flex-col divide-y divide-border border-t border-border">
          {reviews.map((review, i) => (
            <div key={i} className="flex flex-col gap-2 py-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`size-3.5 ${
                        j < review.rating
                          ? "fill-brand-yellow text-brand-yellow"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{review.author}</span>
              </div>
              {review.tags && review.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-sm text-muted-foreground">{review.text}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>{review.date}</span>
                {review.variant && (
                  <>
                    <span>|</span>
                    <span>Variant: {review.variant}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
