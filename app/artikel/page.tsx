import type { Metadata } from "next";
import Link from "next/link";
import { mockArticles } from "@/lib/mock-data/articles";

export const metadata: Metadata = {
  title: "Artikel",
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

// The live halimquran.com/blogs only has one real post so far (verified
// 2026-09-17) — this listing mirrors that honestly rather than inventing a
// fuller catalog. Full article bodies aren't reproduced here (copyright);
// each card links out to the real source. A proper internal article system
// is pending the CMS decision noted in the project plan.
export default function ArtikelPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          Artikel
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Kajian, edukasi, dan inspirasi seputar Al-Qur&apos;an.
        </p>
      </div>

      {mockArticles.length > 0 ? (
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
          {mockArticles.map((article) => (
            <Link
              key={article.slug}
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1.5 p-5 hover:bg-secondary"
            >
              <span className="text-xs text-muted-foreground">
                {formatDate(article.publishedAt)}
              </span>
              <h2 className="font-heading text-lg font-semibold text-foreground">
                {article.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {article.summary}
              </p>
              <span className="text-sm font-medium text-primary">
                Baca di halimquran.com &rarr;
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Belum ada artikel.</p>
      )}
    </div>
  );
}
