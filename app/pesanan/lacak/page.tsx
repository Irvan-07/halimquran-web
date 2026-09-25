import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Lacak Pesanan",
};

export default function PesananLacakPage() {
  return (
    <PagePlaceholder
      title="Lacak Pesanan"
      description="Halaman pelacakan pesanan masih dalam pengembangan."
    />
  );
}
