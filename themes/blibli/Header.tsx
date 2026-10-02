"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LayoutGrid, Search, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { productCategories } from "@/lib/mock-data/categories";

const PDP_PATTERN = /^\/produk\/[^/]+\/[^/]+/;

const keywordLinks = [
  { label: "Quran Hafalan", href: "/produk/quran-hafalan" },
  { label: "Quran Terjemah", href: "/produk/quran-terjemah" },
  { label: "Quran Tajwid", href: "/produk/quran-tajwid" },
  { label: "Hadiah & Souvenir", href: "/gift" },
  { label: "Wakaf Quran", href: "/wakaf" },
  { label: "Custom Nama", href: "/custom-quran" },
];

function CartLink() {
  const { itemCount } = useCart();
  return (
    <Link
      href="/keranjang"
      aria-label={`Lihat keranjang${itemCount > 0 ? `, ${itemCount} item` : ""}`}
      className="relative flex size-10 items-center justify-center text-foreground/70 hover:text-primary"
    >
      <ShoppingBag className="size-6" />
      <span className="absolute right-0 top-0 flex min-w-[18px] items-center justify-center rounded-full bg-[#FF3B3B] px-1 text-[10px] font-bold leading-[18px] text-white">
        {itemCount > 99 ? "99+" : itemCount}
      </span>
    </Link>
  );
}

function SearchBox({ className = "" }: { className?: string }) {
  return (
    <form action="/pencarian" method="get" role="search" className={`flex items-center rounded-lg border border-input bg-background p-1 pl-4 focus-within:border-primary ${className}`}>
      <input
        name="q"
        type="search"
        placeholder="Cari mushaf, Quran hafalan, terjemah, hadiah…"
        className="h-9 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        aria-label="Cari"
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary-dark"
      >
        <Search className="size-[18px]" />
      </button>
    </form>
  );
}

// Marketplace header, two real layouts:
//  - desktop (lg+): slim utility links, wordmark + wide search with a round
//    blue button + bag + two pill buttons, then a "Kategori" menu with
//    keyword links and a shipping note;
//  - phone: one compact bar (wordmark, search pill, bag). On product pages
//    the bar is dropped on phones — the photo carries its own back / bag
//    buttons, as in the app.
export function BlibliHeader() {
  const pathname = usePathname();
  const onPdp = PDP_PATTERN.test(pathname);

  return (
    <header className={`sticky top-0 z-40 border-b border-border bg-background ${onPdp ? "hidden lg:block" : ""}`}>
      {/* Desktop utility strip */}
      <div className="hidden lg:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-5">
            <Link href="/tentang-kami" className="hover:text-primary">Tentang Halim Qur&apos;an</Link>
            <a href="https://wa.me/6281128018990" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              Bantuan via WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/wakaf" className="hover:text-primary">Wakaf Quran</Link>
            <Link href="/artikel" className="hover:text-primary">Artikel</Link>
            <Link href="/pesanan/lacak" className="hover:text-primary">Cek daftar pesanan</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Phone bar */}
        <div className="flex h-14 items-center gap-2 lg:hidden">
          {onPdp ? null : (
            <Link href="/" aria-label="Beranda" className="shrink-0">
              <Image src="/logo.png" alt="Halim Qur'an" width={80} height={32} className="h-8 w-auto" priority />
            </Link>
          )}
          <Link
            href="/pencarian"
            className="flex h-10 min-w-0 flex-1 items-center justify-between rounded-lg border border-input pl-3 pr-1 text-sm text-muted-foreground"
          >
            <span className="truncate">Cari brand, produk, atau seller</span>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Search className="size-4" />
            </span>
          </Link>
          <CartLink />
        </div>

        {/* Desktop main bar */}
        <div className="hidden items-center gap-8 py-2 lg:flex">
          <Link href="/" aria-label="Halim Qur'an" className="shrink-0">
            <Image src="/logo.png" alt="Halim Qur'an" width={110} height={44} className="h-11 w-auto" priority />
          </Link>
          <SearchBox className="min-w-0 flex-1" />
          <div className="flex shrink-0 items-center gap-4">
            <CartLink />
            <span className="h-6 w-px bg-border" />
            <Link href="/akun" className="rounded-full border border-primary px-6 py-1.5 text-sm font-semibold text-primary hover:bg-accent">
              Akun
            </Link>
            <Link href="/pesanan/lacak" className="rounded-full bg-primary px-6 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark">
              Lacak Pesanan
            </Link>
          </div>
        </div>

        {/* Desktop second row */}
        <div className="hidden items-center gap-5 pb-2 lg:flex">
          <div className="group relative">
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-lg bg-secondary px-3 text-sm font-medium text-foreground hover:bg-accent"
            >
              <LayoutGrid className="size-4 text-muted-foreground" />
              Kategori
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-60 pt-1 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="rounded-lg border border-border bg-background py-2 shadow-lg">
                <li>
                  <Link href="/produk" className="block px-4 py-2 text-sm font-medium text-primary hover:bg-accent">
                    Semua Produk
                  </Link>
                </li>
                {productCategories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/produk/${c.slug}`} className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="flex min-w-0 items-center gap-4 whitespace-nowrap text-xs text-muted-foreground">
            {keywordLinks.map((l, i) => (
              <li key={l.href} className="flex items-center gap-4">
                {i > 0 && <span className="h-3 w-px bg-border" />}
                <Link href={l.href} className="hover:text-primary">{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="ml-auto flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-secondary px-3 text-xs text-muted-foreground">
            <Truck className="size-4" />
            <strong className="font-semibold text-foreground">Kirim ke seluruh Indonesia</strong>
          </p>
        </div>
      </div>
    </header>
  );
}
