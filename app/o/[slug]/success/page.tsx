import type { Metadata } from "next";
import { OrderStatus } from "@/components/checkout/OrderStatus";

export const metadata: Metadata = {
  title: "Pesanan Berhasil",
  robots: { index: false },
};

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <OrderStatus secretSlug={slug} />;
}
