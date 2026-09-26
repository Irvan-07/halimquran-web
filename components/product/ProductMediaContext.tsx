"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
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

  return (
    <ProductMediaContext.Provider value={{ gallery, selectedImage, setSelectedImage }}>
      {children}
    </ProductMediaContext.Provider>
  );
}

export function useProductMedia() {
  const ctx = useContext(ProductMediaContext);
  if (!ctx) throw new Error("useProductMedia must be used within ProductMediaProvider");
  return ctx;
}
