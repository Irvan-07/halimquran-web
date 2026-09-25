// MOCK DATA — placeholder catalog for foundation UI work only. Not from Scalev.
// Names, prices, badges and ratings below were read directly off the live
// halimquran.com site (2026-09-16), including their real product URLs (kept
// in `slug`) — products 5 and 6 from the live Wakaf Quran page specifically,
// where the site itself marks them "Cocok untuk Wakaf". Category assignment
// is inferred from product naming/badges (e.g. "15 baris" -> Hafalan), not
// confirmed against Halim Quran's internal taxonomy — recheck before
// treating as authoritative. `colors` are illustrative, not pixel-sampled.
import type { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "mushaf-al-quran-al-wafa-b7-pocket-edition",
    name: "Mushaf Al Quran Al Wafa B7 Pocket Edition",
    price: 49000,
    category: "quran-hafalan",
    size: "B7",
    badge: "Ukir Nama",
    rating: 5,
    colors: ["#6B7280", "#111827", "#7B2D26", "#C9A876", "#8B5E34", "#0F7A5C", "#8E7CC3"],
    customNameEligible: true,
  },
  {
    id: "2",
    slug: "mushaf-al-quran-al-wafa-a6-pocket-edition",
    name: "Mushaf Al Quran Al Wafa A6 Pocket Edition",
    price: 56000,
    category: "quran-hafalan",
    size: "A6",
    badge: "Terfavorit",
  },
  {
    id: "3",
    slug: "al-quran-madinah-huzaifi-a5-standar-internasional",
    name: "Al Quran Madinah Huzaifi A5 Standar Internasional",
    price: 109000,
    category: "quran-harian",
    size: "A5",
    badge: "Ukir Nama",
    rating: 5,
    colors: ["#E8DCC4", "#1E3A5F", "#7B2D26", "#111827", "#6B7280", "#C2417A", "#8B5E34"],
    customNameEligible: true,
  },
  {
    id: "4",
    slug: "al-quran-tajwid-al-mumtaz-a7-resleting",
    name: "Al Quran Tajwid Al Mumtaz A7 Resleting",
    price: 45000,
    category: "quran-tajwid",
    size: "A7",
    rating: 5,
  },
  {
    id: "5",
    slug: "al-quran-al-azhim-a5-hard-cover",
    name: "Al Quran Al Azhim A5 Hard Cover",
    price: 33000,
    category: "quran-harian",
    size: "A5",
    wakafEligible: true,
  },
  {
    id: "6",
    slug: "mushaf-al-quran-al-wafa-a5-hard-cover",
    name: "Mushaf Al Quran Al Wafa A5 Hard Cover",
    price: 65000,
    category: "quran-hafalan",
    size: "A5",
    rating: 4,
    wakafEligible: true,
  },
  // Products 7-9: real bundle SKUs from the homepage's own "Hadiah/Gift"
  // carousel (2026-09-17) — 2-piece box sets with free name engraving,
  // positioned by the site itself as gift-appropriate.
  {
    id: "7",
    slug: "bundling-mushaf-al-quran-madinah-huzaifi-a5-2-pcs-box-exclusive-free-custom-nama",
    name: "Bundling Mushaf Al Quran Madinah Huzaifi A5 2 pcs Box Exclusive Free Custom Nama",
    price: 260800,
    category: "quran-harian",
    size: "A5",
    badge: "Free Custom Nama",
    giftEligible: true,
  },
  {
    id: "8",
    slug: "bundling-mushaf-al-quran-al-wafa-a6-pocket-2-pcs-box-exclusive-free-custom-nama",
    name: "Bundling Mushaf Al Quran Al Wafa A6 Pocket 2 pcs Box Exclusive Free Custom Nama",
    price: 151800,
    category: "quran-hafalan",
    size: "A6",
    badge: "Free Custom Nama",
    giftEligible: true,
  },
  {
    id: "9",
    slug: "bundling-mushaf-al-quran-terjemah-al-halim-a6-pocket-2-pcs-box-exclusive-free-custom-nama",
    name: "Bundling Mushaf Al Quran Terjemah Al Halim A6 Pocket 2 pcs Box Exclusive Free Custom Nama",
    price: 157800,
    category: "quran-terjemah",
    size: "A6",
    badge: "Free Custom Nama",
    giftEligible: true,
  },
  // Products 10-14: real Al Wafa line SKUs surfaced via the live site's own
  // search for "wafa" (2026-09-17) — names, prices, and slugs (hence real
  // product URLs) read directly from the search results/hrefs.
  {
    id: "10",
    slug: "mushaf-al-quran-al-wafa-a7-pocket-edition",
    name: "Mushaf Al Quran Al Wafa A7 Pocket Edition",
    price: 35000,
    category: "quran-hafalan",
    size: "A7",
  },
  {
    id: "11",
    slug: "mushaf-al-quran-al-wafa-muslimah-a5-resleting",
    name: "Mushaf Al Quran Al Wafa Muslimah A5 Resleting",
    price: 83000,
    category: "quran-hafalan",
    size: "A5",
  },
  {
    id: "12",
    slug: "mushaf-al-quran-al-wafa-b7-mujazza-per-5-juz",
    name: "Mushaf Al Quran Al Wafa B7 Mujazza Per 5 Juz",
    price: 50000,
    category: "quran-hafalan",
    size: "B7",
  },
  {
    id: "13",
    slug: "mushaf-al-quran-al-wafa-rubu-b7-resleting",
    name: "Mushaf Al Quran Al Wafa Rubu B7 Resleting",
    price: 45000,
    category: "quran-hafalan",
    size: "B7",
  },
  {
    id: "14",
    slug: "mushaf-al-qur-an-al-wafa-a5-resleting-premium",
    name: "Mushaf Al Qur'an Al Wafa A5 Resleting Premium",
    price: 76000,
    category: "quran-hafalan",
    size: "A5",
  },
];
