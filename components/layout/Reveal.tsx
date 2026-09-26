"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Matches halimquran.com's own section-entrance animation exactly (checked
// via computed styles on the live site): each section starts translated
// 40px right and invisible, then slides/fades into place over 0.5s
// ease-out the first time it scrolls into view.
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        visible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      } ${className}`}
    >
      {children}
    </section>
  );
}
