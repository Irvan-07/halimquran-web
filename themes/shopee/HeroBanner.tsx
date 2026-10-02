"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/components/sections/HeroCarousel";

const AUTO_ADVANCE_MS = 5000;

// Same real campaign banners as the default homepage, in a marketplace
// frame: arrows on hover (desktop), swipe (mobile), dots, auto-advance.
// Unlike the default hero it sits below the solid header, not under it.
export function ShopeeHeroBanner({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = HERO_SLIDES.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [index, count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <div
      className={`group relative aspect-[4/3] w-full touch-pan-y overflow-hidden bg-secondary ${className}`}
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
      {HERO_SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 480px, 100vw"
          className={`object-cover transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      <button
        type="button"
        aria-label="Sebelumnya"
        onClick={() => go(-1)}
        className="absolute left-0 top-1/2 hidden h-14 w-8 -translate-y-1/2 items-center justify-center bg-black/30 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover:opacity-100 lg:flex"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Berikutnya"
        onClick={() => go(1)}
        className="absolute right-0 top-1/2 hidden h-14 w-8 -translate-y-1/2 items-center justify-center bg-black/30 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover:opacity-100 lg:flex"
      >
        <ChevronRight className="size-6" />
      </button>

      <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-4 bg-primary" : "w-1.5 bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}
