import type { Theme } from "../types";
import { TokopediaFooter } from "./Footer";
import { TokopediaHeader } from "./Header";
import { TokopediaHome } from "./Home";
import { TokopediaProductCard } from "./ProductCard";
import { TokopediaProductDetail } from "./ProductDetail";
import { TokopediaProductGrid } from "./ProductGrid";
import { TokopediaStoreIntro } from "./StoreIntro";

// Marketplace look in green: white header with a wide search and a "Kategori"
// menu, soft-shadow cards, bold prices, a sticky "Atur jumlah" purchase card
// on desktop product pages and a fixed chat | Beli Langsung | + Keranjang bar
// on phones, plus app-style bottom tabs. Colors/radius are the
// [data-theme="tokopedia"] block in app/globals.css. No third-party logos
// or artwork are used.
export const tokopediaTheme: Theme = {
  id: "tokopedia",
  name: "Marketplace (gaya Tokopedia)",
  slots: {
    Header: TokopediaHeader,
    Footer: TokopediaFooter,
    ProductCard: TokopediaProductCard,
    ProductGrid: TokopediaProductGrid,
    ProductDetail: TokopediaProductDetail,
    Home: TokopediaHome,
    ProductsIntro: TokopediaStoreIntro,
  },
};
