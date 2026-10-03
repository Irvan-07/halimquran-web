"use client";

import { useRef } from "react";
import Image from "next/image";
import { useProductMedia } from "@/components/product/ProductMediaContext";
import { customizationOptions } from "@/components/product/usePurchase";
import type { Product } from "@/types/product";

// Two behaviors from one component:
//  - desktop: rounded photo with a row of thumbnails underneath (sticky in
//    the left column);
//  - phone: edge-to-edge photo you swipe through, then a "9 warna" strip of
//    the colour variants — tapping one selects it, like the app.
export function TokopediaGallery({ product }: { product: Product }) {
  const { gallery, selectedImage, setSelectedImage, selectedVariantId, setSelectedVariantId, availability } =
    useProductMedia();
  const touchStartX = useRef<number | null>(null);
  const index = Math.max(0, gallery.indexOf(selectedImage));
  const variants = product.colorVariants ?? [];

  function go(delta: number) {
    if (gallery.length < 2) return;
    setSelectedImage(gallery[(index + delta + gallery.length) % gallery.length]);
  }

  return (
    <div className="flex min-w-0 flex-col gap-3 lg:sticky lg:top-40 lg:self-start">
      <div
        className="relative aspect-square w-full touch-pan-y overflow-hidden bg-secondary lg:rounded-lg"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        {selectedImage && (
          <Image
            key={selectedImage}
            src={selectedImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 340px, 100vw"
            className="object-cover"
            priority
          />
        )}
        {gallery.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-foreground/60 px-2.5 py-0.5 text-xs text-white lg:hidden">
            {index + 1}/{gallery.length}
          </span>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="hidden grid-cols-5 gap-2 lg:grid">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setSelectedImage(src)}
              onMouseEnter={() => setSelectedImage(src)}
              aria-label={`Foto ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                src === selectedImage ? "border-primary" : "border-transparent"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Phone: colour strip */}
      {variants.length > 0 && (
        <div className="px-3 lg:hidden">
          <p className="mb-2 text-sm text-muted-foreground">{variants.length} warna, {customizationOptions.length} pilihan order</p>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {variants.map((v, i) => {
              const soldOut = v.variantId !== undefined && availability[v.variantId]?.available === false;
              const selected = v.variantId !== undefined && v.variantId === selectedVariantId;
              return (
                <button
                  key={v.hex + i}
                  type="button"
                  aria-label={v.name}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedImage(v.imageUrl);
                    setSelectedVariantId(soldOut ? null : (v.variantId ?? null));
                  }}
                  className={`relative size-12 shrink-0 overflow-hidden rounded-lg border-2 ${
                    selected ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image src={v.imageUrl} alt="" fill sizes="48px" className={`object-cover ${soldOut ? "opacity-50" : ""}`} />
                  {soldOut && (
                    <span className="absolute inset-0 flex items-center justify-center bg-foreground/55 text-[10px] font-bold text-white">
                      Habis
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
