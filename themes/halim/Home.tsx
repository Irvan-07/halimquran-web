import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroCarousel } from "@/components/sections";
import { Reveal } from "@/components/layout/Reveal";
import { LifestyleMarquee, type LifestyleItem } from "@/components/layout/LifestyleMarquee";
import type { HomeProps } from "../types";

// Real lifestyle media from the scrolling gallery strip halimquran.com
// shows just above its footer (saved 26 Sep 2026): 3 photos + 1 short
// looping video (confirmed on the live site — the 4th slot is a <video>,
// not a still photo; a frame of it was mistaken for a photo earlier).
// The live strip is a step carousel (see LifestyleMarquee), looping this
// same 4-item set back-to-back.
const LIFESTYLE_ITEMS: LifestyleItem[] = [
  { type: "image", src: "/lifestyle/photo-1.png" },
  { type: "image", src: "/lifestyle/photo-2.png" },
  { type: "image", src: "/lifestyle/photo-3.png" },
  // The video used to carry an "All Product / Here" overlay (as on the old
  // live site); removed on request — every item is plain media now.
  { type: "video", src: "/lifestyle/video-1.mp4" },
];

// The original halimquran.com homepage (moved here unchanged from the
// route file so other themes can swap it out). The rail contents/order are
// defined in app/page.tsx.
export function HalimHome({ rails, banners }: HomeProps) {
  return (
    <div className="flex flex-col">
      <HeroCarousel slides={banners} />

      {/* Spacing measured off the live home: 25px under the hero, 12px
          between every banner / product block, 8px page gutter, 8px (phone) or
          15px (tablet+) between cards, 2 columns on phones and 4 from md up. */}
      <div className="flex flex-col gap-3 pb-3 pt-[25px]">
        {rails.map((rail) => {
          const shown = rail.products.slice(0, rail.limit ?? 4);
          // A long block (the best sellers) goes 5 across on tablet+ when that
          // fills whole rows (10 -> 5+5); otherwise 4 across like the live home.
          const fiveAcross = shown.length > 4 && shown.length % 5 === 0;
          return (
            <Reveal
              key={rail.slug}
              className="mx-auto flex w-full max-w-[1280px] flex-col gap-3 px-2"
            >
              {rail.banner && (
                <Link
                  href={rail.href}
                  className="group relative -mx-2 w-[calc(100%+1rem)] overflow-hidden bg-secondary"
                  style={{ aspectRatio: rail.banner.aspectRatio }}
                >
                  <Image
                    src={rail.banner.imageUrl}
                    alt={rail.banner.pillLabel ?? ""}
                    fill
                    sizes="(min-width: 1280px) 1280px, 100vw"
                    className="object-cover"
                  />
                  {rail.banner.pillLabel && (
                    <span className="absolute bottom-3 left-3 rounded-full border border-foreground/70 bg-background px-4 py-1.5 text-sm font-medium text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      {rail.banner.pillLabel}
                    </span>
                  )}
                </Link>
              )}
              <div className="flex flex-col">
                <div
                  className={`grid grid-cols-2 gap-2 sm:gap-[15px] ${
                    fiveAcross ? "md:grid-cols-5" : "md:grid-cols-4"
                  }`}
                >
                  {shown.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Link
                  href={rail.href}
                  className="-mt-[5px] ml-auto flex h-9 items-center gap-0.5 px-2 text-sm font-medium text-primary hover:underline"
                >
                  Lihat Semua
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-6">
        <LifestyleMarquee items={LIFESTYLE_ITEMS} />
      </div>
    </div>
  );
}
