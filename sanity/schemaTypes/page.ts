import { defineField, defineType } from "sanity";

// Generic content page (Tentang Kami, Wakaf, Promo, ...). The page's route
// in the site decides which `slug` it reads, e.g. /tentang-kami -> "tentang-kami".
export const page = defineType({
  name: "page",
  title: "Halaman",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Judul halaman", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Harus cocok dengan alamat halamannya, mis. tentang-kami, wakaf, promo.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi singkat (SEO)",
      type: "text",
      rows: 2,
      validation: (r) => r.max(180),
    }),
    defineField({ name: "body", title: "Isi halaman", type: "blockContent" }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
