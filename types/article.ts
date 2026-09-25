export interface Article {
  slug: string;
  title: string;
  /** ISO date string. */
  publishedAt: string;
  /** Short original summary written for this listing — not copied from the source. */
  summary: string;
  /** Live halimquran.com URL — full article body isn't reproduced here (copyright). */
  sourceUrl: string;
}
