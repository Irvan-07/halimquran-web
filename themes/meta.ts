// The list of themes, as plain data (no React) so the CMS schema and the
// site can share it. To add a theme: add an entry here, create
// themes/<id>/index.tsx exporting a Theme, register it in registry.ts and
// themes/client.tsx, and add its `[data-theme="<id>"]` token block in
// app/globals.css. It then shows up in the CMS "Pengaturan Situs" picker.
export const themeOptions = [
  {
    id: "halim",
    title: "Halim Quran (default)",
    hint: "Tampilan halimquran.com — biru, bersih, lega",
  },
  {
    id: "shopee",
    title: "Marketplace — gaya Shopee",
    hint: "Oranye, padat, bar menu bawah di HP",
  },
  {
    id: "blibli",
    title: "Marketplace — gaya Blibli",
    hint: "Biru cerah, kartu membulat, bar beli menempel",
  },
] as const;

export type ThemeId = (typeof themeOptions)[number]["id"];

export const DEFAULT_THEME_ID: ThemeId = "halim";

export function isThemeId(value: unknown): value is ThemeId {
  return themeOptions.some((t) => t.id === value);
}
