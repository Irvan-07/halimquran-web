// Tracking. Today the storefront reports to the Meta Pixel directly
// (lib/analytics/meta-pixel.ts: ViewContent / AddToCart / InitiateCheckout /
// PageView, the same dataset Scalev's server-side Conversions API feeds, which
// sends Purchase).
//
// No GTM container is wired: NEXT_PUBLIC_GTM_ID stays empty. The two candidate
// containers (GTM-WRJ5MLS, GTM-595C69F) are not usable: WRJ5MLS is the old
// site's container (somebody else's Meta pixel, GA4 properties and ~44 Google
// Ads tags) and neither is reachable from the owner's Google account. Create a
// container the owner controls before setting the id; track() already pushes
// GA4-shaped events to the dataLayer once it is set.
export { track } from "./track";
