"use client";

import { useRef } from "react";
import Image from "next/image";
import { useProductMedia } from "@/components/product/ProductMediaContext";
import type { Product } from "@/types/product";

// Marketplace gallery with two behaviors:
//  - desktop: square photo in the left column, hover/click thumbnails
//    underneath (5 per row);
//  - mobile: edge-to-edge photo you swipe left/right through, with an
//    "n/N" counter chip and a scrollable thumbnail strip below.
// Both drive the same shared state as the color picker.
export function ShopeeGallery({ product }: { product: Product }) {
  const { gallery, selectedImage, setSelectedImage } = useProductMedia();
  const touchStartX = useRef<number | null>(null);
  const index = Math.max(0, gallery.indexOf(selectedImage));

  function go(delta: number) {
    if (gallery.length < 2) return;
    setSelectedImage(gallery[(index + delta + gallery.length) % gallery.length]);
  }

  return (
    <div className="flex min-w-0 flex-col gap-2 bg-card lg:gap-3 lg:bg-transparent">
      <div
        className="relative aspect-square w-full touch-pan-y overflow-hidden bg-secondary"
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
            sizes="(min-width: 1024px) 460px, 100vw"
            className="object-cover"
            priority
          />
        )}
        {gallery.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-0.5 text-xs text-white lg:hidden">
            {index + 1}/{gallery.length}
          </span>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto px-3 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:gap-2 lg:overflow-visible lg:px-0 lg:pb-0">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setSelectedImage(src)}
              onMouseEnter={() => setSelectedImage(src)}
              aria-label={`Foto ${i + 1}`}
              className={`relative size-16 shrink-0 overflow-hidden border-2 lg:size-auto lg:aspect-square ${
                src === selectedImage ? "border-primary" : "border-transparent lg:border-border"
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
