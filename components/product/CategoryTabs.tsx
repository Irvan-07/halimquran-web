import Link from "next/link";
import Image from "next/image";

// Mirrors the circular category-icon row at the top of halimquran.com's
// category pages (icons saved 26 Sep 2026 from their own CDN). "Gift Set"
// and "Wakaf" are tabs in that same row on the live site — not separate
// concepts — so they route to our /gift and /wakaf pages here too, even
// though those aren't under /produk/[kategori] in our own routing.
const TABS = [
  { slug: "quran-harian", label: "Al Quran Harian", href: "/produk/quran-harian", icon: "/categories/quran-harian.webp" },
  { slug: "quran-hafalan", label: "Al Quran Hafalan", href: "/produk/quran-hafalan", icon: "/categories/quran-hafalan.webp" },
  { slug: "quran-terjemah", label: "Al Quran Terjemah", href: "/produk/quran-terjemah", icon: "/categories/quran-terjemah.webp" },
  { slug: "quran-tajwid", label: "Al Quran Tajwid", href: "/produk/quran-tajwid", icon: "/categories/quran-tajwid.webp" },
  { slug: "quran-tematik", label: "Al Quran Tematik", href: "/produk/quran-tematik", icon: "/categories/quran-tematik.webp" },
  { slug: "quran-lainnya", label: "Al Quran Lainnya", href: "/produk/quran-lainnya", icon: "/categories/quran-lainnya.webp" },
  { slug: "gift-set", label: "Al Quran Gift Set", href: "/gift", icon: "/categories/gift-set.webp" },
  { slug: "wakaf", label: "Quran Wakaf", href: "/wakaf", icon: "/categories/wakaf.webp" },
] as const;

export function CategoryTabs({ active }: { active: string }) {
  return (
    <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {TABS.map((tab) => (
        <Link
          key={tab.slug}
          href={tab.href}
          className="flex shrink-0 flex-col items-center gap-1.5"
        >
          <span
            className={`relative size-16 shrink-0 overflow-hidden rounded-full border-2 ${
              tab.slug === active ? "border-primary" : "border-transparent"
            }`}
          >
            <Image src={tab.icon} alt="" fill sizes="64px" className="object-cover" />
          </span>
          <span className="w-16 text-center text-xs leading-tight text-foreground">
            {tab.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
