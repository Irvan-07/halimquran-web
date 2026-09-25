import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Tentang Kami",
};

export default function TentangKamiPage() {
  return (
    <PagePlaceholder
      title="Tentang Halim Quran"
      description="Halaman Tentang Kami masih dalam pengembangan."
    />
  );
}
