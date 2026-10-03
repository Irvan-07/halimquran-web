import Link from "next/link";
import Image from "next/image";

// Mirrors the circular category-icon row at the top of halimquran.com's
// category pages (icons saved 26 Sep 2026 from their own CDN). "Gift Set"
// and "Wakaf" are tabs in that same row on the live site — not separate
// concepts — so they route to our /gift and /wakaf pages here too, even
// though those aren't under /produk/[kategori] in our own routing.
const TABS = [
  { slug: "quran-harian", label: "Al Quran Harian", href: "/produk/quran-harian", icon: "/category-icons/quran-harian.webp" },
  { slug: "quran-hafalan", label: "Al Quran Hafalan", href: "/produk/quran-hafalan", icon: "/category-icons/quran-hafalan.webp" },
  { slug: "quran-terjemah", label: "Al Quran Terjemah", href: "/produk/quran-terjemah", icon: "/category-icons/quran-terjemah.webp" },
  { slug: "quran-tajwid", label: "Al Quran Tajwid", href: "/produk/quran-tajwid", icon: "/category-icons/quran-tajwid.webp" },
  { slug: "quran-tematik", label: "Al Quran Tematik", href: "/produk/quran-tematik", icon: "/category-icons/quran-tematik.webp" },
  { slug: "quran-lainnya", label: "Al Quran Lainnya", href: "/produk/quran-lainnya", icon: "/category-icons/quran-lainnya.webp" },
  { slug: "gift-set", label: "Al Quran Gift Set", href: "/gift", icon: "/category-icons/gift-set.webp" },
  { slug: "wakaf", label: "Quran Wakaf", href: "/wakaf", icon: "/category-icons/wakaf.webp" },
] as const;

export function CategoryTabs({ active }: { active: string }) {
  return (
    <div className="-mx-4 flex gap-5 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
      {TABS.map((tab) => (
        <Link
          key={tab.slug}
          href={tab.href}
          className="flex shrink-0 flex-col items-center gap-2"
        >
          <span
            className={`relative size-20 shrink-0 overflow-hidden rounded-full ${
              tab.slug === active ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
          >
            <Image src={tab.icon} alt="" fill sizes="80px" className="object-cover" />
          </span>
          <span className="w-20 text-center text-sm leading-tight text-foreground/80">
            {tab.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
