import type { AnalyticsEvent } from "@/types/analytics";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Pushes a GA4-shaped ecommerce event to the GTM dataLayer. Safe to call
// unconditionally from anywhere in the app: no-ops on the server, and
// no-ops in the browser too until NEXT_PUBLIC_GTM_ID is actually set (see
// components/tracking/GoogleTagManager.tsx) — so wiring call sites now
// carries no risk of sending events to the wrong/undecided GTM container.
export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_GTM_ID) return;

  window.dataLayer = window.dataLayer ?? [];
  const { name, ...payload } = event;
  window.dataLayer.push({ event: name, ...payload });
}
