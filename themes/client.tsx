"use client";

import { createContext, useContext, type ComponentType, type ReactNode } from "react";
import { ProductCard as HalimProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";
import { HalimProductGrid } from "./halim/ProductGrid";
import { BlibliProductCard } from "./blibli/ProductCard";
import { BlibliProductGrid } from "./blibli/ProductGrid";
import { DEFAULT_THEME_ID, type ThemeId } from "./meta";
import { ShopeeProductCard } from "./shopee/ProductCard";
import { ShopeeProductGrid } from "./shopee/ProductGrid";

// Client components can't await the CMS, so the server layout passes the
// chosen theme id down through this provider. Only the slots client
// components actually render live here (keeps the page-level layouts out of
// the client bundle).
interface ClientSlots {
  ProductCard: ComponentType<{ product: Product }>;
  ProductGrid: ComponentType<{ children: ReactNode }>;
}

const clientSlots: Record<ThemeId, ClientSlots> = {
  halim: { ProductCard: HalimProductCard, ProductGrid: HalimProductGrid },
  shopee: { ProductCard: ShopeeProductCard, ProductGrid: ShopeeProductGrid },
  blibli: { ProductCard: BlibliProductCard, ProductGrid: BlibliProductGrid },
};

const ThemeContext = createContext<ThemeId>(DEFAULT_THEME_ID);

export function ThemeProvider({ themeId, children }: { themeId: ThemeId; children: ReactNode }) {
  return <ThemeContext.Provider value={themeId}>{children}</ThemeContext.Provider>;
}

export function useThemeSlots(): ClientSlots {
  return clientSlots[useContext(ThemeContext)];
}
