import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Custom Quran — Corporate / UMKM",
};

export default function CorporateUmkmPage() {
  return (
    <PagePlaceholder
      title="Corporate / UMKM"
      description="Halaman Custom Quran untuk corporate dan UMKM masih dalam pengembangan."
    />
  );
}
