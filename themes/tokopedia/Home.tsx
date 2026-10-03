import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Gift,
  HeartHandshake,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Newspaper,
  PackageSearch,
  PenLine,
  Tag,
} from "lucide-react";
import type { HomeProps } from "../types";
import { TokopediaBanner } from "./Banner";
import { TokopediaProductCard } from "./ProductCard";
import { TokopediaProductGrid } from "./ProductGrid";

const shortcuts = [
  { label: "Semua Produk", href: "/produk", icon: LayoutGrid },
  { label: "Promo", href: "/promo", icon: Tag },
  { label: "Gift & Souvenir", href: "/gift", icon: Gift },
  { label: "Wakaf Quran", href: "/wakaf", icon: HeartHandshake },
  { label: "Custom Quran", href: "/custom-quran", icon: PenLine },
  { label: "Artikel", href: "/artikel", icon: Newspaper },
  { label: "Lacak Pesanan", href: "/pesanan/lacak", icon: PackageSearch },
] as const;

const hideScrollbar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const cardShadow = "shadow-[0_1px_6px_rgba(141,150,170,0.4)]";

// Marketplace homepage with two layouts from one markup:
//  - desktop (lg+): a "Kategori Populer" card (green promo block + category
//    chips), three banners side by side, then every rail as a white card —
//    the category photo as the first tile, four products after it;
//  - phone: full-bleed banner, a small shop card, round shortcut icons, a
//    scrolling chip row of categories, and every rail as a horizontal
//    scroller (the first one in a green panel).
// Ends with an "Untuk Kamu" feed of the products not already shown above.
export function TokopediaHome({ rails, catalog }: HomeProps) {
  const categories = rails.filter((r) => r.banner);
  const shown = new Set(rails.flatMap((r) => r.products.map((p) => p.slug)));
  const more = catalog.filter((p) => !shown.has(p.slug)).slice(0, 20);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-3 pb-6 pt-0 lg:gap-6 lg:px-8 lg:pt-5">
      {/* Banner */}
      <div className="-mx-3 sm:mx-0">
        <TokopediaBanner />
      </div>

      {/* Phone: shop card */}
      <section className="flex items-center gap-3 lg:hidden">
        <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
          <Image src="/logo.png" alt="" fill sizes="48px" className="object-contain p-1.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-foreground">Halim Qur&apos;an</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" /> Kab. Bandung
          </p>
        </div>
        <Link
          href="https://wa.me/6281128018990"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-extrabold text-primary-foreground"
        >
          <MessageCircle className="size-4" /> Chat
        </Link>
      </section>

      {/* Phone: shortcut icons */}
      <nav aria-label="Pintasan" className="lg:hidden">
        <ul className={`-mx-3 flex gap-3 overflow-x-auto px-3 ${hideScrollbar}`}>
          {shortcuts.map(({ label, href, icon: Icon }) => (
            <li key={href} className="shrink-0">
              <Link href={href} className="flex w-[68px] flex-col items-center gap-1.5 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="size-6" />
                </span>
                <span className="text-[11px] leading-tight text-foreground">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop: "Kategori Populer" card */}
      <section className={`hidden rounded-xl bg-background p-5 lg:block ${cardShadow}`}>
        <h2 className="text-xl font-extrabold text-foreground">Kategori Populer</h2>
        <div className="mt-4 grid grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-6">
          <Link
            href="/produk"
            className="relative flex min-h-36 flex-col justify-center gap-2 overflow-hidden rounded-lg bg-primary p-5 text-primary-foreground"
          >
            <span className="text-lg font-extrabold leading-tight">Yuk, belanja langsung dari Halim Qur&apos;an!</span>
            <span className="text-xs opacity-90">Mushaf Al-Quran, hadiah, wakaf, dan custom nama.</span>
            <span className="mt-1 w-fit rounded-md border border-white/80 px-3 py-1 text-xs font-bold">Cek Sekarang</span>
          </Link>
          <div className="flex flex-col justify-center gap-3">
            <ul className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.href}
                    className="flex items-center gap-2 rounded-lg border border-border py-1.5 pl-1.5 pr-3 text-sm text-foreground hover:border-primary hover:text-primary"
                  >
                    <span className="relative size-7 shrink-0 overflow-hidden rounded-md bg-secondary">
                      <Image src={c.banner!.imageUrl} alt="" fill sizes="28px" className="object-cover" />
                    </span>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {shortcuts.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link href={href} className="flex items-center gap-1.5 text-muted-foreground hover:text-primary">
                    <Icon className="size-4" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Phone: category chips */}
      <ul className={`-mx-3 flex gap-2 overflow-x-auto px-3 lg:hidden ${hideScrollbar}`}>
        {categories.map((c) => (
          <li key={c.slug} className="shrink-0">
            <Link href={c.href} className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 text-xs text-foreground">
              <span className="relative size-6 overflow-hidden rounded-full bg-secondary">
                <Image src={c.banner!.imageUrl} alt="" fill sizes="24px" className="object-cover" />
              </span>
              {c.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Rails */}
      {rails.map((rail, i) => {
        const featured = i === 0;
        return (
          <section
            key={rail.slug}
            className={`rounded-xl p-3 lg:bg-background lg:p-5 ${
              featured ? "bg-primary lg:shadow-[0_1px_6px_rgba(141,150,170,0.4)]" : "bg-background shadow-[0_1px_6px_rgba(141,150,170,0.4)]"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className={`text-base font-extrabold lg:text-lg lg:text-foreground ${featured ? "text-primary-foreground" : "text-foreground"}`}>
                {rail.title}
              </h2>
              <Link
                href={rail.href}
                className={`flex items-center gap-0.5 text-sm font-extrabold lg:text-primary ${featured ? "text-primary-foreground" : "text-primary"}`}
              >
                Lihat Semua <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className={`flex snap-x gap-2.5 overflow-x-auto lg:grid lg:gap-3 lg:overflow-visible ${rail.banner ? "lg:grid-cols-5" : "lg:grid-cols-4"} ${hideScrollbar}`}>
              {rail.banner && (
                <Link
                  href={rail.href}
                  aria-label={rail.title}
                  className="relative hidden overflow-hidden rounded-lg bg-secondary lg:block"
                >
                  <Image src={rail.banner.imageUrl} alt="" fill sizes="220px" className="object-cover transition-transform duration-300 hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-8 text-sm font-extrabold text-white">
                    {rail.title}
                  </span>
                </Link>
              )}
              {rail.products.slice(0, 4).map((product) => (
                <div key={product.id} className="w-[42vw] max-w-48 shrink-0 snap-start lg:w-auto lg:max-w-none">
                  <TokopediaProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Feed */}
      {more.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="w-fit border-b-[3px] border-primary pb-1.5 text-base font-extrabold text-primary lg:text-lg">Untuk Kamu</h2>
          <TokopediaProductGrid>
            {more.map((product) => (
              <TokopediaProductCard key={product.id} product={product} />
            ))}
          </TokopediaProductGrid>
          <Link
            href="/produk"
            className="mx-auto mt-1 flex h-10 w-full max-w-xs items-center justify-center rounded-lg border border-primary text-sm font-extrabold text-primary hover:bg-accent"
          >
            Lihat Semua Produk
          </Link>
        </section>
      )}
    </div>
  );
}
