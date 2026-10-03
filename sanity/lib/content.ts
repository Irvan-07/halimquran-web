import type { PortableTextBlock } from "next-sanity";
import type { Metadata } from "next";
import { DEFAULT_HERO_SLIDES, builtinHeroBanners, type HeroSlide } from "@/components/sections/hero-slides";
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

/** Keep only destinations we can safely link to: a site path or an http(s) URL. */
function cleanLink(link?: string | null): string | undefined {
  const l = link?.trim();
  if (!l) return undefined;
  return l.startsWith("/") || /^https?:\/\//i.test(l) ? l : undefined;
}

/**
 * Homepage banners from the CMS ("Pengaturan Situs" > "Banner beranda"), in
 * the order set there. Falls back to the built-in set (not clickable) when
 * none are published or the CMS can't be reached.
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const rows = await sanityClient.fetch<
      { imageUrl?: string | null; builtin?: string | null; alt?: string | null; link?: string | null }[] | null
    >(
      `*[_id == "siteSettings"][0].heroBanners[]{ "imageUrl": image.asset->url, builtin, alt, link }`,
      {},
      OPTIONS,
    );
    const slides = (rows ?? []).flatMap((row) => {
      const built = builtinHeroBanners.find((b) => b.id === row.builtin);
      const src = row.imageUrl ?? built?.src;
      if (!src) return [];
      return [{ src, alt: row.alt?.trim() || built?.alt || "Banner Halim Quran", href: cleanLink(row.link) }];
    });
    return slides.length > 0 ? slides : DEFAULT_HERO_SLIDES;
  } catch {
    return DEFAULT_HERO_SLIDES;
  }
}

/** Title/description from the Sanity page when published, else the static fallback title. */
export async function pageMetadata(slug: string, fallbackTitle: string): Promise<Metadata> {
  const page = await getPage(slug).catch(() => null);
  return { title: page?.title ?? fallbackTitle, description: page?.description };
}
