"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { describeCustomerError, scalevCustomer } from "@/lib/scalev/customer-client";

export function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await scalevCustomer.forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(describeCustomerError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-border bg-background p-5">
      <h2 className="text-base font-bold text-foreground">Buat atau atur ulang password</h2>
      {sent ? (
        <p role="status" className="text-sm text-muted-foreground">
          Jika <strong className="text-foreground">{email}</strong> terdaftar, kami sudah mengirim tautan untuk membuat
          password baru. Periksa kotak masuk dan folder spam, lalu buka tautannya.
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Masukkan email yang kamu pakai saat berbelanja. Kami kirim tautan untuk membuat password baru. Cara ini juga
            dipakai kalau kamu belum pernah punya password.
          </p>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="forgot-email">Email</Label>
            <Input
              id="forgot-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" size="lg" disabled={busy} className="h-11">
            {busy ? "Mengirim…" : "Kirim tautan"}
          </Button>
        </form>
      )}
      <button type="button" onClick={onBack} className="text-left text-sm font-medium text-primary hover:underline">
        Kembali ke login
      </button>
    </div>
  );
}
