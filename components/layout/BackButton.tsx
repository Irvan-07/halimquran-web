"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

// Becomes true once the visitor has moved to another page inside the site.
// `window.history.length` can't tell that apart from a visit that arrived
// from Google / WhatsApp / an ad (where "back" would leave the site), so the
// layout mounts <InAppNavigationTracker /> to record it.
let navigatedInApp = false;

export function InAppNavigationTracker() {
  const pathname = usePathname();
  const entryPath = useRef<string | null>(null);

  useEffect(() => {
    if (entryPath.current === null) entryPath.current = pathname;
    else if (pathname !== entryPath.current) navigatedInApp = true;
  }, [pathname]);

  return null;
}

// The header's back arrow: returns to whatever page the visitor came from
// (home, a category, search…), like the browser's own back button. Only when
// the page was opened directly — nothing in the site to go back to — does it
// fall back to `fallbackHref`.
export function BackButton({
  fallbackHref,
  className,
  children,
}: {
  fallbackHref: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="Kembali"
      onClick={() => (navigatedInApp ? router.back() : router.push(fallbackHref))}
      className={className}
    >
      {children}
    </button>
  );
}
