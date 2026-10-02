import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/content/RichText";
import { getArticle } from "@/sanity/lib/content";
import { urlFor } from "@/sanity/lib/image";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug).catch(() => null);
  if (!article) return { title: "Artikel" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: article.coverImage
      ? { images: [urlFor(article.coverImage).width(1200).height(630).auto("format").url()] }
      : undefined,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug).catch(() => null);
  if (!article) notFound();

  const date = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12 sm:px-6">
      <Link href="/artikel" className="text-sm font-medium text-primary">
        &larr; Semua artikel
      </Link>
      <header className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">{date}</span>
        <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground">
          {article.title}
        </h1>
        {article.excerpt && <p className="text-muted-foreground">{article.excerpt}</p>}
      </header>
      {article.coverImage && (
        <Image
          src={urlFor(article.coverImage).width(1200).height(675).auto("format").url()}
          alt={article.coverImage.alt ?? article.title}
          width={1200}
          height={675}
          priority
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
      <RichText value={article.body} />
    </article>
  );
}
