export type CustomizationOption = "quran-saja" | "quran-nama" | "quran-nama-box";

export interface CartItem {
  /** Unique per cart line (product + customization + name combo). */
  cartItemId: string;
  productId: string;
  slug: string;
  /** Scalev variant to buy — absent only when the catalog fell back to mock data (Scalev unreachable). */
  variantId?: number;
  /** Human-readable color name for the chosen variant. */
  colorName?: string;
  category: string;
  name: string;
  price: number;
  size?: string;
  customization: CustomizationOption;
  customName?: string;
  quantity: number;
}
