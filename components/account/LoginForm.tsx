"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { describeCustomerError } from "@/lib/scalev/customer-client";
import { useCustomerAuth } from "./CustomerAuthProvider";

export function LoginForm({ onForgot }: { onForgot: () => void }) {
  const { signIn, verifyOtp } = useCustomerAuth();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      if (step === "credentials") {
        const next = await signIn(email.trim(), password);
        if (next === "otp") setStep("otp");
      } else {
        await verifyOtp(email.trim(), otp.trim());
      }
      // On success the stored session changes and the page swaps to the account view.
    } catch (err) {
      setError(describeCustomerError(err, "login"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-border bg-background p-5">
      {step === "credentials" ? (
        <>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="login-otp">Kode verifikasi</Label>
          <p className="text-sm text-muted-foreground">
            Kami mengirim kode ke <strong className="text-foreground">{email}</strong>. Masukkan kodenya di sini.
          </p>
          <Input
            id="login-otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="h-11 tracking-widest"
          />
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={busy} className="h-11">
        {busy ? "Memproses…" : step === "credentials" ? "Login" : "Verifikasi"}
      </Button>

      {step === "credentials" ? (
        <button type="button" onClick={onForgot} className="text-sm font-medium text-primary hover:underline">
          Lupa password?
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setStep("credentials");
            setOtp("");
            setError(null);
          }}
          className="text-sm font-medium text-primary hover:underline"
        >
          Kembali
        </button>
      )}
    </form>
  );
}
