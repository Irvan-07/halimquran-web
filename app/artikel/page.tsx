import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/sanity/lib/content";
import { urlFor } from "@/sanity/lib/image";

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

export default async function ArtikelPage() {
  const articles = await getArticles().catch(() => []);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold text-foreground">Artikel</h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Kajian, edukasi, dan inspirasi seputar Al-Qur&apos;an.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/artikel/${article.slug}`}
              className="flex flex-col overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-md"
            >
              {article.coverImage && (
                <Image
                  src={urlFor(article.coverImage).width(800).height(450).auto("format").url()}
                  alt={article.coverImage.alt ?? article.title}
                  width={800}
                  height={450}
                  className="aspect-video w-full object-cover"
                />
              )}
              <div className="flex flex-col gap-1.5 p-5">
                <span className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}</span>
                <h2 className="font-heading text-lg font-semibold text-foreground">{article.title}</h2>
                {article.excerpt && <p className="text-sm text-muted-foreground">{article.excerpt}</p>}
                <span className="text-sm font-medium text-primary">Baca selengkapnya &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Belum ada artikel.</p>
      )}
    </div>
  );
}
