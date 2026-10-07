"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isPrivatePath } from "@/lib/analytics/meta-pixel";

// Sends a PageView on first load and on every client-side route change (the
// App Router navigates without reloading, so the base code alone would only
// report the landing page). Private pages are skipped: see isPrivatePath.
export function MetaPixelPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || isPrivatePath(pathname)) return;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
