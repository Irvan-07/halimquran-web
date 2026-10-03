import { blibliTheme } from "./blibli";
import { halimTheme } from "./halim";
import { DEFAULT_THEME_ID, isThemeId, type ThemeId } from "./meta";
import { shopeeTheme } from "./shopee";
import type { Theme } from "./types";

export const themes: Record<ThemeId, Theme> = {
  halim: halimTheme,
  shopee: shopeeTheme,
  blibli: blibliTheme,
};

/** Unknown / missing ids fall back to the default theme, so a stale CMS value never breaks the site. */
export function resolveTheme(id?: string | null): Theme {
  return themes[isThemeId(id) ? id : DEFAULT_THEME_ID];
}
