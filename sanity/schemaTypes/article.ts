import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Artikel",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Judul", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (bagian URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan",
      description: "Satu-dua kalimat untuk daftar artikel dan hasil pencarian Google.",
      type: "text",
      rows: 3,
      validation: (r) => r.max(220),
    }),
    defineField({
      name: "coverImage",
      title: "Gambar sampul",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Teks alternatif" })],
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal terbit",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({ name: "body", title: "Isi artikel", type: "blockContent" }),
  ],
  orderings: [
    { title: "Terbaru", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});
