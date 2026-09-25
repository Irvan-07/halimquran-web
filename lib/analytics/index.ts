// GA4/GTM/Meta/TikTok tracking — event layer scaffolded (17 Sep 2026), but
// no GTM container is wired: NEXT_PUBLIC_GTM_ID is deliberately left empty
// in .env.example pending the GTM container-ownership conflict noted in the
// project plan (GTM-WRJ5MLS vs GTM-595C69F). track() and
// <GoogleTagManager> both no-op until that's resolved and the real ID is
// set — do not hardcode either candidate ID here.
export { track } from "./track";
