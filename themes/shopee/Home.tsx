import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Gift,
  HeartHandshake,
  LayoutGrid,
  Newspaper,
  PackageSearch,
  PenLine,
  Store,
  Tag,
} from "lucide-react";
import type { HomeProps } from "../types";
import { ShopeeHeroBanner } from "./HeroBanner";
import { ShopeeProductCard } from "./ProductCard";
import { ShopeeProductGrid } from "./ProductGrid";

const quickLinks = [
  { label: "Semua Produk", href: "/produk", icon: LayoutGrid },
  { label: "Promo", href: "/promo", icon: Tag },
  { label: "Gift & Souvenir", href: "/gift", icon: Gift },
  { label: "Wakaf Quran", href: "/wakaf", icon: HeartHandshake },
  { label: "Custom Quran", href: "/custom-quran", icon: PenLine },
  { label: "Artikel", href: "/artikel", icon: Newspaper },
  { label: "Lacak Pesanan", href: "/pesanan/lacak", icon: PackageSearch },
  { label: "Tentang Kami", href: "/tentang-kami", icon: Store },
] as const;

// Marketplace homepage, built differently per breakpoint from one markup:
//  - desktop (lg+): banner on the left with a "Kategori" tile panel beside
//    it, one-row shortcut strip, then each rail as a white card with the
//    category photo on the left and four products beside it;
//  - phone: full-width swipe banner, 4x2 shortcut grid, round category
//    thumbnails you scroll sideways, and each rail as a horizontal
//    product scroller under its title.
// Finishes with an "all products" grid (items not already shown above).
export function ShopeeHome({ rails, catalog }: HomeProps) {
  const categories = rails.filter((r) => r.banner);
  const shown = new Set(rails.flatMap((r) => r.products.map((p) => p.slug)));
  const more = catalog.filter((p) => !shown.has(p.slug)).slice(0, 20);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 pb-6 lg:gap-4 lg:px-8 lg:py-5">
      {/* Banner (+ category panel on desktop) */}
      <section className="flex flex-col lg:grid lg:grid-cols-[480px_minmax(0,1fr)] lg:gap-1">
        <ShopeeHeroBanner className="lg:aspect-auto lg:h-full lg:rounded-sm" />
        <div className="hidden flex-col bg-card lg:flex lg:rounded-sm lg:shadow-sm">
          <h2 className="border-b border-border/60 px-5 py-3 text-sm font-medium uppercase text-foreground/80">
            Kategori
          </h2>
          <ul className="grid flex-1 grid-cols-4 gap-x-2 gap-y-3 p-4">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={c.href} className="group flex flex-col gap-1.5">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-sm bg-secondary">
                    <Image
                      src={c.banner!.imageUrl}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </span>
                  <span className="truncate text-center text-xs text-foreground group-hover:text-primary">
                    {c.title}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/produk" className="group flex flex-col gap-1.5">
                <span className="flex aspect-[4/3] items-center justify-center rounded-sm bg-accent text-primary">
                  <LayoutGrid className="size-7" />
                </span>
                <span className="truncate text-center text-xs text-foreground group-hover:text-primary">
                  Semua Produk
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Shortcuts */}
      <nav aria-label="Pintasan" className="bg-card lg:rounded-sm lg:shadow-sm">
        <ul className="grid grid-cols-4 gap-y-4 px-2 py-4 lg:grid-cols-8 lg:px-5">
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className="group flex flex-col items-center gap-1.5 text-center">
                <span className="flex size-11 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground lg:size-12">
                  <Icon className="size-5 lg:size-6" />
                </span>
                <span className="px-1 text-[11px] leading-tight text-foreground lg:text-xs">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Phone-only: category thumbnails */}
      <section className="bg-card lg:hidden">
        <h2 className="px-3 pt-3 text-sm font-medium uppercase text-foreground/80">Kategori</h2>
        <ul className="flex gap-3 overflow-x-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link href={c.href} className="flex w-[4.5rem] flex-col items-center gap-1.5">
                <span className="relative block size-16 overflow-hidden rounded-full border border-border bg-secondary">
                  <Image src={c.banner!.imageUrl} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="line-clamp-2 min-h-[2.2em] w-full text-center text-[11px] leading-tight text-foreground">{c.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Product rails */}
      {rails.map((rail) => (
        <section key={rail.slug} className="bg-card lg:rounded-sm lg:shadow-sm">
          <div className="flex items-center justify-between px-3 py-3 lg:border-b lg:border-border/60 lg:px-5 lg:py-3.5">
            <h2 className="text-sm font-medium uppercase text-primary lg:text-base">{rail.title}</h2>
            <Link href={rail.href} className="flex items-center gap-0.5 text-sm text-muted-foreground hover:text-primary lg:text-primary">
              Lihat Semua <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className={rail.banner ? "lg:grid lg:grid-cols-[220px_minmax(0,1fr)]" : undefined}>
            {rail.banner && (
              <Link
                href={rail.href}
                aria-label={rail.title}
                className="relative hidden overflow-hidden bg-secondary lg:block"
              >
                <Image
                  src={rail.banner.imageUrl}
                  alt=""
                  fill
                  sizes="220px"
                  className="object-cover transition-transform hover:scale-105"
                />
              </Link>
            )}
            <div className="flex snap-x gap-2 overflow-x-auto px-3 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:gap-2 lg:overflow-visible lg:p-3">
              {rail.products.slice(0, 4).map((product) => (
                <div key={product.id} className="w-[42vw] max-w-52 shrink-0 snap-start lg:w-auto lg:max-w-none">
                  <ShopeeProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* All products */}
      {more.length > 0 && (
        <section className="flex flex-col gap-2 px-1.5 pt-1 lg:gap-3 lg:px-0">
          <h2 className="border-b-4 border-primary bg-card py-3 text-center text-sm font-medium uppercase text-primary lg:text-base">
            Rekomendasi untuk Kamu
          </h2>
          <ShopeeProductGrid>
            {more.map((product) => (
              <ShopeeProductCard key={product.id} product={product} />
            ))}
          </ShopeeProductGrid>
          <Link
            href="/produk"
            className="mx-auto mt-2 flex h-10 w-full max-w-xs items-center justify-center rounded-sm border border-border bg-card text-sm text-foreground hover:border-primary hover:text-primary"
          >
            Lihat Lainnya
          </Link>
        </section>
      )}
    </div>
  );
}
