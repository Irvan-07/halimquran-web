// Public identifiers (not secrets) — safe to ship to the browser, which the
// embedded Studio and the content client both need.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "mnu5ne8u";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-10-01";
