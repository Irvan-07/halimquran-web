import type { Metadata } from "next";
import { OrderStatus } from "@/components/checkout/OrderStatus";

export const metadata: Metadata = {
  title: "Pesanan Berhasil",
  robots: { index: false },
};

export default async function OrderSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { slug } = await params;
  const { from } = await searchParams;
  return <OrderStatus secretSlug={slug} fromAccount={from === "akun"} />;
}
