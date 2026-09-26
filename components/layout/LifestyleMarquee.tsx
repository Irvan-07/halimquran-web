"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface LifestyleItem {
  type: "image" | "video";
  src: string;
  cta?: boolean;
}

const STEP_INTERVAL_MS = 1500;
const TRANSITION_MS = 400;

// Matches halimquran.com's own strip exactly (measured on the live site,
// not guessed): it's a step carousel, not a smooth-scrolling marquee —
// holds each position for ~1s then snaps to the next over ~300-400ms,
// moving one item-width per step. Item width is ~43% of the viewport on
// mobile (also measured), fixed 256px from `sm:` up.
export function LifestyleMarquee({ items }: { items: LifestyleItem[] }) {
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), STEP_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (step !== items.length) return;
    // Reached the duplicated copy — once that transition lands, snap back
    // to the real first copy with no transition so the loop is seamless.
    const t = setTimeout(() => {
      setAnimate(false);
      setStep(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }, TRANSITION_MS);
    return () => clearTimeout(t);
  }, [step, items.length]);

  return (
    <div className="w-full overflow-hidden [--lw-item-w:43vw] sm:[--lw-item-w:256px]">
      <div
        className="flex gap-1"
        style={{
          transform: `translateX(calc(-${step} * (var(--lw-item-w) + 0.25rem)))`,
          transition: animate ? `transform ${TRANSITION_MS}ms ease-out` : "none",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="relative aspect-[2/3] w-[var(--lw-item-w)] shrink-0"
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <Image src={item.src} alt="" fill sizes="256px" className="object-cover" />
            )}
            {item.cta && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
                <span className="text-2xl font-semibold leading-tight text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)] sm:text-3xl">
                  All Product
                </span>
                <Link
                  href="/produk"
                  className="rounded-2xl bg-secondary px-6 py-2.5 text-sm font-medium text-foreground"
                >
                  Here
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
