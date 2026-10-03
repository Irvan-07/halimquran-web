"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SlideLink } from "@/components/sections/SlideLink";
import type { HeroSlide } from "@/components/sections/hero-slides";

const AUTO_ADVANCE_MS = 5000;

// Banner strip with native scroll-snap (swipe on phones, arrows on desktop)
// and a gentle auto-advance, paused while hovered/touched. Same real campaign
// banners as the other themes, shown differently:
//  - phone: one full-bleed banner at a time with a segment bar on top of it;
//  - desktop: three banners side by side (each keeps its 4:3 design), dots
//    underneath.
export function TokopediaBanner({ slides }: { slides: HeroSlide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [active, setActive] = useState(0);
  const [positions, setPositions] = useState(slides.length);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const a = track?.children[0] as HTMLElement | undefined;
    const b = track?.children[1] as HTMLElement | undefined;
    if (!track || !a || !b) return null;
    const step = b.offsetLeft - a.offsetLeft;
    const max = Math.max(0, Math.round((track.scrollWidth - track.clientWidth) / step));
    return { track, step, max };
  }, []);

  const scrollToIndex = useCallback(
    (i: number) => {
      const m = measure();
      if (m) m.track.scrollTo({ left: i * m.step, behavior: "smooth" });
    },
    [measure],
  );

  useEffect(() => {
    const update = () => {
      const m = measure();
      if (m) setPositions(m.max + 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [measure]);

  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current) return;
      const m = measure();
      if (!m) return;
      const cur = Math.round(m.track.scrollLeft / m.step);
      scrollToIndex(cur >= m.max ? 0 : cur + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [measure, scrollToIndex]);

  function onScroll() {
    const m = measure();
    if (m) setActive(Math.min(m.max, Math.round(m.track.scrollLeft / m.step)));
  }

  function go(delta: number) {
    const m = measure();
    if (!m) return;
    const cur = Math.round(m.track.scrollLeft / m.step);
    scrollToIndex(delta > 0 ? (cur >= m.max ? 0 : cur + 1) : cur <= 0 ? m.max : cur - 1);
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => (paused.current = false)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <SlideLink
            key={slide.src + i}
            href={slide.href}
            label={slide.alt}
            className="relative aspect-[4/3] w-full shrink-0 snap-start overflow-hidden bg-secondary sm:w-[calc((100%-0.75rem)/2)] sm:rounded-xl lg:w-[calc((100%-1.5rem)/3)]"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i < 3}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </SlideLink>
        ))}
      </div>

      {/* Phone: segment bar over the banner */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1 sm:hidden">
        {slides.map((slide, i) => (
          <span
            key={slide.src}
            className={`h-1 rounded-full transition-all ${i === active ? "w-6 bg-primary" : "w-2 bg-background/70"}`}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Sebelumnya"
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-opacity group-hover:opacity-100 sm:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Berikutnya"
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-opacity group-hover:opacity-100 sm:flex"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Desktop/tablet: dots below */}
      <div className="mt-3 hidden justify-center gap-1.5 sm:flex">
        {Array.from({ length: positions }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Posisi ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}
