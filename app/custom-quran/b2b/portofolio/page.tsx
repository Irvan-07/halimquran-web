import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Portofolio — Custom Quran B2B",
};

export default function PortofolioPage() {
  return (
    <PagePlaceholder
      title="Portofolio"
      description="Contoh proyek Custom Quran untuk institusi masih dalam pengembangan."
    />
  );
}
