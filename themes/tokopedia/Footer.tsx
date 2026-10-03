"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, House, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

const columns = [
  {
    title: "Halim Qur'an",
    links: [
      { label: "Tentang Kami", href: "/tentang-kami" },
      { label: "Artikel", href: "/artikel" },
      { label: "Media", href: "/media" },
      { label: "Promo", href: "/promo" },
    ],
  },
  {
    title: "Beli",
    links: [
      { label: "Semua Produk", href: "/produk" },
      { label: "Quran Hafalan", href: "/produk/quran-hafalan" },
      { label: "Quran Terjemah", href: "/produk/quran-terjemah" },
      { label: "Gift & Souvenir", href: "/gift" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Lacak Pesanan", href: "/pesanan/lacak" },
      { label: "Keranjang", href: "/keranjang" },
      { label: "Wakaf Quran", href: "/wakaf" },
      { label: "Custom Quran", href: "/custom-quran" },
    ],
  },
];

const tabs = [
  { label: "Home", href: "/", icon: House },
  { label: "Kategori", href: "/produk", icon: LayoutGrid },
  { label: "Keranjang", href: "/keranjang", icon: ShoppingCart },
  { label: "Transaksi", href: "/pesanan/lacak", icon: FileText },
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
      className="fixed inset-x-0 bottom-0 z-40 bg-background pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_6px_rgba(141,150,170,0.4)] lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 py-2 text-[11px] ${
                  active ? "font-bold text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="relative">
                  <Icon className={`size-6 ${active ? "fill-primary/20" : ""}`} />
                  {href === "/keranjang" && itemCount > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex min-w-4 items-center justify-center rounded-full bg-[#F94D63] px-1 text-[10px] font-bold leading-4 text-white">
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

// Desktop: grey link-column footer with contact + address. Phone: a compact
// copyright block plus the green-accent bottom tab bar, with enough bottom
// padding that the bar never covers the last line.
export function TokopediaFooter() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="mt-8 bg-secondary pb-20 lg:pb-0">
        <div className="mx-auto hidden max-w-7xl grid-cols-4 gap-8 px-8 py-10 lg:grid">
          <div className="flex flex-col gap-3">
            <Image src="/logo.png" alt="Halim Qur'an" width={110} height={44} className="h-10 w-auto" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Jalan Raya Bojongsoang, Buat Batu Square no.B22 Cipagalo, Kota Bandung, Jawa Barat 40287
            </p>
            <a href="https://wa.me/6281128018990" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline">
              WhatsApp +62 811-2801-8990
            </a>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-extrabold text-foreground">{col.title}</h3>
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
        <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
          <p>HalimQuran &reg; {year} - 100% Guaranteed</p>
          <p className="mt-1 lg:hidden">Jl. Raya Bojongsoang, Buat Batu Square B22, Bandung</p>
        </div>
      </footer>
      <BottomTabs />
    </>
  );
}
