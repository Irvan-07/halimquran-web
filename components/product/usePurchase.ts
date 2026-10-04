"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "@/components/cart/CartProvider";
import { useProductMedia } from "@/components/product/ProductMediaContext";
import { track } from "@/lib/analytics";
import type { Product } from "@/types/product";
import type { CustomizationOption } from "@/types/cart";

export const WHATSAPP_NUMBER = "6281128018990";

export const customizationOptions: { value: CustomizationOption; label: string }[] = [
  { value: "quran-saja", label: "Quran Saja" },
  { value: "quran-nama", label: "Quran + Nama" },
  { value: "quran-nama-box", label: "Quran + Nama + Box" },
];

/**
 * The buying logic of a product page — option/name/quantity state, stock
 * limits, validation, add-to-cart and buy-now — with no markup, so every
 * theme can lay the controls out its own way (see PurchasePanel for the
 * default look, themes/shopee/PurchaseBox for the marketplace one).
 */
export function usePurchase(product: Product) {
  const router = useRouter();
  const { addItem } = useCart();
  const { selectedVariantId, availability } = useProductMedia();
  const hasColorChoice = (product.colorVariants?.length ?? 0) > 0;
  const selectedColor = product.colorVariants?.find((v) => v.variantId === selectedVariantId);
  const buyableVariantIds = hasColorChoice
    ? (product.colorVariants ?? []).map((v) => v.variantId)
    : [product.variantId];
  // A product that has no Scalev variant yet (its page content is ready but
  // the product isn't created in Scalev) can't be bought: checkout refuses
  // cart lines without a variant id. It is shown, but as unavailable.
  const linkedToScalev = buyableVariantIds.some((id) => id !== undefined);
  const allSoldOut =
    !linkedToScalev ||
    (buyableVariantIds.length > 0 &&
      buyableVariantIds.every((id) => id !== undefined && availability[id]?.available === false));
  const activeVariantId = hasColorChoice ? selectedColor?.variantId : product.variantId;
  const activeStock = activeVariantId !== undefined ? availability[activeVariantId] : undefined;
  const maxQty = Math.min(20, activeStock?.available_qty ?? 20);
  const [customization, setCustomization] = useState<CustomizationOption | null>(null);
  const [customName, setCustomName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const needsName = customization !== null && customization !== "quran-saja";

  function buildCartLine(selected: CustomizationOption) {
    return {
      productId: product.id,
      slug: product.slug,
      variantId: hasColorChoice ? selectedColor?.variantId : product.variantId,
      colorName: selectedColor?.name,
      category: product.category,
      name: product.name,
      price: product.price,
      size: product.size,
      customization: selected,
      customName: needsName ? customName.trim() : undefined,
      quantity,
    };
  }

  function validate(): boolean {
    if (allSoldOut) {
      toast.error("Stok produk ini sedang habis");
      return false;
    }
    if (hasColorChoice && !selectedColor) {
      toast.error("Pilih warna terlebih dahulu");
      return false;
    }
    if (!customization) {
      toast.error("Pilih salah satu opsi terlebih dahulu");
      return false;
    }
    if (activeStock && quantity > (activeStock.available_qty ?? Infinity)) {
      toast.error(`Stok tersisa ${activeStock.available_qty}`);
      return false;
    }
    if (needsName && customName.trim().length === 0) {
      toast.error("Isi nama untuk diukir terlebih dahulu");
      return false;
    }
    return true;
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
    if (!validate()) return;
    addItem(buildCartLine(customization!));
    trackAddToCart();
    toast.success("Ditambahkan ke keranjang", { description: product.name });
  }

  function handleBuyNow() {
    if (!validate()) return;
    addItem(buildCartLine(customization!));
    trackAddToCart();
    router.push("/keranjang");
  }

  return {
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
  };
}
