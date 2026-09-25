"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";

export function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      aria-label={`Lihat keranjang${itemCount > 0 ? `, ${itemCount} item` : ""}`}
      className="relative"
    >
      <Link href="/keranjang">
        <ShoppingCart className="size-5" />
        {itemCount > 0 && (
          <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
