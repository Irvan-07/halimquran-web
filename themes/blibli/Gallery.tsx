"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { useProductMedia } from "@/components/product/ProductMediaContext";
import type { Product } from "@/types/product";

// Two behaviors from one component:
//  - desktop: rounded square photo with a row of thumbnails underneath;
//  - phone: edge-to-edge photo you swipe through, with round back / bag
//    buttons floating over it (the page has no header bar on phones) and
//    an "n/N" chip.
export function BlibliGallery({ product, backHref }: { product: Product; backHref: string }) {
  const { gallery, selectedImage, setSelectedImage } = useProductMedia();
  const { itemCount } = useCart();
  const touchStartX = useRef<number | null>(null);
  const index = Math.max(0, gallery.indexOf(selectedImage));

  function go(delta: number) {
    if (gallery.length < 2) return;
    setSelectedImage(gallery[(index + delta + gallery.length) % gallery.length]);
  }

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div
        className="relative aspect-square w-full touch-pan-y overflow-hidden bg-secondary lg:rounded-xl"
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

        {/* Phone-only floating controls */}
        <Link
          href={backHref}
          aria-label="Kembali"
          className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-full bg-foreground/60 text-white lg:hidden"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <Link
          href="/keranjang"
          aria-label="Buka keranjang"
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-foreground/60 text-white lg:hidden"
        >
          <ShoppingBag className="size-5" />
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-[#FF3B3B] px-1 text-[10px] font-bold leading-4">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </Link>
        {gallery.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-md bg-foreground/60 px-2 py-0.5 text-xs text-white lg:hidden">
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
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
