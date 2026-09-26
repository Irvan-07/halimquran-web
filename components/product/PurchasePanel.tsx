"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/cart/CartProvider";
import { track } from "@/lib/analytics";
import type { Product } from "@/types/product";
import type { CustomizationOption } from "@/types/cart";

const WHATSAPP_NUMBER = "6281128018990";

const customizationOptions: { value: CustomizationOption; label: string }[] = [
  { value: "quran-saja", label: "Quran Saja" },
  { value: "quran-nama", label: "Quran + Nama" },
  { value: "quran-nama-box", label: "Quran + Nama + Box" },
];

interface PurchasePanelProps {
  product: Product;
}

export function PurchasePanel({ product }: PurchasePanelProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [customization, setCustomization] =
    useState<CustomizationOption>("quran-saja");
  const [customName, setCustomName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const needsName = customization !== "quran-saja";
  const canSubmit = !needsName || customName.trim().length > 0;

  function buildCartLine() {
    return {
      productId: product.id,
      slug: product.slug,
      category: product.category,
      name: product.name,
      price: product.price,
      size: product.size,
      customization,
      customName: needsName ? customName.trim() : undefined,
      quantity,
    };
  }

  function trackAddToCart() {
    track({
      name: "add_to_cart",
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity,
        },
      ],
    });
  }

  function handleAddToCart() {
    if (!canSubmit) {
      toast.error("Isi nama untuk diukir terlebih dahulu");
      return;
    }
    addItem(buildCartLine());
    trackAddToCart();
    toast.success("Ditambahkan ke keranjang", { description: product.name });
  }

  function handleBuyNow() {
    if (!canSubmit) {
      toast.error("Isi nama untuk diukir terlebih dahulu");
      return;
    }
    addItem(buildCartLine());
    trackAddToCart();
    router.push("/keranjang");
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label className="mb-2 block text-base font-bold uppercase text-foreground">
          Pilihan Tambahan
        </Label>
        <div className="flex gap-2">
          {customizationOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setCustomization(option.value)}
              className={`flex-1 whitespace-nowrap rounded-full border px-2 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                customization === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary"
              }`}
            >
              {option.label.toUpperCase()}
            </button>
          ))}
        </div>
        {needsName && (
          <div className="mt-3">
            <Label htmlFor="custom-name" className="mb-1.5 block text-base font-bold text-foreground">
              Nama Ukiran (khusus Quran + Nama)
            </Label>
            <Input
              id="custom-name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="opsional"
              maxLength={30}
              className="rounded-full px-4"
            />
          </div>
        )}
      </div>

      <div>
        <Label className="mb-2 block text-base font-bold uppercase text-foreground">
          Jumlah
        </Label>
        <div className="inline-flex items-center divide-x divide-border rounded-full border border-input">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Kurangi jumlah"
            className="flex size-11 items-center justify-center text-primary"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center text-base font-medium text-foreground">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            aria-label="Tambah jumlah"
            className="flex size-11 items-center justify-center text-primary"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      <div className="hidden gap-3 sm:flex">
        <Button variant="outline" className="flex-1" onClick={handleAddToCart}>
          Tambah ke Keranjang
        </Button>
        <Button className="flex-1" onClick={handleBuyNow}>
          Beli Sekarang
        </Button>
      </div>

      {/* Mobile sticky purchase bar — matches the real halimquran.com PDP:
          "Tambah Ke Keranjang" (not "Beli Sekarang") + a WhatsApp button,
          no price repeated here. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background p-3 sm:hidden">
        <Button onClick={handleAddToCart} className="flex-1 rounded-full">
          Tambah Ke Keranjang
        </Button>
        <Link
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat via WhatsApp"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.001 2c-5.522 0-10 4.477-10 10 0 1.766.462 3.492 1.34 5.008L2 22l5.13-1.317A9.958 9.958 0 0 0 12 22c5.523 0 10-4.477 10-10S17.524 2 12.001 2zm0 18.333a8.29 8.29 0 0 1-4.223-1.156l-.303-.18-3.146.807.84-3.068-.198-.315A8.293 8.293 0 0 1 3.667 12c0-4.595 3.738-8.333 8.334-8.333 4.595 0 8.333 3.738 8.333 8.333 0 4.596-3.738 8.333-8.333 8.333z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
