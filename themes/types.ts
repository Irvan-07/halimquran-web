import type { ComponentType, ReactNode } from "react";
import type { Product } from "@/types/product";
import type { HeroSlide } from "@/components/sections/hero-slides";
import type { ThemeId } from "./meta";

/** Props the product page hands to a theme's ProductDetail layout. */
export interface ProductDetailProps {
  product: Product;
  /** A few other products for the "rekomendasi" block. */
  related: Product[];
  /** Real PDP copy, or generated text when we have none. */
  descriptionText: string;
  categoryLabel: string;
}

/** One homepage product rail, already resolved against the live catalog. */
export interface HomeRail {
  slug: string;
  /** Plain section title ("Quran Harian") — themes that don't overlay it on the banner use this. */
  title: string;
  href: string;
  banner?: { imageUrl: string; pillLabel?: string; aspectRatio: string };
  /** How many products the default theme shows (4 when omitted). */
  limit?: number;
  products: Product[];
}

export interface HomeProps {
  rails: HomeRail[];
  /** The whole merged catalog, for themes that show an "all products" grid. */
  catalog: Product[];
  /** Top-of-page banners (from the CMS, else the built-in set); each may carry a click destination. */
  banners: HeroSlide[];
}

/**
 * The presentation pieces a theme can replace. Everything behind them —
 * Scalev catalog/stock, cart, checkout, order tracking, CMS content — is
 * the shared "engine" and never changes between themes. Add a slot here
 * (and to every theme) when a new part of the UI needs to differ per theme.
 */
export interface ThemeSlots {
  Header: ComponentType;
  Footer: ComponentType;
  ProductCard: ComponentType<{ product: Product }>;
  /** Wrapper for any list of ProductCards — owns the column counts/gaps per breakpoint. */
  ProductGrid: ComponentType<{ children: ReactNode }>;
  /** The whole product page body (below the header, above the footer). */
  ProductDetail: ComponentType<ProductDetailProps>;
  /** The whole homepage body. */
  Home: ComponentType<HomeProps>;
  /** Optional block shown above the "Semua Produk" listing (e.g. a marketplace-style store card). */
  ProductsIntro?: ComponentType;
}

export interface Theme {
  /** Matches the `data-theme` attribute on <html>, where a theme's design-token overrides in globals.css hang. */
  id: ThemeId;
  name: string;
  slots: ThemeSlots;
}
