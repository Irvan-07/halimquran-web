import type { Theme } from "../types";
import { ShopeeFooter } from "./Footer";
import { ShopeeHeader } from "./Header";
import { ShopeeHome } from "./Home";
import { ShopeeProductCard } from "./ProductCard";
import { ShopeeProductDetail } from "./ProductDetail";
import { ShopeeProductGrid } from "./ProductGrid";

// Marketplace look: orange gradient header (utility strip + wide search on
// desktop, compact app bar on mobile), mobile bottom tab bar, dense
// 2/3/4/5-column product grids, light-grey page, and dedicated homepage /
// product-page layouts that differ between desktop and phone. Colors/radius
// are the [data-theme="shopee"] block in app/globals.css. No third-party
// logos or artwork are used.
export const shopeeTheme: Theme = {
  id: "shopee",
  name: "Marketplace (gaya Shopee)",
  slots: {
    Header: ShopeeHeader,
    Footer: ShopeeFooter,
    ProductCard: ShopeeProductCard,
    ProductGrid: ShopeeProductGrid,
    ProductDetail: ShopeeProductDetail,
    Home: ShopeeHome,
  },
};
