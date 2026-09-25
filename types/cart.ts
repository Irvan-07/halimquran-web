export type CustomizationOption = "quran-saja" | "quran-nama" | "quran-nama-box";

export interface CartItem {
  /** Unique per cart line (product + customization + name combo). */
  cartItemId: string;
  productId: string;
  slug: string;
  category: string;
  name: string;
  price: number;
  size?: string;
  customization: CustomizationOption;
  customName?: string;
  quantity: number;
}
