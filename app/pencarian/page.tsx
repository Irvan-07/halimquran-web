import type { Metadata } from "next";
import { SearchPageContent } from "@/components/search/SearchPageContent";

export const metadata: Metadata = {
  title: "Pencarian",
};

export default function PencarianPage() {
  return <SearchPageContent />;
}
