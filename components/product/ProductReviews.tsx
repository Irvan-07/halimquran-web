"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";

const INITIAL_COUNT = 5;

// Matches halimquran.com's PDP "Rating" section: overall score + a list of
// real per-order reviews (reviewer, tags, text, date, variant bought).
// Renders only reviews we actually have (see Product.reviews) — no
// fabricated testimonials. Most of these come from the product's real
// Shopee listing (see lib/mock-data/products.ts), shown as a small source
// badge per review so it's clear which platform it's from.
export function ProductReviews({ product }: { product: Product }) {
  const reviews = product.reviews ?? [];
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, INITIAL_COUNT);

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
              dari {product.ratingCount ?? reviews.length ?? 1} peringkat
            </span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Belum ada rating untuk produk ini.</p>
      )}

      {reviews.length > 0 && (
        <>
          <div className="flex flex-col divide-y divide-border border-t border-border">
            {visible.map((review, i) => (
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
                  {review.reviewSource && (
                    <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {review.reviewSource}
                    </span>
                  )}
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
          {reviews.length > INITIAL_COUNT && (
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="w-fit text-sm font-medium text-primary hover:underline"
            >
              {showAll ? "Lihat Lebih Sedikit" : `Lihat Semua Ulasan (${reviews.length})`}
            </button>
          )}
        </>
      )}
    </div>
  );
}
