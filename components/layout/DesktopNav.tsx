"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { mainNav } from "@/config/nav";

export function DesktopNav() {
  const [openHref, setOpenHref] = useState<string | null>(null);

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {mainNav.map((item) =>
        item.children ? (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => setOpenHref(item.href)}
            onMouseLeave={() => setOpenHref(null)}
          >
            <Link
              href={item.href}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
              <ChevronDown className="size-3.5" />
            </Link>
            {openHref === item.href && (
              <div className="absolute left-0 top-full z-50 grid w-[420px] grid-cols-2 gap-x-4 gap-y-1 rounded-lg border border-border bg-background p-3 shadow-lg">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-secondary hover:text-primary"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}
