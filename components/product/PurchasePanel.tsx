"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/components/cart/CartProvider";
import { track } from "@/lib/analytics";
import type { Product } from "@/types/product";
import type { CustomizationOption } from "@/types/cart";
import { formatIDR } from "@/lib/utils/format";

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
        <Label className="mb-2 block text-sm font-medium text-foreground">
          Personalisasi
        </Label>
        <RadioGroup
          value={customization}
          onValueChange={(v) => setCustomization(v as CustomizationOption)}
          className="flex flex-col gap-2"
        >
          {customizationOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {needsName && (
          <div className="mt-3">
            <Label htmlFor="custom-name" className="mb-1.5 block text-sm">
              Nama untuk diukir
            </Label>
            <Input
              id="custom-name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Tulis nama sesuai keinginan"
              maxLength={30}
            />
          </div>
        )}
      </div>

      <div>
        <Label className="mb-2 block text-sm font-medium text-foreground">
          Jumlah
        </Label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Kurangi jumlah"
          >
            <Minus className="size-4" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">
            {quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            aria-label="Tambah jumlah"
          >
            <Plus className="size-4" />
          </Button>
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

      {/* Mobile sticky purchase bar — matches the real halimquran.com PDP pattern. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-background p-3 sm:hidden">
        <span className="text-base font-semibold text-primary">
          {formatIDR(product.price * quantity)}
        </span>
        <Button onClick={handleBuyNow} className="max-w-[220px] flex-1">
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
}
