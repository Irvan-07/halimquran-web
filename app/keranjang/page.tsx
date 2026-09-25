import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Keranjang",
};

export default function KeranjangPage() {
  return <CartPageContent />;
}
