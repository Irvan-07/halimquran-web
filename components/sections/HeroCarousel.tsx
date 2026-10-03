"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DEFAULT_HERO_SLIDES, type HeroSlide } from "./hero-slides";
import { SlideLink } from "./SlideLink";

const AUTO_ADVANCE_MS = 5000;

// The slides come from the CMS (see getHeroSlides) and each may be a link;
// without any they fall back to the built-in banners.
export function HeroCarousel({ slides = DEFAULT_HERO_SLIDES }: { slides?: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [count]);

  // 4:3 matches the source banners' native ratio (and the live site's own
  // display box) — a wider crop would cut off baked-in logo/text near the
  // top and bottom of each graphic. No max-height: capping height while
  // staying full-bleed width forces a much wider effective crop than 4:3
  // on large screens (e.g. 2000px wide at a 480px cap ≈ 4.2:1), which is
  // exactly the over-crop this comment says to avoid — confirmed cropping
  // the logo out on the deployed site, matching the live site's own
  // (tall-on-wide-screens) behavior instead.
  return (
    <div className="relative -mt-16 aspect-[4/3] w-full overflow-hidden bg-secondary">
      {slides.map((slide, i) => (
        <SlideLink
          key={slide.src + i}
          href={slide.href}
          label={slide.alt}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </SlideLink>
      ))}

      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src + i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
