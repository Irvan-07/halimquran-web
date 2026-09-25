import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <PagePlaceholder
      title="Checkout"
      description="Halaman ini hanya menjadi titik serah-terima ke Scalev Checkout — belum diimplementasikan pada fase fondasi ini."
    />
  );
}
