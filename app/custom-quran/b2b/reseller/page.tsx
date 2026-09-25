import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Custom Quran — Reseller",
};

export default function ResellerPage() {
  return (
    <PagePlaceholder
      title="Reseller"
      description="Halaman Custom Quran untuk reseller masih dalam pengembangan."
    />
  );
}
