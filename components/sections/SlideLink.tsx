import type { ReactNode } from "react";
import Link from "next/link";

// A banner slide that is a link when the CMS gave it a destination, and a
// plain box otherwise. Paths stay inside the site (client-side navigation);
// full URLs open in a new tab.
export function SlideLink({
  href,
  label,
  className,
  children,
}: {
  href?: string;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  if (!href) return <div className={className}>{children}</div>;
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={label} className={className}>
      {children}
    </Link>
  );
}
