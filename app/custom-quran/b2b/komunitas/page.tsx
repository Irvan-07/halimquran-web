import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Custom Quran — Komunitas",
};

export default function KomunitasPage() {
  return (
    <PagePlaceholder
      title="Komunitas"
      description="Halaman Custom Quran untuk komunitas masih dalam pengembangan."
    />
  );
}
