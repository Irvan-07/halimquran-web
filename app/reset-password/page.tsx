import { Suspense } from "react";
import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/account/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Buat Password Baru",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
