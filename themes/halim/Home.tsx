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

      <div className="flex flex-col gap-10 pb-4 pt-6">
        {rails.map((rail) => (
          <Reveal
            key={rail.slug}
            className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8"
          >
            {rail.banner && (
              <Link
                href={rail.href}
                className="group relative -mx-4 w-[calc(100%+2rem)] overflow-hidden bg-secondary sm:mx-0 sm:w-full sm:rounded-lg"
                style={{ aspectRatio: rail.banner.aspectRatio }}
              >
                <Image
                  src={rail.banner.imageUrl}
                  alt={rail.banner.pillLabel ?? ""}
                  fill
                  sizes="(min-width: 1024px) 1152px, 100vw"
                  className="object-cover"
                />
                {rail.banner.pillLabel && (
                  <span className="absolute bottom-3 left-3 rounded-full border border-foreground/70 bg-background px-4 py-1.5 text-sm font-medium text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    {rail.banner.pillLabel}
                  </span>
                )}
              </Link>
            )}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {rail.products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Link
              href={rail.href}
              className="ml-auto flex items-center gap-0.5 text-sm font-medium text-primary hover:underline"
            >
              Lihat Semua
              <ChevronRight className="size-4" />
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6">
        <LifestyleMarquee items={LIFESTYLE_ITEMS} />
      </div>
    </div>
  );
}
