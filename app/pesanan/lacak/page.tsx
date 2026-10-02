import type { Metadata } from "next";
import { TrackOrderForm } from "@/components/checkout/TrackOrderForm";

export const metadata: Metadata = {
  title: "Lacak Pesanan",
};

export default function PesananLacakPage() {
  return <TrackOrderForm />;
}
