import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Custom Quran — Sekolah / Pesantren",
};

export default function SekolahPesantrenPage() {
  return (
    <PagePlaceholder
      title="Sekolah / Pesantren"
      description="Halaman Custom Quran untuk sekolah dan pesantren masih dalam pengembangan."
    />
  );
}
