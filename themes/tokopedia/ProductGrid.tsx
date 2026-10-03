import type { ReactNode } from "react";

export function TokopediaProductGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
      {children}
    </div>
  );
}
