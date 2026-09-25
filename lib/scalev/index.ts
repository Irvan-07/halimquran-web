// Scalev commerce integration — client.ts now implements real fetch calls
// against the documented API v3 (verified against https://dev.scalev.com,
// 25 Sep 2026), but every call still throws until SCALEV_API_KEY /
// SCALEV_STOREFRONT_API_KEY / SCALEV_STORE_ID are actually set — no API key
// exists on the account yet (checked in Scalev's own Settings → Developers
// → API Keys, 25 Sep 2026: "No API Keys"). Create one there when ready.
export { scalev } from "./client";
