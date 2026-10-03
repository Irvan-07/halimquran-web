"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Minus, Plus, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useProductMedia } from "@/components/product/ProductMediaContext";
import { customizationOptions, usePurchase, WHATSAPP_NUMBER } from "@/components/product/usePurchase";
import { formatIDR } from "@/lib/utils/format";
import type { Product } from "@/types/product";

// One usePurchase() instance shared by every control on the page (options in
// the middle column, the sticky card on the right, the phone action bar), so
// they all read and write the same selection.
type PurchaseState = ReturnType<typeof usePurchase>;
const PurchaseContext = createContext<PurchaseState | null>(null);

export function TokopediaPurchaseProvider({ product, children }: { product: Product; children: ReactNode }) {
  const purchase = usePurchase(product);
  return <PurchaseContext.Provider value={purchase}>{children}</PurchaseContext.Provider>;
}

function usePurchaseState(): PurchaseState {
  const ctx = useContext(PurchaseContext);
  if (!ctx) throw new Error("Tokopedia purchase controls must be inside TokopediaPurchaseProvider");
  return ctx;
}

function chipClass(selected: boolean, disabled = false) {
  return `flex min-h-9 items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
    disabled
      ? "cursor-not-allowed border-border bg-secondary text-muted-foreground/60"
      : selected
        ? "border-primary bg-accent font-bold text-primary"
        : "border-border text-foreground hover:border-primary"
  }`;
}

function Stepper({ value, onChange, max }: { value: number; onChange: (n: number) => void; max: number }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-input">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Kurangi jumlah"
        className="flex size-8 items-center justify-center text-primary disabled:text-muted-foreground"
        disabled={value <= 1}
      >
        <Minus className="size-4" />
      </button>
      <span className="w-10 text-center text-sm text-foreground">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Tambah jumlah"
        className="flex size-8 items-center justify-center text-primary disabled:text-muted-foreground"
        disabled={value >= max}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

function StockNote() {
  const { allSoldOut, activeStock } = usePurchaseState();
  if (allSoldOut) return <span className="text-xs font-bold text-destructive">Stok habis</span>;
  if (activeStock?.available_qty != null) {
    return (
      <span className="text-xs text-muted-foreground">
        Stok: <span className={activeStock.stock_status === "low_stock" ? "font-bold text-[#FF7F17]" : "font-bold text-foreground"}>
          {activeStock.stock_status === "low_stock" ? `Sisa ${activeStock.available_qty}` : activeStock.available_qty}
        </span>
      </span>
    );
  }
  return null;
}

/** "Pilih warna" chips (desktop only — phones use the strip under the photo), "Pilih pilihan order" chips and the engraving name. */
export function TokopediaOptions({ product }: { product: Product }) {
  const { customization, setCustomization, customName, setCustomName } = usePurchaseState();
  const { setSelectedImage, selectedVariantId, setSelectedVariantId, availability } = useProductMedia();
  const [plainSelected, setPlainSelected] = useState(0);
  const selectedColor = product.colorVariants?.find((v) => v.variantId === selectedVariantId);

  return (
    <div className="flex flex-col gap-5">
      {product.colorVariants && product.colorVariants.length > 0 ? (
        <div className="hidden lg:block">
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-extrabold text-foreground">Pilih warna:</span> {selectedColor?.name ?? ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colorVariants.map((v, i) => {
              const soldOut = v.variantId !== undefined && availability[v.variantId]?.available === false;
              const selected = v.variantId !== undefined && v.variantId === selectedVariantId;
              return (
                <button
                  key={v.hex + i}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedImage(v.imageUrl);
                    setSelectedVariantId(soldOut ? null : (v.variantId ?? null));
                  }}
                  className={chipClass(selected, soldOut)}
                >
                  <span className="relative size-6 shrink-0 overflow-hidden rounded">
                    <Image src={v.imageUrl} alt="" fill sizes="24px" className={`object-cover ${soldOut ? "opacity-40 grayscale" : ""}`} />
                  </span>
                  <span className={soldOut ? "line-through" : ""}>{v.name}</span>
                  {soldOut && <span className="text-[10px] font-bold uppercase">Habis</span>}
                </button>
              );
            })}
          </div>
        </div>
      ) : product.colors && product.colors.length > 0 ? (
        <div>
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-extrabold text-foreground">Pilih warna:</span> {product.colorNames?.[plainSelected] ?? ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((hex, i) => (
              <button
                key={hex + i}
                type="button"
                aria-pressed={i === plainSelected}
                onClick={() => setPlainSelected(i)}
                className={chipClass(i === plainSelected)}
              >
                <span className="size-4 rounded-full border border-border" style={{ backgroundColor: hex }} />
                {product.colorNames?.[i] ?? hex}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <p className="mb-2 text-sm font-extrabold text-foreground">
          Pilih pilihan order: <span className="font-normal text-muted-foreground">{customizationOptions.find((o) => o.value === customization)?.label ?? ""}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {customizationOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={customization === option.value}
              onClick={() => setCustomization(option.value)}
              className={chipClass(customization === option.value)}
            >
              {option.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="tp-name" className="mb-2 block text-sm font-extrabold text-foreground">
          Nama ukiran <span className="font-normal text-muted-foreground">(khusus Quran + Nama)</span>
        </label>
        <input
          id="tp-name"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="opsional"
          maxLength={30}
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary lg:max-w-sm"
        />
      </div>
    </div>
  );
}

/** Phone-only quantity row (desktop has it in the sticky card). */
export function TokopediaMobileQuantity({ product }: { product: Product }) {
  const { quantity, setQuantity, maxQty } = usePurchaseState();
  return (
    <div className="flex items-center justify-between gap-3 lg:hidden">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-extrabold text-foreground">Atur jumlah</span>
        <StockNote />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Subtotal <strong className="font-extrabold text-foreground">{formatIDR(product.price * quantity)}</strong></span>
        <Stepper value={quantity} onChange={setQuantity} max={maxQty} />
      </div>
    </div>
  );
}

function ShareButton({ title }: { title: string }) {
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link produk disalin");
      }
    } catch {
      /* user dismissed the share sheet */
    }
  }
  return (
    <button type="button" onClick={share} className="flex items-center gap-1.5 hover:text-primary">
      <Share2 className="size-4" /> Share
    </button>
  );
}

/** The sticky "Atur jumlah dan catatan" card (desktop only). */
export function TokopediaPurchaseCard({ product }: { product: Product }) {
  const { allSoldOut, quantity, setQuantity, maxQty, handleAddToCart, handleBuyNow } = usePurchaseState();
  const { selectedImage, selectedVariantId } = useProductMedia();
  const [wished, setWished] = useState(false);
  const selectedColor = product.colorVariants?.find((v) => v.variantId === selectedVariantId);
  const label = selectedColor?.name ?? (product.colorVariants?.length ? "Pilih warna terlebih dahulu" : product.name);

  return (
    <aside className="hidden rounded-lg border border-border bg-background p-4 shadow-[0_1px_6px_rgba(141,150,170,0.3)] lg:block">
      <h2 className="text-sm font-extrabold text-foreground">Atur jumlah dan catatan</h2>

      <div className="mt-3 flex items-center gap-3">
        <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-secondary">
          {selectedImage && <Image src={selectedImage} alt="" fill sizes="40px" className="object-cover" />}
        </span>
        <p className="line-clamp-2 text-sm text-foreground">{label}</p>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <Stepper value={quantity} onChange={setQuantity} max={maxQty} />
        <StockNote />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Subtotal</span>
        <span className="text-lg font-extrabold text-foreground">{formatIDR(product.price * quantity)}</span>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={allSoldOut}
          className="h-10 rounded-lg bg-primary text-sm font-extrabold text-primary-foreground transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-muted-foreground/30"
        >
          + Keranjang
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={allSoldOut}
          className="h-10 rounded-lg border border-primary text-sm font-extrabold text-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground"
        >
          {allSoldOut ? "Stok Habis" : "Beli Langsung"}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs font-bold text-foreground">
        <Link
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-primary"
        >
          <MessageCircle className="size-4" /> Chat
        </Link>
        <span className="h-4 w-px bg-border" />
        <button type="button" onClick={() => setWished((w) => !w)} className="flex items-center gap-1.5 hover:text-primary">
          <Heart className={`size-4 ${wished ? "fill-[#F94D63] text-[#F94D63]" : ""}`} /> Wishlist
        </button>
        <span className="h-4 w-px bg-border" />
        <ShareButton title={product.name} />
      </div>
    </aside>
  );
}

/** Fixed bottom bar for phones and tablets: chat | Beli Langsung | + Keranjang. */
export function TokopediaMobileBar() {
  const { allSoldOut, handleAddToCart, handleBuyNow } = usePurchaseState();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 bg-background px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-1px_6px_rgba(141,150,170,0.4)] lg:hidden">
      <Link
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
        className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-input text-foreground"
      >
        <MessageCircle className="size-5" />
      </Link>
      <button
        type="button"
        onClick={handleBuyNow}
        disabled={allSoldOut}
        className="h-11 flex-1 rounded-lg border border-primary text-sm font-extrabold text-primary disabled:border-border disabled:text-muted-foreground"
      >
        {allSoldOut ? "Stok Habis" : "Beli Langsung"}
      </button>
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={allSoldOut}
        className="h-11 flex-1 rounded-lg bg-primary text-sm font-extrabold text-primary-foreground disabled:bg-muted-foreground/30"
      >
        + Keranjang
      </button>
    </div>
  );
}
