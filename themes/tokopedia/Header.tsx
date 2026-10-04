"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronDown, MapPin, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { BackButton } from "@/components/layout/BackButton";
import { productCategories } from "@/lib/mock-data/categories";

const PDP_PATTERN = /^\/produk\/[^/]+\/[^/]+/;

function CartLink() {
  const { itemCount } = useCart();
  return (
    <Link
      href="/keranjang"
      aria-label={`Lihat keranjang${itemCount > 0 ? `, ${itemCount} item` : ""}`}
      className="relative flex size-10 items-center justify-center text-foreground/80 hover:text-primary"
    >
      <ShoppingCart className="size-6" />
      {itemCount > 0 && (
        <span className="absolute right-0.5 top-0 flex min-w-[18px] items-center justify-center rounded-full bg-[#F94D63] px-1 text-[10px] font-bold leading-[18px] text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}

// Marketplace header with two real layouts:
//  - desktop (lg+): grey utility strip, wordmark + "Kategori" menu + wide
//    search + cart + two buttons, and a "Dikirim ke" line underneath;
//  - phone: one compact bar — wordmark (back arrow on product pages),
//    search field with a bold "Cari" inside, cart.
export function TokopediaHeader() {
  const pathname = usePathname();
  const onPdp = PDP_PATTERN.test(pathname);

  return (
    <header className="sticky top-0 z-40 bg-background shadow-[0_1px_4px_rgba(141,150,170,0.35)]">
      {/* Desktop utility strip */}
      <div className="hidden bg-secondary lg:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-8 text-xs text-muted-foreground">
          <a href="https://wa.me/6281128018990" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            Butuh bantuan? Chat via WhatsApp
          </a>
          <div className="flex items-center gap-6">
            <Link href="/tentang-kami" className="hover:text-primary">Tentang Halim Qur&apos;an</Link>
            <Link href="/wakaf" className="hover:text-primary">Wakaf Quran</Link>
            <Link href="/promo" className="hover:text-primary">Promo</Link>
            <Link href="/artikel" className="hover:text-primary">Artikel</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 lg:px-8">
        {/* Phone bar */}
        <div className="flex h-14 items-center gap-2 lg:hidden">
          {onPdp ? (
            <BackButton
              fallbackHref={`/produk/${pathname.split("/")[2]}`}
              className="flex size-9 shrink-0 items-center justify-center"
            >
              <ArrowLeft className="size-6" />
            </BackButton>
          ) : (
            <Link href="/" aria-label="Beranda" className="shrink-0">
              <Image src="/logo.png" alt="Halim Qur'an" width={80} height={32} className="h-8 w-auto" priority />
            </Link>
          )}
          <Link
            href="/pencarian"
            className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg border border-input px-3 text-sm text-muted-foreground"
          >
            <Search className="size-[18px] shrink-0" />
            <span className="flex-1 truncate">Cari di Halim Qur&apos;an</span>
            <span className="font-bold text-foreground">Cari</span>
          </Link>
          <CartLink />
        </div>

        {/* Desktop bar */}
        <div className="hidden items-center gap-6 py-2.5 lg:flex">
          <Link href="/" aria-label="Halim Qur'an" className="shrink-0">
            <Image src="/logo.png" alt="Halim Qur'an" width={110} height={44} className="h-10 w-auto" priority />
          </Link>

          <div className="group relative">
            <button type="button" className="flex items-center gap-1 text-sm text-foreground hover:text-primary">
              Kategori
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-56 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="rounded-lg bg-background py-2 shadow-[0_2px_16px_rgba(141,150,170,0.5)]">
                <li>
                  <Link href="/produk" className="block px-4 py-2 text-sm font-bold text-primary hover:bg-accent">Semua Produk</Link>
                </li>
                {productCategories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/produk/${c.slug}`} className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary">
                      {c.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-border pt-1">
                  <Link href="/gift" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary">Gift &amp; Souvenir</Link>
                </li>
                <li>
                  <Link href="/custom-quran" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary">Custom Quran</Link>
                </li>
              </ul>
            </div>
          </div>

          <form
            action="/pencarian"
            method="get"
            role="search"
            className="flex h-10 min-w-0 flex-1 items-center rounded-lg border border-input bg-background px-3 focus-within:border-primary"
          >
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <input
              name="q"
              type="search"
              placeholder="Cari mushaf, Quran hafalan, terjemah, hadiah…"
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="text-sm font-bold text-primary hover:text-primary-dark">
              Cari
            </button>
          </form>

          <div className="flex shrink-0 items-center gap-4">
            <CartLink />
            <span className="h-6 w-px bg-border" />
            <Link href="/akun" className="rounded-lg border border-primary px-5 py-1.5 text-xs font-extrabold text-primary hover:bg-accent">
              Akun
            </Link>
            <Link href="/pesanan/lacak" className="rounded-lg bg-primary px-5 py-1.5 text-xs font-extrabold text-primary-foreground hover:bg-primary-dark">
              Lacak Pesanan
            </Link>
          </div>
        </div>
        <div className="hidden items-center justify-end gap-1.5 pb-1.5 text-xs text-foreground lg:flex">
          <MapPin className="size-4" />
          Dikirim ke <strong className="font-extrabold">seluruh Indonesia</strong>
        </div>
      </div>
    </header>
  );
}
