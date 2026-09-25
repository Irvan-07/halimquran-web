import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Custom Quran — Yayasan",
};

export default function YayasanPage() {
  return (
    <PagePlaceholder
      title="Yayasan"
      description="Halaman Custom Quran untuk yayasan masih dalam pengembangan."
    />
  );
}
