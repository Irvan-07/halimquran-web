import { defineField, defineType } from "sanity";
import { DEFAULT_THEME_ID, themeOptions } from "../../themes/meta";

// One-off settings document (the Studio shows it as a single "Pengaturan
// Situs" entry — see sanity.config.ts). The site reads `activeTheme` and
// switches its whole look within about a minute of publishing.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Situs",
  type: "document",
  fields: [
    defineField({
      name: "activeTheme",
      title: "Tema tampilan website",
      description:
        "Pilih tampilan website, lalu tekan Publish. Perubahan muncul di website dalam ±1 menit. Isi website (produk, stok, artikel) tidak berubah — hanya tampilannya.",
      type: "string",
      options: {
        list: themeOptions.map((t) => ({ title: `${t.title} — ${t.hint}`, value: t.id })),
        layout: "radio",
      },
      initialValue: DEFAULT_THEME_ID,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Pengaturan Situs", subtitle: "Tema tampilan website" }),
  },
});
