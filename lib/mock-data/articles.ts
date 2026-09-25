// MOCK DATA — the live halimquran.com/blogs currently has exactly one
// published post (verified 2026-09-17); title, date and URL below are real,
// the summary is written fresh for this listing (the article's own body
// text is not reproduced here). Do not treat this as a full article system —
// real content and a proper /artikel/[slug] detail route need the CMS
// decision noted elsewhere in the project plan.
import type { Article } from "@/types/article";

export const mockArticles: Article[] = [
  {
    slug: "manusia-terbaik-adalah-yang-belajar-dan-mengajarkan-al-quran",
    title: "Manusia Terbaik Adalah yang Belajar dan Mengajarkan Al-Qur'an",
    publishedAt: "2026-05-05",
    summary:
      "Kajian singkat tentang keutamaan belajar dan mengajarkan Al-Qur'an berdasarkan hadits riwayat Bukhari.",
    sourceUrl:
      "https://halimquran.com/blogs/manusia-terbaik-adalah-yang-belajar-dan-mengajarkan-al-quran",
  },
];
