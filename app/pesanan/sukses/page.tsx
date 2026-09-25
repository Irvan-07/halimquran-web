import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Pesanan Berhasil",
};

export default function PesananSuksesPage() {
  return (
    <PagePlaceholder
      title="Pesanan Berhasil"
      description="Halaman konfirmasi pesanan masih dalam pengembangan."
    />
  );
}
