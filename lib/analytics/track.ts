import type { AnalyticsEvent } from "@/types/analytics";
import { trackMetaPixel } from "./meta-pixel";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// One call per funnel event, from anywhere in the app. It fans out to:
//  - the Meta Pixel (lib/analytics/meta-pixel.ts), which only runs on the real
//    storefront and never on private pages;
//  - the GTM dataLayer, a no-op until NEXT_PUBLIC_GTM_ID is set (no container
//    is wired yet: see lib/analytics/index.ts).
// No-ops on the server.
export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  trackMetaPixel(event);

  if (!process.env.NEXT_PUBLIC_GTM_ID) return;
  window.dataLayer = window.dataLayer ?? [];
  const { name, ...payload } = event;
  window.dataLayer.push({ event: name, ...payload });
}
