"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Minus, Plus } from "lucide-react";
import { formatIDR } from "@/lib/utils/format";
import { useProductMedia } from "@/components/product/ProductMediaContext";
import { customizationOptions, usePurchase, WHATSAPP_NUMBER } from "@/components/product/usePurchase";
import type { Product } from "@/types/product";

function Label({ children, value }: { children: ReactNode; value?: string }) {
  return (
    <p className="mb-2 text-sm text-muted-foreground">
      <span className="text-foreground">{children}</span>
      {value ? <span className="text-foreground">: {value}</span> : null}
    </p>
  );
}

function chipClass(selected: boolean) {
  return `rounded-lg border px-3 py-2 text-sm transition-colors ${
    selected ? "border-primary bg-accent font-medium text-primary" : "border-border text-foreground hover:border-primary"
  }`;
}

function ColorTiles({ product }: { product: Product }) {
  const { setSelectedImage, selectedVariantId, setSelectedVariantId, availability } = useProductMedia();
  const [plainSelected, setPlainSelected] = useState(0);

  if (product.colorVariants && product.colorVariants.length > 0) {
    const selected = product.colorVariants.find((v) => v.variantId === selectedVariantId);
    return (
      <div>
        <Label value={selected?.name}>Warna</Label>
        <div className="flex flex-wrap gap-2">
          {product.colorVariants.map((variant, i) => {
            const soldOut =
              variant.variantId !== undefined && availability[variant.variantId]?.available === false;
            const isSelected = variant.variantId !== undefined && variant.variantId === selectedVariantId;
            return (
              <button
                key={variant.hex + i}
                type="button"
                onClick={() => {
                  setSelectedImage(variant.imageUrl);
                  setSelectedVariantId(soldOut ? null : (variant.variantId ?? null));
                }}
                aria-pressed={isSelected}
                className={`flex w-[68px] flex-col items-center gap-1 rounded-lg border-2 p-1 text-[11px] ${
                  soldOut
                    ? "border-dashed border-border text-muted-foreground/60"
                    : isSelected
                      ? "border-primary bg-accent font-medium text-primary"
                      : "border-border text-muted-foreground hover:border-primary"
                }`}
              >
                <span className="relative block aspect-square w-full overflow-hidden rounded-md">
                  <Image
                    src={variant.imageUrl}
                    alt=""
                    fill
                    sizes="64px"
                    className={`object-cover ${soldOut ? "opacity-40 grayscale" : ""}`}
                  />
                </span>
                <span className="w-full truncate text-center">{soldOut ? "Habis" : variant.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (product.colors && product.colors.length > 0) {
    return (
      <div>
        <Label value={product.colorNames?.[plainSelected]}>Warna</Label>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((hex, i) => (
            <button
              key={hex + i}
              type="button"
              onClick={() => setPlainSelected(i)}
              aria-pressed={i === plainSelected}
              aria-label={product.colorNames?.[i] ?? hex}
              className={`size-10 rounded-full border-2 p-0.5 ${i === plainSelected ? "border-primary" : "border-border"}`}
            >
              <span className="block size-full rounded-full border border-border" style={{ backgroundColor: hex }} />
            </button>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

function Stepper({
  value,
  onChange,
  max,
}: {
  value: number;
  onChange: (n: number) => void;
  max: number;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-secondary p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Kurangi jumlah"
        className="flex size-8 items-center justify-center rounded-md text-primary hover:bg-background"
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center text-sm font-medium text-foreground">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Tambah jumlah"
        className="flex size-8 items-center justify-center rounded-md text-primary hover:bg-background"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

// Options in the page + the fixed purchase bar that is this theme's
// signature on every screen size:
//  - desktop: thumbnail + name on the left, quantity, "Total harga", then
//    "Beli sekarang" / "Tambah ke Bag" pills and a heart;
//  - phone: round chat button + the two pills (quantity moves into the
//    page as a "Jumlah" row).
// All buying logic is the shared usePurchase hook.
export function BlibliBuyBox({ product }: { product: Product }) {
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
  const { selectedImage } = useProductMedia();

  return (
    <div className="flex flex-col gap-5">
      <ColorTiles product={product} />

      <div>
        <Label>Pilihan Tambahan</Label>
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
      </div>

      <div>
        <Label>Nama Ukiran</Label>
        <input
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Khusus Quran + Nama (opsional)"
          maxLength={30}
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      {/* Phone quantity row */}
      <div className="flex items-center justify-between lg:hidden">
        <span className="text-sm text-foreground">Jumlah</span>
        <Stepper value={quantity} onChange={setQuantity} max={maxQty} />
      </div>

      {allSoldOut ? (
        <p className="text-sm font-semibold text-destructive">Stok habis</p>
      ) : activeStock?.available_qty != null ? (
        <p className={`text-sm ${activeStock.stock_status === "low_stock" ? "font-medium text-amber-600" : "text-muted-foreground"}`}>
          Stok tersisa {activeStock.available_qty} buah
        </p>
      ) : null}

      {/* Fixed purchase bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 lg:px-8">
          <div className="hidden min-w-0 flex-1 items-center gap-3 lg:flex">
            <span className="relative size-12 shrink-0 overflow-hidden rounded-md bg-secondary">
              {selectedImage && <Image src={selectedImage} alt="" fill sizes="48px" className="object-cover" />}
            </span>
            <p className="line-clamp-2 max-w-sm text-sm text-foreground">{product.name}</p>
          </div>
          <div className="hidden items-center gap-6 lg:flex">
            <Stepper value={quantity} onChange={setQuantity} max={maxQty} />
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">Total harga:</p>
              <p className="text-base font-semibold text-foreground">{formatIDR(product.price * quantity)}</p>
            </div>
          </div>

          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat via WhatsApp"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary text-primary lg:hidden"
          >
            <MessageCircle className="size-5" />
          </Link>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={allSoldOut}
            className="h-11 flex-1 rounded-full border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground lg:h-12 lg:w-44 lg:flex-none"
          >
            {allSoldOut ? "Stok habis" : "Beli sekarang"}
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={allSoldOut}
            className="h-11 flex-1 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-muted-foreground/30 lg:h-12 lg:w-44 lg:flex-none"
          >
            Tambah ke Bag
          </button>
          <button
            type="button"
            aria-label="Simpan ke wishlist"
            className="hidden size-12 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-destructive lg:flex"
          >
            <Heart className="size-6 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}
