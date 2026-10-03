"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, House, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

const columns = [
  {
    title: "Belanja",
    links: [
      { label: "Semua Produk", href: "/produk" },
      { label: "Quran Hafalan", href: "/produk/quran-hafalan" },
      { label: "Quran Terjemah", href: "/produk/quran-terjemah" },
      { label: "Gift & Souvenir", href: "/gift" },
      { label: "Wakaf Quran", href: "/wakaf" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Cek daftar pesanan", href: "/pesanan/lacak" },
      { label: "Keranjang", href: "/keranjang" },
      { label: "Custom Quran", href: "/custom-quran" },
      { label: "Promo", href: "/promo" },
    ],
  },
  {
    title: "Info Halim Qur'an",
    links: [
      { label: "Tentang Kami", href: "/tentang-kami" },
      { label: "Artikel", href: "/artikel" },
      { label: "Media", href: "/media" },
    ],
  },
];

const tabs = [
  { label: "Beranda", href: "/", icon: House },
  { label: "Kategori", href: "/produk", icon: LayoutGrid },
  { label: "Bag", href: "/keranjang", icon: ShoppingBag },
  { label: "Pesanan", href: "/pesanan/lacak", icon: ClipboardList },
  { label: "Akun", href: "/akun", icon: User },
] as const;

// Pages with their own fixed action bar (or full-screen tools): the tab bar
// would sit on top of it, so it's hidden there.
const HIDDEN_ON = [/^\/produk\/[^/]+\/[^/]+/, /^\/checkout/, /^\/studio/, /^\/o\//];

function BottomTabs() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  if (HIDDEN_ON.some((re) => re.test(pathname))) return null;

  return (
    <nav
      aria-label="Menu utama"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_8px_rgba(0,0,0,0.05)] lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 py-2 text-[11px] ${
                  active ? "font-semibold text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="relative">
                  <Icon className={`size-6 ${active ? "fill-primary/15" : ""}`} />
                  {href === "/keranjang" && itemCount > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex min-w-4 items-center justify-center rounded-full bg-[#FF3B3B] px-1 text-[10px] font-bold leading-4 text-white">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Desktop: tagline row + link columns (+ help/contact and address). Phone:
// just a compact copyright block and the app-style bottom tab bar, with
// enough bottom padding that the bar never covers the last line.
export function BlibliFooter() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="border-t border-border bg-background pb-20 lg:pb-0">
        <div className="mx-auto hidden max-w-7xl px-8 pt-8 lg:block">
          <div className="flex items-center gap-4 border-b border-border pb-6">
            <Image src="/logo.png" alt="Halim Qur'an" width={96} height={38} className="h-9 w-auto" />
            <p className="text-sm text-foreground">Toko online mushaf Al-Quran — dari Halim Qur&apos;an langsung ke rumahmu.</p>
          </div>
          <div className="grid grid-cols-4 gap-8 py-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-foreground">Bantuan</h3>
              <div className="text-sm">
                <p className="text-muted-foreground">WhatsApp</p>
                <a href="https://wa.me/6281128018990" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-primary">
                  +62 811-2801-8990
                </a>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Alamat</p>
                <p className="leading-relaxed text-foreground">
                  Jalan Raya Bojongsoang, Buat Batu Square no.B22 Cipagalo, Kota Bandung, Jawa Barat 40287
                </p>
              </div>
            </div>
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-foreground">{col.title}</h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-primary">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
          <p>HalimQuran &reg; {year} - 100% Guaranteed</p>
          <p className="mt-1 lg:hidden">Jl. Raya Bojongsoang, Buat Batu Square B22, Bandung</p>
        </div>
      </footer>
      <BottomTabs />
    </>
  );
}
