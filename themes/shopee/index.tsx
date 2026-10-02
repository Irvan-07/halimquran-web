import type { ReactNode } from "react";
import type { Theme } from "../types";
import { ShopeeFooter } from "./Footer";
import { ShopeeHeader } from "./Header";
import { ShopeeProductCard } from "./ProductCard";

// Marketplace look: orange gradient header (utility strip + wide search on
// desktop, compact app bar on mobile), mobile bottom tab bar, dense
// 2/3/4/5-column product grids, light-grey page. Colors/radius are the
// [data-theme="shopee"] block in app/globals.css. No third-party logos or
// artwork are used.
function ShopeeProductGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
      {children}
    </div>
  );
}

export const shopeeTheme: Theme = {
  id: "shopee",
  name: "Marketplace (gaya Shopee)",
  slots: {
    Header: ShopeeHeader,
    Footer: ShopeeFooter,
    ProductCard: ShopeeProductCard,
    ProductGrid: ShopeeProductGrid,
  },
};
