"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Search, User } from "lucide-react";
import { CartIcon } from "@/components/cart/CartIcon";

// Social-commerce style header: compact top row with a prominent search
// pill, and a horizontally scrolling row of quick category chips below.
const chips = [
  { label: "Semua", href: "/produk" },
  { label: "Harian", href: "/produk/quran-harian" },
  { label: "Hafalan", href: "/produk/quran-hafalan" },
  { label: "Terjemah", href: "/produk/quran-terjemah" },
  { label: "Tajwid", href: "/produk/quran-tajwid" },
  { label: "Gift", href: "/gift" },
  { label: "Wakaf", href: "/wakaf" },
  { label: "Custom", href: "/custom-quran" },
  { label: "Promo", href: "/promo" },
];

const PDP_PATTERN = /^\/produk\/[^/]+\/[^/]+/;

export function TikTokHeader() {
  const pathname = usePathname();
  const onPdp = PDP_PATTERN.test(pathname);
  const backHref = onPdp ? `/produk/${pathname.split("/")[2]}` : null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-3 sm:px-6 lg:px-8">
        {backHref ? (
          <Link href={backHref} aria-label="Kembali" className="flex size-9 shrink-0 items-center justify-center">
            <ArrowLeft className="size-5" />
          </Link>
        ) : (
          <Link href="/" className="shrink-0">
            <Image src="/logo.png" alt="Halim Qur'an" width={110} height={44} className="h-8 w-auto" priority />
          </Link>
        )}

        <Link
          href="/pencarian"
          className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-full bg-secondary px-4 text-sm text-muted-foreground"
        >
          <Search className="size-4 shrink-0" />
          <span className="truncate">Cari Al-Qur&apos;an, mushaf, hadiah…</span>
        </Link>

        <CartIcon />
        <Link href="/akun" aria-label="Akun saya" className="hidden size-9 items-center justify-center sm:flex">
          <User className="size-5" />
        </Link>
      </div>

      <nav aria-label="Kategori" className="border-t border-border/60">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-3 py-2 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chips.map((chip) => {
            const active = pathname === chip.href;
            return (
              <li key={chip.href} className="shrink-0">
                <Link
                  href={chip.href}
                  className={`block rounded-full px-3.5 py-1 text-[13px] font-medium ${
                    active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  {chip.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
