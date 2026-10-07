// Tracking components. MetaPixelPageView reports PageView per route (private
// pages excluded); the pixel base code itself lives in app/layout.tsx.
// GoogleTagManager renders nothing until NEXT_PUBLIC_GTM_ID is set (see
// lib/analytics for why).
export { GoogleTagManager } from "./GoogleTagManager";
export { MetaPixelPageView } from "./MetaPixelPageView";
export { TrackViewItem } from "./TrackViewItem";
