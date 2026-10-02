import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import type { Theme } from "../types";
import { HalimHome } from "./Home";
import { HalimProductDetail } from "./ProductDetail";
import { HalimProductGrid } from "./ProductGrid";

export const halimTheme: Theme = {
  id: "halim",
  name: "Halim Quran (default)",
  slots: {
    Header,
    Footer,
    ProductCard,
    ProductGrid: HalimProductGrid,
    ProductDetail: HalimProductDetail,
    Home: HalimHome,
  },
};
