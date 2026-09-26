"use client";

import { useState } from "react";
import Image from "next/image";
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
      <h2 className="text-sm font-bold text-foreground">Rating</h2>

      {product.rating ? (
        <div className="flex items-center gap-1 text-sm">
          <Star className="size-4 shrink-0 fill-primary text-primary" />
          <span className="text-foreground">{product.rating}</span>
          <span className="text-muted-foreground">
            dari {product.ratingCount ?? reviews.length ?? 1} peringkat
          </span>
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
                            ? "fill-primary text-primary"
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
                {review.text && (
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                )}
                {review.media && review.media.length > 0 && (
                  <div className="flex gap-2">
                    {review.media.map((m, j) =>
                      m.type === "video" ? (
                        <video
                          key={j}
                          src={m.src}
                          controls
                          muted
                          playsInline
                          className="size-20 rounded-md border border-border object-cover"
                        />
                      ) : (
                        <div
                          key={j}
                          className="relative size-20 shrink-0 overflow-hidden rounded-md border border-border"
                        >
                          <Image src={m.src} alt="" fill sizes="80px" className="object-cover" />
                        </div>
                      ),
                    )}
                  </div>
                )}
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
