import type { ComponentType } from "react";
import type { Product } from "@/types/product";

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
}

export interface Theme {
  /** Matches the `data-theme` attribute on <html>, where a theme's design-token overrides in globals.css hang. */
  id: string;
  name: string;
  slots: ThemeSlots;
}
