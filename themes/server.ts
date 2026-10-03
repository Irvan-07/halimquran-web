import "server-only";
import { cache } from "react";
import { getSiteThemeId } from "@/sanity/lib/content";
import { resolveTheme } from "./registry";

/**
 * The theme for this request, for server components.
 *  1. NEXT_PUBLIC_THEME, when set, wins — used to pin a theme on a preview
 *     branch regardless of the CMS (leave it unset in production);
 *  2. otherwise the theme picked in the CMS ("Pengaturan Situs");
 *  3. otherwise (nothing published yet, or the CMS is unreachable) the default.
 * The CMS read is cached for up to a minute, so a change goes live shortly
 * after publishing without a redeploy.
 */
export const getActiveTheme = cache(async () => {
  const pinned = process.env.NEXT_PUBLIC_THEME;
  if (pinned) return resolveTheme(pinned);
  const fromCms = await getSiteThemeId().catch(() => null);
  return resolveTheme(fromCms);
});
