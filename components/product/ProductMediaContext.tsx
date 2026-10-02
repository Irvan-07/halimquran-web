"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { scalevStorefront } from "@/lib/scalev/storefront-client";
import type { ScalevVariantAvailability } from "@/types/scalev";
import type { Product } from "@/types/product";

// Shared "which image is showing" state between ProductGallery (top of
// the page) and ProductColorPicker (the "Warna" section, which on the
// live site sits below the price — a different spot in the DOM, but
// selecting a color there still swaps the gallery's main image above).
// Holds the image URL itself, not an index: the gallery thumbnails and
// the color swatches are two different photo sets, so an index into one
// wouldn't make sense for the other.
interface ProductMediaState {
  gallery: string[];
  selectedImage: string;
  setSelectedImage: (src: string) => void;
  /** Scalev variant id of the color the buyer picked in the "Warna" section (null until they pick one). */
  selectedVariantId: number | null;
  setSelectedVariantId: (id: number | null) => void;
  /** Live Scalev stock per variant id. A variant missing here means "not loaded yet" (treated as buyable). */
  availability: Record<number, ScalevVariantAvailability>;
}

const ProductMediaContext = createContext<ProductMediaState | null>(null);

export function ProductMediaProvider({
  product,
  children,
}: {
  product: Product;
  children: ReactNode;
}) {
  const gallery =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : (product.colorVariants?.map((v) => v.imageUrl) ?? (product.imageUrl ? [product.imageUrl] : []));
  const [selectedImage, setSelectedImage] = useState(gallery[0] ?? product.imageUrl ?? "");
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [availability, setAvailability] = useState<Record<number, ScalevVariantAvailability>>({});

  useEffect(() => {
    const ids = product.colorVariants?.length
      ? product.colorVariants.map((v) => v.variantId).filter((id): id is number => id !== undefined)
      : product.variantId !== undefined
        ? [product.variantId]
        : [];
    let cancelled = false;
    Promise.all(
      ids.map((id) =>
        scalevStorefront.getVariantAvailability(id).catch(() => null),
      ),
    ).then((results) => {
      if (cancelled) return;
      const next: Record<number, ScalevVariantAvailability> = {};
      for (const r of results) if (r) next[r.variant_id] = r;
      setAvailability(next);
    });
    return () => {
      cancelled = true;
    };
  }, [product]);

  return (
    <ProductMediaContext.Provider value={{ gallery, selectedImage, setSelectedImage, selectedVariantId, setSelectedVariantId, availability }}>
      {children}
    </ProductMediaContext.Provider>
  );
}

export function useProductMedia() {
  const ctx = useContext(ProductMediaContext);
  if (!ctx) throw new Error("useProductMedia must be used within ProductMediaProvider");
  return ctx;
}
