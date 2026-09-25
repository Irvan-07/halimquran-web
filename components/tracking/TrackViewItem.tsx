"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import type { Product } from "@/types/product";

// Fires a view_item event once when a PDP mounts. Renders nothing — this is
// a Client Component only so it can call track() from a Server Component page.
export function TrackViewItem({ product }: { product: Product }) {
  useEffect(() => {
    track({
      name: "view_item",
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return null;
}
