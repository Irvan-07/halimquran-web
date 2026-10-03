"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DEFAULT_HERO_SLIDES, type HeroSlide } from "./hero-slides";
import { SlideLink } from "./SlideLink";

const AUTO_ADVANCE_MS = 5000;
// A drag shorter than this (px) counts as a tap, so the slide's link still opens.
const TAP_SLOP = 6;
// Fraction of the banner width the pointer must travel to change slides.
const SWIPE_THRESHOLD = 0.15;

const mod = (n: number, m: number) => ((n % m) + m) % m;

// The slides come from the CMS (see getHeroSlides) and each may be a link;
// without any they fall back to the built-in banners. Like halimquran.com's
// own banner it slides sideways, loops forever, and can be dragged or
// swiped (touch and mouse).
export function HeroCarousel({ slides = DEFAULT_HERO_SLIDES }: { slides?: HeroSlide[] }) {
  // `position` keeps counting up/down (it is never wrapped) so every slide
  // can be placed relative to it and the loop has no visible seam.
  const [position, setPosition] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const count = slides.length;
  const active = mod(position, count);

  const frame = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, moved: 0, pointerId: -1 });

  const paused = dragging || hovered;
  useEffect(() => {
    if (count < 2 || paused) return;
    const id = setInterval(() => setPosition((p) => p + 1), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [count, paused, position]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (count < 2 || (e.pointerType === "mouse" && e.button !== 0)) return;
    drag.current = { startX: e.clientX, moved: 0, pointerId: e.pointerId };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || e.pointerId !== drag.current.pointerId) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    if (drag.current.moved > TAP_SLOP && !e.currentTarget.hasPointerCapture(e.pointerId)) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // The pointer ended already (e.g. a cancelled touch); the drag still tracks.
      }
    }
    setDragPx(dx);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || e.pointerId !== drag.current.pointerId) return;
    const width = frame.current?.clientWidth ?? 1;
    if (Math.abs(dragPx) > width * SWIPE_THRESHOLD) {
      setPosition((p) => p + (dragPx < 0 ? 1 : -1));
    }
    setDragging(false);
    setDragPx(0);
  };

  // A drag that ends on a link must not also follow it.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > TAP_SLOP) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = 0;
    }
  };

  // 4:3 matches the source banners' native ratio (and the live site's own
  // display box) — a wider crop would cut off baked-in logo/text near the
  // top and bottom of each graphic. No max-height: capping height while
  // staying full-bleed width forces a much wider effective crop than 4:3
  // on large screens (e.g. 2000px wide at a 480px cap ≈ 4.2:1), which is
  // exactly the over-crop this comment says to avoid — confirmed cropping
  // the logo out on the deployed site, matching the live site's own
  // (tall-on-wide-screens) behavior instead.
  return (
    <div
      ref={frame}
      className="relative -mt-16 aspect-[4/3] w-full cursor-grab touch-pan-y select-none overflow-hidden bg-secondary active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClickCapture={onClickCapture}
      onDragStart={(e) => e.preventDefault()}
    >
      {slides.map((slide, i) => {
        // Where this slide sits relative to the active one: -1 = just left of
        // the frame, 0 = in view, 1 = just right, anything further waits
        // off-screen on the right until its turn comes round.
        const rel = mod(i - position + 1, count) - 1;
        const nearby = rel >= -1 && rel <= 1;
        return (
          <div
            key={slide.src + i}
            className={`absolute inset-0 ${
              dragging || !nearby ? "" : "transition-transform duration-500 ease-out"
            }`}
            style={{ transform: `translateX(calc(${rel * 100}% + ${dragPx}px))` }}
            aria-hidden={rel !== 0}
          >
            <SlideLink
              href={slide.href}
              label={slide.alt}
              className={`absolute inset-0 ${rel === 0 ? "" : "pointer-events-none"}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                draggable={false}
                sizes="100vw"
                className="object-cover"
              />
            </SlideLink>
          </div>
        );
      })}

      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src + i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setPosition((p) => p + mod(i - p, count))}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-white" : "w-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
