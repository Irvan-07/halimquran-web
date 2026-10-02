import type { Theme } from "../types";
import { BlibliFooter } from "./Footer";
import { BlibliHeader } from "./Header";
import { BlibliHome } from "./Home";
import { BlibliProductCard } from "./ProductCard";
import { BlibliProductDetail } from "./ProductDetail";
import { BlibliProductGrid } from "./ProductGrid";
import { BlibliStoreIntro } from "./StoreIntro";

// Marketplace look in a bright-blue palette: white header with a wide
// search and pill buttons, light-blue rail panels, rounded cards, yellow
// stars, a fixed purchase bar on every product page, and app-style bottom
// tabs on phones. Colors/radius are the [data-theme="blibli"] block in
// app/globals.css. No third-party logos or artwork are used.
export const blibliTheme: Theme = {
  id: "blibli",
  name: "Marketplace (gaya Blibli)",
  slots: {
    Header: BlibliHeader,
    Footer: BlibliFooter,
    ProductCard: BlibliProductCard,
    ProductGrid: BlibliProductGrid,
    ProductDetail: BlibliProductDetail,
    Home: BlibliHome,
    ProductsIntro: BlibliStoreIntro,
  },
};
