import type { Metadata } from "next";
import { SearchPageContent } from "@/components/search/SearchPageContent";

export const metadata: Metadata = {
  title: "Pencarian",
};

export default async function PencarianPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const initialQuery = (Array.isArray(q) ? q[0] : q) ?? "";
  return <SearchPageContent initialQuery={initialQuery} />;
}
