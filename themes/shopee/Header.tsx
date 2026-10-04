"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { BackButton } from "@/components/layout/BackButton";

const PDP_PATTERN = /^\/produk\/[^/]+\/[^/]+/;

const quickLinks = [
  { label: "Quran Harian", href: "/produk/quran-harian" },
  { label: "Quran Hafalan", href: "/produk/quran-hafalan" },
  { label: "Quran Terjemah", href: "/produk/quran-terjemah" },
  { label: "Quran Tajwid", href: "/produk/quran-tajwid" },
  { label: "Gift", href: "/gift" },
  { label: "Wakaf", href: "/wakaf" },
];

function CartLink({ className = "" }: { className?: string }) {
  const { itemCount } = useCart();
  return (
    <Link
      href="/keranjang"
      aria-label={`Lihat keranjang${itemCount > 0 ? `, ${itemCount} item` : ""}`}
      className={`relative flex items-center justify-center text-white ${className}`}
    >
      <ShoppingCart className="size-6" />
      {itemCount > 0 && (
        <span className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full border-2 border-primary bg-white px-1 text-[11px] font-bold leading-4 text-primary">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}

// Marketplace-style header with two genuinely different layouts:
//  - desktop (lg+): slim utility strip, then logo + wide search box with
//    attached button + cart, then quick category links under the search;
//  - mobile: one compact app-style bar (back arrow on product pages) with a
//    tappable search pill and cart.
export function ShopeeHeader() {
  const pathname = usePathname();
  const onPdp = PDP_PATTERN.test(pathname);
  const backHref = onPdp ? `/produk/${pathname.split("/")[2]}` : null;

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-primary to-[#F05D40] text-white">
      {/* Desktop utility strip */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-8 text-[13px]">
          <div className="flex items-center gap-4">
            <Link href="/tentang-kami" className="hover:text-white/80">Tentang Kami</Link>
            <Link href="/artikel" className="hover:text-white/80">Artikel</Link>
            <Link href="/promo" className="hover:text-white/80">Promo</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pesanan/lacak" className="hover:text-white/80">Lacak Pesanan</Link>
            <a href="https://wa.me/6281128018990" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
              Bantuan
            </a>
            <Link href="/akun" className="flex items-center gap-1 hover:text-white/80">
              <User className="size-4" /> Akun
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Mobile bar */}
        <div className="flex h-14 items-center gap-3 lg:hidden">
          {backHref ? (
            <BackButton fallbackHref={backHref} className="flex size-8 shrink-0 items-center justify-center">
              <ArrowLeft className="size-6" />
            </BackButton>
          ) : (
            <Link href="/" aria-label="Beranda" className="shrink-0">
              <Image src="/logo-white.png" alt="Halim Qur'an" width={36} height={36} className="size-9" />
            </Link>
          )}
          <Link
            href="/pencarian"
            className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-sm bg-white px-3 text-sm text-black/45"
          >
            <Search className="size-4 shrink-0 text-primary" />
            <span className="truncate">Cari di Halim Qur&apos;an</span>
          </Link>
          <CartLink />
        </div>

        {/* Desktop bar */}
        <div className="hidden items-center gap-10 pb-3 pt-2 lg:flex">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image src="/logo-white.png" alt="" width={44} height={44} className="size-11" />
            <span className="font-heading text-2xl font-semibold tracking-tight">Halim Qur&apos;an</span>
          </Link>
          <div className="min-w-0 flex-1">
            <form action="/pencarian" method="get" role="search" className="flex rounded-sm bg-white p-0.5 shadow-sm">
              <input
                name="q"
                type="search"
                placeholder="Cari mushaf, Quran hafalan, terjemah, hadiah…"
                className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-black outline-none placeholder:text-black/40"
              />
              <button
                type="submit"
                aria-label="Cari"
                className="flex h-10 w-16 items-center justify-center rounded-sm bg-primary text-white hover:bg-primary-dark"
              >
                <Search className="size-5" />
              </button>
            </form>
            <ul className="mt-1.5 flex gap-4 text-xs text-white/90">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <CartLink className="w-10 shrink-0" />
        </div>
      </div>
    </header>
  );
}
