import type { PortableTextBlock } from "next-sanity";
import type { Metadata } from "next";
import { sanityClient } from "./client";

// Published content is public-read, so these run with the plain CDN client.
// `revalidate: 60` keeps pages static-fast while picking up edits within a
// minute; a Sanity webhook can make that instant later.
const OPTIONS = { next: { revalidate: 60, tags: ["sanity"] } };

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
}

export interface ArticleSummary {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  coverImage?: SanityImage;
}

export interface Article extends ArticleSummary {
  body?: PortableTextBlock[];
}

export interface CmsPage {
  title: string;
  slug: string;
  description?: string;
  body?: PortableTextBlock[];
}

const ARTICLE_SUMMARY = `{ title, "slug": slug.current, excerpt, publishedAt, coverImage }`;

export async function getArticles(): Promise<ArticleSummary[]> {
  return sanityClient.fetch(
    `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) ${ARTICLE_SUMMARY}`,
    {},
    OPTIONS,
  );
}

export async function getArticle(slug: string): Promise<Article | null> {
  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0]{ title, "slug": slug.current, excerpt, publishedAt, coverImage, body }`,
    { slug },
    OPTIONS,
  );
}

export async function getPage(slug: string): Promise<CmsPage | null> {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{ title, "slug": slug.current, description, body }`,
    { slug },
    OPTIONS,
  );
}

/** The theme id picked in the CMS ("Pengaturan Situs"), or null when nothing is published yet. */
export async function getSiteThemeId(): Promise<string | null> {
  const settings = await sanityClient.fetch<{ activeTheme?: string } | null>(
    `*[_id == "siteSettings"][0]{ activeTheme }`,
    {},
    OPTIONS,
  );
  return settings?.activeTheme ?? null;
}

/** Title/description from the Sanity page when published, else the static fallback title. */
export async function pageMetadata(slug: string, fallbackTitle: string): Promise<Metadata> {
  const page = await getPage(slug).catch(() => null);
  return { title: page?.title ?? fallbackTitle, description: page?.description };
}
