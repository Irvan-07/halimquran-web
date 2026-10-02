import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import type { ReactNode } from "react";
import type { Theme } from "../types";

function HalimProductGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{children}</div>;
}

export const halimTheme: Theme = {
  id: "halim",
  name: "Halim Quran (default)",
  slots: { Header, Footer, ProductCard, ProductGrid: HalimProductGrid },
};
