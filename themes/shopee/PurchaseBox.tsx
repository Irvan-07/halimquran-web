"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Minus, Plus, ShoppingCart } from "lucide-react";
import { useProductMedia } from "@/components/product/ProductMediaContext";
import { customizationOptions, usePurchase, WHATSAPP_NUMBER } from "@/components/product/usePurchase";
import type { Product } from "@/types/product";

// One "label + control" row. Desktop: label in a fixed left column and the
// control beside it (the marketplace spec-table look); mobile: label on
// top, control full width underneath.
function OptionRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-6">
      <span className="text-sm text-muted-foreground lg:w-28 lg:shrink-0 lg:pt-1.5">{label}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function chipClass(selected: boolean, disabled = false) {
  return `flex min-h-9 items-center gap-2 rounded-sm border px-3 py-1.5 text-sm transition-colors ${
    disabled
      ? "cursor-not-allowed border-border bg-muted text-muted-foreground/60 line-through"
      : selected
        ? "border-primary bg-accent text-primary"
        : "border-border text-foreground hover:border-primary hover:text-primary"
  }`;
}

function ColorOptions({ product }: { product: Product }) {
  const { setSelectedImage, selectedVariantId, setSelectedVariantId, availability } = useProductMedia();
  const [plainSelected, setPlainSelected] = useState(0);

  if (product.colorVariants && product.colorVariants.length > 0) {
    return (
      <div className="flex flex-wrap gap-2">
        {product.colorVariants.map((variant, i) => {
          const soldOut =
            variant.variantId !== undefined && availability[variant.variantId]?.available === false;
          const selected = variant.variantId !== undefined && variant.variantId === selectedVariantId;
          return (
            <button
              key={variant.hex + i}
              type="button"
              onClick={() => {
                setSelectedImage(variant.imageUrl);
                setSelectedVariantId(soldOut ? null : (variant.variantId ?? null));
              }}
              aria-pressed={selected}
              className={chipClass(selected, soldOut)}
            >
              <span className="relative size-6 shrink-0 overflow-hidden rounded-[2px]">
                <Image
                  src={variant.imageUrl}
                  alt=""
                  fill
                  sizes="24px"
                  className={`object-cover ${soldOut ? "opacity-40 grayscale" : ""}`}
                />
              </span>
              {variant.name}
              {soldOut && <span className="text-[10px] font-semibold uppercase no-underline">Habis</span>}
            </button>
          );
        })}
      </div>
    );
  }

  if (product.colors && product.colors.length > 0) {
    return (
      <div className="flex flex-wrap gap-2">
        {product.colors.map((hex, i) => (
          <button
            key={hex + i}
            type="button"
            onClick={() => setPlainSelected(i)}
            aria-pressed={i === plainSelected}
            className={chipClass(i === plainSelected)}
          >
            <span className="size-4 shrink-0 rounded-full border border-border" style={{ backgroundColor: hex }} />
            {product.colorNames?.[i] ?? hex}
          </button>
        ))}
      </div>
    );
  }
  return null;
}

// Marketplace buy box: color chips, "Pilihan Tambahan" chips, engraving
// name, a square quantity stepper with remaining stock, and the actions —
// inline "Masukkan Keranjang" / "Beli Sekarang" on tablet+desktop, a fixed
// 3-part bar (chat | keranjang | beli) on phones. All the buying logic is
// the shared usePurchase hook.
export function ShopeePurchaseBox({ product }: { product: Product }) {
  const {
    allSoldOut,
    activeStock,
    maxQty,
    customization,
    setCustomization,
    customName,
    setCustomName,
    quantity,
    setQuantity,
    handleAddToCart,
    handleBuyNow,
  } = usePurchase(product);

  const hasColors = (product.colorVariants?.length ?? 0) > 0 || (product.colors?.length ?? 0) > 0;

  return (
    <div className="flex flex-col gap-4">
      {hasColors && (
        <OptionRow label="Warna">
          <ColorOptions product={product} />
        </OptionRow>
      )}

      <OptionRow label="Pilihan Tambahan">
        <div className="flex flex-wrap gap-2">
          {customizationOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setCustomization(option.value)}
              aria-pressed={customization === option.value}
              className={chipClass(customization === option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </OptionRow>

      <OptionRow label="Nama Ukiran">
        <input
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Khusus Quran + Nama (opsional)"
          maxLength={30}
          className="h-10 w-full rounded-sm border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary lg:max-w-sm"
        />
      </OptionRow>

      <OptionRow label="Kuantitas">
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Kurangi jumlah"
              className="flex size-9 items-center justify-center rounded-l-sm border border-border text-foreground hover:bg-secondary"
            >
              <Minus className="size-4" />
            </button>
            <span className="flex h-9 w-14 items-center justify-center border-y border-border text-sm">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
              aria-label="Tambah jumlah"
              className="flex size-9 items-center justify-center rounded-r-sm border border-border text-foreground hover:bg-secondary"
            >
              <Plus className="size-4" />
            </button>
          </div>
          {allSoldOut ? (
            <span className="text-sm font-medium text-destructive">Stok habis</span>
          ) : activeStock?.available_qty != null ? (
            <span
              className={`text-sm ${activeStock.stock_status === "low_stock" ? "font-medium text-amber-600" : "text-muted-foreground"}`}
            >
              Tersisa {activeStock.available_qty} buah
            </span>
          ) : null}
        </div>
      </OptionRow>

      {/* Tablet + desktop actions */}
      <div className="hidden gap-3 pt-2 sm:flex lg:pl-34">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={allSoldOut}
          className="flex h-12 items-center justify-center gap-2 rounded-sm border border-primary bg-accent px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground"
        >
          <ShoppingCart className="size-5" />
          Masukkan Keranjang
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={allSoldOut}
          className="flex h-12 min-w-40 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-muted-foreground/40"
        >
          {allSoldOut ? "Stok Habis" : "Beli Sekarang"}
        </button>
      </div>

      {/* Phone action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[3.5rem_1fr_1fr] border-t border-border bg-background pb-[env(safe-area-inset-bottom)] sm:hidden">
        <Link
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat via WhatsApp"
          className="flex h-14 flex-col items-center justify-center gap-0.5 border-r border-border text-primary"
        >
          <MessageCircle className="size-5" />
          <span className="text-[10px]">Chat</span>
        </Link>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={allSoldOut}
          className="flex h-14 flex-col items-center justify-center gap-0.5 bg-accent text-primary disabled:bg-muted disabled:text-muted-foreground"
        >
          <ShoppingCart className="size-5" />
          <span className="text-[10px]">Masukkan Keranjang</span>
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={allSoldOut}
          className="flex h-14 items-center justify-center bg-primary text-sm font-medium text-primary-foreground disabled:bg-muted-foreground/40"
        >
          {allSoldOut ? "Stok Habis" : "Beli Sekarang"}
        </button>
      </div>
    </div>
  );
}
