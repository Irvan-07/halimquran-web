"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";
import { track } from "@/lib/analytics";
import { productCategories } from "@/lib/mock-data/categories";
import { formatIDR } from "@/lib/utils/format";
import type { CustomizationOption } from "@/types/cart";

const customizationLabels: Record<CustomizationOption, string> = {
  "quran-saja": "Quran Saja",
  "quran-nama": "Quran + Nama",
  "quran-nama-box": "Quran + Nama + Box",
};

export function CartPageContent() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  function handleBeginCheckout() {
    track({
      name: "begin_checkout",
      value: subtotal,
      items: items.map((item) => ({
        item_id: item.productId,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingCart className="size-12 text-muted-foreground" />
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Keranjang Kosong
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Belum ada produk di keranjang kamu.
        </p>
        <Button asChild>
          <Link href="/produk">Lihat Produk</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 pb-40 sm:px-6 lg:px-8 sm:pb-10">
      <h1 className="font-heading text-2xl font-semibold text-foreground">
        Keranjang
      </h1>

      <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
        {items.map((item) => {
          const categoryLabel = productCategories.find(
            (c) => c.slug === item.category,
          )?.label;

          return (
            <div key={item.cartItemId} className="flex gap-4 p-4">
              <div className="size-20 shrink-0 rounded-md bg-secondary" />

              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-wide text-primary">
                  {categoryLabel}
                </span>
                <h3 className="text-sm font-medium text-foreground">
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {customizationLabels[item.customization]}
                  {item.size ? ` · Ukuran ${item.size}` : ""}
                  {item.customName ? ` · Nama: "${item.customName}"` : ""}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-7"
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Kurangi jumlah"
                    >
                      <Minus className="size-3.5" />
                    </Button>
                    <span className="w-6 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-7"
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity + 1)
                      }
                      aria-label="Tambah jumlah"
                    >
                      <Plus className="size-3.5" />
                    </Button>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {formatIDR(item.price * item.quantity)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.cartItemId)}
                aria-label={`Hapus ${item.name} dari keranjang`}
                className="h-fit text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            {formatIDR(subtotal)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Ongkos kirim dihitung saat checkout.
        </p>
        <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
          <span>Total</span>
          <span className="text-primary">{formatIDR(subtotal)}</span>
        </div>
      </div>

      <div className="hidden flex-col gap-3 sm:flex sm:flex-row">
        <Button variant="outline" asChild className="flex-1">
          <Link href="/produk">Lanjut Belanja</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href="/checkout" onClick={handleBeginCheckout}>
            Lanjut ke Checkout
          </Link>
        </Button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background p-3 sm:hidden">
        <Button asChild className="w-full">
          <Link href="/checkout" onClick={handleBeginCheckout}>
            Lanjut ke Checkout &middot; {formatIDR(subtotal)}
          </Link>
        </Button>
      </div>
    </div>
  );
}
