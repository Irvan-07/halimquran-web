# Production checkout recovery (P0)

Production incident: browser paused on NEXT_PUBLIC_SCALEV_STORE_ID is not set; no payment-methods request was sent. The production Worker has a server-side SCALEV_API_KEY secret, but that cannot populate browser build variables.

Use existing authorized credentials on the trusted build machine; do not paste keys into chat or commit .env files. Restore the original complete production build configuration (including analytics, CMS, theme and site URL). Add the two public Storefront variables from the correct Scalev Storefront API configuration (store unique_id and sfpk_ publishable key). Do not substitute the business key or numeric store dashboard ID. Keep SCALEV_API_KEY server-side in Cloudflare.

With Node 22 / npm 11.13.0 and original lockfile:
1. npm ci --no-audit --no-fund
2. npm run test:storefront
3. npm run check:storefront
4. npm run check:storefront:live (OPTIONS + GET only; no order, payment, or cart mutation).
5. npm run build / npx --no-install opennextjs-cloudflare build after configuration passes. Check build artifact and preserve prior version ID. Never deploy the synthetic CI artifact.
6. Owner approval required before merge or production deploy/rollback. Release via npm run deploy (rechecks live configuration before building/deploying). Direct raw Wrangler commands bypass the guard; do not use them for release.
7. Verify new version traffic, gallery, live methods, location search, shipping quote, checkout summary and personalization without submitting an order. If failure, stop and request separate rollback approval.

Synthetic CI uses HALIM_SYNTHETIC_BUILD=1 only when CI=true and GITHUB_ACTIONS=true. The release command refuses that flag. No production credentials in CI. Presence/format checks alone do not prove the actual store is active; verify live read as above. The runtime business key's permission/validity is a separate check.
