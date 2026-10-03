"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProductMedia } from "@/components/product/ProductMediaContext";
import type { Product } from "@/types/product";

// Matches the live halimquran.com PDP gallery: full-bleed main image on
// mobile (edge-to-edge, no rounded corners — the page's own side padding
// is cancelled with a negative margin), contained/rounded from `sm:` up. The
// back button that goes with it lives in the site Header (it replaces the
// hamburger there on PDP pages), not floated over the image.
//
// The main photo is a real slider: swipe (or drag/scroll sideways) through
// every photo, use the arrows on desktop, or tap a thumbnail — and the photos
// also advance on their own (see ProductMediaProvider, which pauses that
// whenever the shopper interacts). The thumbnail strip is the product's own
// real gallery photos, separate from the "Warna" colour picker further down
// (see ProductColorPicker); picking a colour whose photo isn't in the
// gallery adds it as a last slide so it can be shown.
export function ProductGallery({ product }: { product: Product }) {
  const { gallery, selectedImage, setSelectedImage, setAutoplayHold } = useProductMedia();
  const slides = !selectedImage || gallery.includes(selectedImage) ? gallery : [...gallery, selectedImage];
  const index = Math.max(0, slides.indexOf(selectedImage));

  const trackRef = useRef<HTMLDivElement>(null);
  const programmatic = useRef(false);
  const flagTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Selection changed (thumbnail, arrow, colour, auto-advance) -> slide to it.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const target = index * track.clientWidth;
    if (Math.abs(track.scrollLeft - target) < 2) return;
    programmatic.current = true;
    clearTimeout(flagTimer.current);
    flagTimer.current = setTimeout(() => {
      programmatic.current = false;
    }, 700);
    track.scrollTo({ left: target, behavior: "smooth" });
  }, [index, slides.length]);

  // The shopper swiped -> make the slide they landed on the selected one.
  function onScroll() {
    if (programmatic.current) return;
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      const landed = slides[Math.round(track.scrollLeft / track.clientWidth)];
      if (landed && landed !== selectedImage) setSelectedImage(landed);
    }, 120);
  }

  function go(delta: number) {
    setSelectedImage(slides[(index + delta + slides.length) % slides.length]);
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="group relative -mx-4 w-[calc(100%+2rem)] overflow-hidden bg-secondary sm:mx-0 sm:w-full sm:rounded-lg"
        onMouseEnter={() => setAutoplayHold(true)}
        onMouseLeave={() => setAutoplayHold(false)}
      >
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((src, i) => (
            <div key={src + i} className="relative aspect-square w-full shrink-0 snap-center">
              <Image
                src={src}
                alt={i === 0 ? product.name : `${product.name} — foto ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={i === 0}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100 sm:flex"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Foto berikutnya"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100 sm:flex"
            >
              <ChevronRight className="size-5" />
            </button>
            <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-foreground/60 px-2.5 py-0.5 text-xs text-background">
              {index + 1}/{slides.length}
            </span>
          </>
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
