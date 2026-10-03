"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
  /** Hold the photo auto-advance while the pointer is over the main photo. */
  setAutoplayHold: (hold: boolean) => void;
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
  const gallery = useMemo(
    () =>
      product.galleryImages && product.galleryImages.length > 0
        ? product.galleryImages
        : (product.colorVariants?.map((v) => v.imageUrl) ?? (product.imageUrl ? [product.imageUrl] : [])),
    [product],
  );
  const [selectedImage, setSelectedImageRaw] = useState(gallery[0] ?? product.imageUrl ?? "");
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);

  // The photos advance by themselves; anything the shopper does (tapping a
  // thumbnail, swiping, picking a colour) calls this wrapper, which holds
  // the auto-advance for a while — and it stays off once a colour is chosen.
  const pausedUntil = useRef(0);
  const hovering = useRef(false);
  const setSelectedImage = useCallback((src: string) => {
    pausedUntil.current = Date.now() + 10_000;
    setSelectedImageRaw(src);
  }, []);
  const setAutoplayHold = useCallback((hold: boolean) => {
    hovering.current = hold;
  }, []);

  useEffect(() => {
    if (gallery.length < 2 || selectedVariantId !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (hovering.current || document.hidden || Date.now() < pausedUntil.current) return;
      setSelectedImageRaw((cur) => gallery[(gallery.indexOf(cur) + 1) % gallery.length] ?? gallery[0]);
    }, 4500);
    return () => clearInterval(id);
  }, [gallery, selectedVariantId]);
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
    <ProductMediaContext.Provider value={{ gallery, selectedImage, setSelectedImage, selectedVariantId, setSelectedVariantId, setAutoplayHold, availability }}>
      {children}
    </ProductMediaContext.Provider>
  );
}

export function useProductMedia() {
  const ctx = useContext(ProductMediaContext);
  if (!ctx) throw new Error("useProductMedia must be used within ProductMediaProvider");
  return ctx;
}
