"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { describeCustomerError, scalevCustomer } from "@/lib/scalev/customer-client";

const MIN_LENGTH = 8;

// Landing page of the link in Scalev's "password reset" email:
// {our origin}/reset-password?token=...
export function ResetPasswordForm() {
  const token = useSearchParams().get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (busy || !token) return;
    if (password.length < MIN_LENGTH) {
      setError(`Password minimal ${MIN_LENGTH} karakter.`);
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await scalevCustomer.savePassword(token, password);
      setDone(true);
    } catch (err) {
      setError(describeCustomerError(err, "reset"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-16 sm:px-6">
      <h1 className="font-heading text-2xl font-semibold text-foreground">Buat Password Baru</h1>

      {!token ? (
        <>
          <p className="text-sm text-muted-foreground">
            Tautan ini tidak lengkap. Minta tautan baru lewat &ldquo;Lupa password?&rdquo; di halaman Akun.
          </p>
          <Button asChild>
            <Link href="/akun">Ke halaman Akun</Link>
          </Button>
        </>
      ) : done ? (
        <>
          <p role="status" className="text-sm text-muted-foreground">
            Password baru sudah tersimpan. Sekarang kamu bisa login.
          </p>
          <Button asChild>
            <Link href="/akun">Login</Link>
          </Button>
        </>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-password">Password baru</Label>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={MIN_LENGTH}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
            />
            <span className="text-xs text-muted-foreground">Minimal {MIN_LENGTH} karakter.</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm-password">Ulangi password baru</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="h-11"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" size="lg" disabled={busy} className="h-11">
            {busy ? "Menyimpan…" : "Simpan password"}
          </Button>
        </form>
      )}
    </div>
  );
}
