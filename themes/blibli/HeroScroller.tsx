"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/components/sections/HeroCarousel";

const AUTO_ADVANCE_MS = 5000;

// Banner strip where the neighbouring slides peek in from the sides: native
// scroll-snap, so it swipes on phones, plus arrows on desktop and a gentle
// auto-advance (paused while hovered or touched). Same real campaign
// banners as the default homepage.
export function BlibliHeroScroller() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [active, setActive] = useState(0);
  const count = HERO_SLIDES.length;

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current) return;
      setActive((a) => {
        const next = (a + 1) % count;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [count]);

  function onScroll() {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    const second = track?.children[1] as HTMLElement | undefined;
    if (!track || !first || !second) return;
    const step = second.offsetLeft - first.offsetLeft;
    setActive(Math.min(count - 1, Math.round(track.scrollLeft / step)));
  }

  function go(delta: number) {
    const next = (active + delta + count) % count;
    setActive(next);
    scrollToIndex(next);
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
        className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="relative aspect-[4/3] w-[88%] shrink-0 snap-start overflow-hidden rounded-2xl bg-secondary sm:w-[60%] lg:w-[calc((100%-1.5rem)/2.4)]"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i < 2}
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 60vw, 88vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Sebelumnya"
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 lg:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Berikutnya"
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 lg:flex"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="mt-3 flex justify-center gap-1.5">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => {
              setActive(i);
              scrollToIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}
