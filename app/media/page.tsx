import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Media",
};

// On the live site, every "Media" sub-item is a dead link (href="/") except
// "Artikel Lainnya", which points to the real blog (verified 2026-09-17).
// This page mirrors that: real labels as non-interactive chips, except the
// one that actually goes somewhere on our own site (/artikel).
const mediaTopics = [
  "Event Halim Quran",
  "Pameran",
  "Gathering",
  "Kajian",
  "Edukasi Quran",
  "Inspirasi Quran",
  "Sahabat Halim",
  "Insan Halim",
  "Kafilah Halim",
  "Update Brand",
  "Promo & Campaign",
  "Press Release",
];

export default function MediaPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold text-foreground">
        Media
      </h1>
      <p className="max-w-xl text-sm text-muted-foreground">
        Event, kajian, edukasi, dan kabar seputar Halim Quran. Sebagian besar
        topik masih dalam pengembangan.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/artikel"
          className="rounded-full border border-primary px-4 py-1.5 text-sm text-primary hover:bg-secondary"
        >
          Artikel Lainnya
        </Link>
        {mediaTopics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
