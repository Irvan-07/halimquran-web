export const siteConfig = {
  name: "Halim Quran",
  description: "Toko mushaf Al-Quran — Halim Quran.",
  // `||`, not `??` — Vercel sets an unfilled env var to "" (empty string,
  // not undefined), which `??` would let through and `new URL("")` in
  // app/layout.tsx would then throw and fail the whole build.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
