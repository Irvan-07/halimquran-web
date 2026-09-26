"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Real campaign banners from halimquran.com's homepage carousel (saved
// 26 Sep 2026 — the live site rotates through these same images, source
// filenames Artboard_6 through Artboard_11 plus HALIMOMENT_SEKOLAH). The
// text/logo seen in each banner is baked into the image itself (the
// business's own design asset), not rendered by this component.
const SLIDES = [
  { src: "/hero/banner-1.jpg", alt: "Siswa berprestasi selalu punya waktu untuk mengaji" },
  { src: "/hero/banner-2.jpg", alt: "Promo Halim Quran" },
  { src: "/hero/banner-3.jpg", alt: "Promo Halim Quran" },
  { src: "/hero/banner-4.jpg", alt: "Promo Halim Quran" },
  { src: "/hero/banner-5.jpg", alt: "Promo Halim Quran" },
  { src: "/hero/banner-6.jpg", alt: "Promo Halim Quran" },
  { src: "/hero/banner-7.jpg", alt: "Promo Halim Quran" },
];

const AUTO_ADVANCE_MS = 5000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, []);

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
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
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
