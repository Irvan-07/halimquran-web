import Link from "next/link";
import { ShopeeBottomNav } from "./BottomNav";

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
    title: "Layanan Pelanggan",
    links: [
      { label: "Lacak Pesanan", href: "/pesanan/lacak" },
      { label: "Keranjang", href: "/keranjang" },
      { label: "Custom Quran", href: "/custom-quran" },
      { label: "Promo", href: "/promo" },
    ],
  },
  {
    title: "Tentang Halim Quran",
    links: [
      { label: "Tentang Kami", href: "/tentang-kami" },
      { label: "Artikel", href: "/artikel" },
      { label: "Media", href: "/media" },
    ],
  },
];

// Desktop: classic marketplace footer (link columns + address). Mobile:
// just the copyright block plus the fixed bottom tab bar, with enough
// bottom padding that the bar never covers the last line.
export function ShopeeFooter() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="border-t-4 border-primary bg-background pb-20 lg:pb-0">
        <div className="mx-auto hidden max-w-7xl grid-cols-4 gap-8 px-8 py-10 lg:grid">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase text-foreground">{col.title}</h3>
              <ul className="flex flex-col gap-2 text-[13px] text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase text-foreground">Alamat</h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Jalan Raya Bojongsoang, Buat Batu Square no.B22 Cipagalo, Kota Bandung, Jawa Barat 40287
            </p>
          </div>
        </div>
        <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground lg:py-6">
          <p>HalimQuran &reg; {year} - 100% Guaranteed</p>
          <p className="mt-1 lg:hidden">Jl. Raya Bojongsoang, Buat Batu Square B22, Bandung</p>
        </div>
      </footer>
      <ShopeeBottomNav />
    </>
  );
}
