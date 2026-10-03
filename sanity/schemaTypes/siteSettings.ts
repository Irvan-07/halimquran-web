import { defineArrayMember, defineField, defineType } from "sanity";
import { builtinHeroBanners } from "../../components/sections/hero-slides";
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
    defineField({
      name: "heroBanners",
      title: "Banner beranda",
      description:
        "Banner yang bergeser di bagian atas beranda. Seret untuk mengatur urutan; tiap banner bisa diberi tujuan klik. Kosongkan semuanya untuk memakai banner bawaan (tanpa link).",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroBanner",
          title: "Banner",
          fields: [
            defineField({
              name: "image",
              title: "Gambar banner",
              description: "Unggah gambar rasio 4:3 (mis. 2048×1536). Tulisan sebaiknya sudah ada di dalam gambar.",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "builtin",
              title: "…atau pakai banner bawaan",
              description: "Dipakai bila tidak ada gambar yang diunggah. Berguna untuk memberi link ke banner lama tanpa unggah ulang.",
              type: "string",
              options: { list: builtinHeroBanners.map((b) => ({ title: b.title, value: b.id })) },
            }),
            defineField({
              name: "alt",
              title: "Deskripsi gambar",
              description: "Ringkas, untuk pembaca layar dan SEO. Mis. \"Promo wakaf Al-Quran\".",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "link",
              title: "Tujuan saat banner diklik (opsional)",
              description:
                "Alamat halaman di website, mis. /promo, /produk/quran-harian, /gift, /wakaf, /custom-quran, /artikel/judul-artikel — atau link lengkap https://… (dibuka di tab baru). Kosong = banner tidak bisa diklik.",
              type: "string",
              validation: (r) =>
                r.custom((value) =>
                  !value || value.startsWith("/") || /^https?:\/\//i.test(value)
                    ? true
                    : "Harus diawali / (halaman di website) atau https:// (link lengkap)",
                ),
            }),
          ],
          validation: (r) =>
            r.custom((value) => {
              const v = value as { image?: unknown; builtin?: string } | undefined;
              return v?.image || v?.builtin ? true : "Unggah gambar atau pilih banner bawaan";
            }),
          preview: {
            select: { title: "alt", subtitle: "link", media: "image" },
            prepare: ({ title, subtitle, media }) => ({
              title: title || "Banner",
              subtitle: subtitle ? `→ ${subtitle}` : "Tanpa link",
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Pengaturan Situs", subtitle: "Tema tampilan website" }),
  },
});
