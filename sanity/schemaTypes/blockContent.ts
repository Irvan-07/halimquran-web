import { defineArrayMember, defineField, defineType } from "sanity";

// Rich text used by articles and pages: normal text with headings, lists,
// links and inline images.
export const blockContent = defineType({
  name: "blockContent",
  title: "Isi Konten",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraf", value: "normal" },
        { title: "Judul 2", value: "h2" },
        { title: "Judul 3", value: "h3" },
        { title: "Kutipan", value: "blockquote" },
      ],
      lists: [
        { title: "Poin", value: "bullet" },
        { title: "Nomor", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Tebal", value: "strong" },
          { title: "Miring", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Tautan",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Teks alternatif (untuk aksesibilitas)" }),
        defineField({ name: "caption", type: "string", title: "Keterangan gambar" }),
      ],
    }),
  ],
});
