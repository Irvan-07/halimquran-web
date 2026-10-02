import type { ReactNode } from "react";

export function ShopeeProductGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
      {children}
    </div>
  );
}
