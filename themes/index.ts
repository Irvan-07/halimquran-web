import { halimTheme } from "./halim";
import { shopeeTheme } from "./shopee";
import type { Theme } from "./types";

// To add a theme: create themes/<id>/index.tsx exporting a Theme, register
// it below, and (for colors/fonts/radius) add a `[data-theme="<id>"]` block
// of token overrides in app/globals.css. Pick the live one with the
// NEXT_PUBLIC_THEME env var (build-time, so pages stay statically
// cacheable); preview another theme by deploying a branch with a different
// value.
const registry: Record<string, Theme> = {
  [halimTheme.id]: halimTheme,
  [shopeeTheme.id]: shopeeTheme,
};

export const activeTheme: Theme = registry[process.env.NEXT_PUBLIC_THEME ?? ""] ?? halimTheme;

export const { Header, Footer, ProductCard, ProductGrid } = activeTheme.slots;
