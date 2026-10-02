"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, House, ShoppingCart, Tag, User } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

const items = [
  { label: "Beranda", href: "/", icon: House },
  { label: "Kategori", href: "/produk", icon: LayoutGrid },
  { label: "Promo", href: "/promo", icon: Tag },
  { label: "Keranjang", href: "/keranjang", icon: ShoppingCart },
  { label: "Akun", href: "/akun", icon: User },
] as const;

// Pages that have their own sticky action bar (or are full-screen tools):
// the tab bar would sit on top of it, so it's hidden there.
const HIDDEN_ON = [/^\/produk\/[^/]+\/[^/]+/, /^\/checkout/, /^\/studio/, /^\/o\//];

export function ShopeeBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  if (HIDDEN_ON.some((re) => re.test(pathname))) return null;

  return (
    <nav
      aria-label="Menu utama"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ label, href, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`relative flex flex-col items-center gap-0.5 py-2 text-[11px] ${
                  active ? "font-medium text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="relative">
                  <Icon className="size-5" />
                  {href === "/keranjang" && itemCount > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-4 text-primary-foreground">
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
