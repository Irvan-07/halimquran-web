import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Gift,
  HeartHandshake,
  LayoutGrid,
  Newspaper,
  PackageSearch,
  PenLine,
  ShieldCheck,
  Tag,
  Truck,
} from "lucide-react";
import type { HomeProps } from "../types";
import { BlibliHeroScroller } from "./HeroScroller";
import { BlibliProductCard } from "./ProductCard";
import { BlibliProductGrid } from "./ProductGrid";

const trust = [
  { label: "Produk resmi Halim Qur'an", icon: ShieldCheck },
  { label: "Dikirim 24 jam", icon: Truck },
  { label: "Pembayaran aman: QRIS, VA & e-wallet", icon: CreditCard },
  { label: "Bisa ukir nama", icon: PenLine },
] as const;

const shortcuts = [
  { label: "Semua Produk", href: "/produk", icon: LayoutGrid },
  { label: "Promo", href: "/promo", icon: Tag },
  { label: "Gift & Souvenir", href: "/gift", icon: Gift },
  { label: "Wakaf Quran", href: "/wakaf", icon: HeartHandshake },
  { label: "Custom Quran", href: "/custom-quran", icon: PenLine },
  { label: "Artikel", href: "/artikel", icon: Newspaper },
  { label: "Cek Pesanan", href: "/pesanan/lacak", icon: PackageSearch },
] as const;

const hideScrollbar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

// Marketplace homepage with two layouts from one markup:
//  - desktop (lg+): peeking banner strip, a centered trust line, one row of
//    icon+label shortcuts, a 7-up category tile row, and each rail as a
//    light-blue panel with the category photo on the left and four product
//    cards beside it;
//  - phone: swipe banner, a scrolling trust line, a scrolling icon row with
//    labels underneath, category tiles you swipe, and every rail as a
//    horizontal card scroller inside the blue panel.
// Ends with an "all products" grid (items not already shown above).
export function BlibliHome({ rails, catalog }: HomeProps) {
  const categories = rails.filter((r) => r.banner);
  const shown = new Set(rails.flatMap((r) => r.products.map((p) => p.slug)));
  const more = catalog.filter((p) => !shown.has(p.slug)).slice(0, 20);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-8 pt-3 lg:gap-8 lg:px-8 lg:pt-5">
      <BlibliHeroScroller />

      {/* Trust line */}
      <ul className={`-mx-4 flex gap-6 overflow-x-auto px-4 text-xs text-foreground lg:mx-0 lg:justify-center lg:gap-10 lg:px-0 lg:text-sm ${hideScrollbar}`}>
        {trust.map(({ label, icon: Icon }) => (
          <li key={label} className="flex shrink-0 items-center gap-2">
            <Icon className="size-4 text-primary lg:size-5" />
            {label}
          </li>
        ))}
      </ul>

      {/* Shortcuts */}
      <nav aria-label="Pintasan">
        <ul
          className={`-mx-4 flex gap-3 overflow-x-auto px-4 lg:mx-0 lg:justify-between lg:gap-0 lg:overflow-visible lg:rounded-2xl lg:border lg:border-border lg:px-4 lg:py-3 ${hideScrollbar}`}
        >
          {shortcuts.map(({ label, href, icon: Icon }) => (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                className="group flex w-[72px] flex-col items-center gap-1.5 text-center lg:w-auto lg:whitespace-nowrap lg:rounded-xl lg:px-2 lg:py-2 lg:hover:bg-accent xl:flex-row xl:gap-2.5 xl:px-3 xl:text-left"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-primary lg:size-10 lg:rounded-xl">
                  <Icon className="size-6 lg:size-5" />
                </span>
                <span className="text-[11px] leading-tight text-foreground lg:text-sm lg:leading-none">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Categories */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-foreground lg:text-xl">Kategori pilihan</h2>
        <ul className={`-mx-4 flex gap-3 overflow-x-auto px-4 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-4 lg:overflow-visible lg:px-0 ${hideScrollbar}`}>
          {categories.map((c) => (
            <li key={c.slug} className="w-28 shrink-0 lg:w-auto">
              <Link href={c.href} className="group flex flex-col gap-2">
                <span className="relative block aspect-square overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={c.banner!.imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 160px, 112px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="text-center text-xs font-medium text-foreground group-hover:text-primary lg:text-sm">
                  {c.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Rails */}
      {rails.map((rail) => (
        <section key={rail.slug} className="flex flex-col gap-3 rounded-2xl bg-accent p-3 lg:gap-4 lg:p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground lg:text-xl">{rail.title}</h2>
            <Link href={rail.href} className="text-sm font-semibold text-primary hover:underline">
              Selengkapnya
            </Link>
          </div>
          <div className={rail.banner ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,4fr)] lg:gap-4" : undefined}>
            {rail.banner && (
              <Link
                href={rail.href}
                aria-label={rail.title}
                className="relative hidden overflow-hidden rounded-xl bg-secondary lg:block"
              >
                <Image
                  src={rail.banner.imageUrl}
                  alt=""
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
            )}
            <div className={`flex snap-x gap-2.5 overflow-x-auto lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible ${hideScrollbar}`}>
              {rail.products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="w-[44vw] max-w-52 shrink-0 snap-start rounded-xl bg-background p-2 lg:w-auto lg:max-w-none"
                >
                  <BlibliProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* All products */}
      {more.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-foreground lg:text-xl">Rekomendasi buat kamu</h2>
          <BlibliProductGrid>
            {more.map((product) => (
              <BlibliProductCard key={product.id} product={product} />
            ))}
          </BlibliProductGrid>
          <Link
            href="/produk"
            className="mx-auto mt-1 flex h-11 w-full max-w-xs items-center justify-center rounded-full border border-primary text-sm font-semibold text-primary hover:bg-accent"
          >
            Lihat semua produk
          </Link>
        </section>
      )}
    </div>
  );
}
