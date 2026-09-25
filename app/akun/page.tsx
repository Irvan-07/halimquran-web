import type { Metadata } from "next";
import { AccountPageContent } from "@/components/account/AccountPageContent";

export const metadata: Metadata = {
  title: "Akun Saya",
};

export default function AkunPage() {
  return <AccountPageContent />;
}
