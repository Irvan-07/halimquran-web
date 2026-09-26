"use client";

import Image from "next/image";
import { useProductMedia } from "@/components/product/ProductMediaContext";
import type { Product } from "@/types/product";

// Matches the live halimquran.com PDP gallery: full-bleed main image on
// mobile (edge-to-edge, no rounded corners — the page's own side padding
// is cancelled with a negative margin). The back button that goes with
// it lives in the site Header (it replaces the hamburger there on PDP
// pages), not floated over the image — see components/layout/Header.tsx.
// Contained/rounded again from `sm:` up, where there's room for the
// normal 2-column layout. The thumbnail strip below is the product's own
// real gallery photos (lifestyle shots + a size-chart graphic) —
// separate from the "Warna" color picker further down the page (see
// ProductColorPicker).
export function ProductGallery({ product }: { product: Product }) {
  const { gallery, selectedImage, setSelectedImage } = useProductMedia();

  return (
    <div className="flex flex-col gap-3">
      <div className="relative -mx-4 aspect-square w-[calc(100%+2rem)] overflow-hidden bg-secondary sm:mx-0 sm:w-full sm:rounded-lg">
        {selectedImage && (
          <Image
            key={selectedImage}
            src={selectedImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setSelectedImage(src)}
              className={`relative aspect-square overflow-hidden rounded-md border ${
                src === selectedImage ? "border-primary" : "border-border"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
