// "Terjual" totals per product, taken from the product's Shopee listing (the
// only marketplace we use for this number), keyed by product slug. Shopee
// rounds big numbers ("10RB+" -> 10000), so these are the figures as shown
// there. Values here override `soldCount` in products.ts, so this is the one
// place to add or update a number; a product with no entry here and no
// soldCount in products.ts simply shows no "Terjual" line.
export const shopeeSoldCounts: Record<string, number> = {
  "al-quran-terjemah-al-halim-b7-rubu-hvs-resleting": 3000,
  "mushaf-al-quran-al-wafa-a7-pocket-edition": 7000,
  "mushaf-al-quran-al-wafa-tsumun-a7-resleting": 6000,
  "mushaf-al-quran-al-wafa-a6-resleting": 1000,
};
