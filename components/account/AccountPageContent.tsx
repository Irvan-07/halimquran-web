"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomerAuthProvider, useCustomerAuth } from "./CustomerAuthProvider";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { LoginForm } from "./LoginForm";
import { OrderList } from "./OrderList";

// Hero copy is read from the live halimquran.com /orders page (verified
// 2026-09-17). Login, password reset and the order list are real: they talk to
// Scalev's customer Storefront API (see lib/scalev/customer-*.ts). There is no
// self-signup and no wishlist API on Scalev, so neither is offered here.

function SignedOut() {
  const [view, setView] = useState<"login" | "forgot">("login");

  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-semibold text-foreground">Akun Saya</h1>
        <p className="text-base font-medium text-foreground">Pantau Pesanan Kamu</p>
        <p className="max-w-xl text-sm text-muted-foreground">
          Masuk untuk melihat riwayat dan status pesananmu. Pernah berbelanja di sini? Pakai email yang sama saat
          checkout, lalu pilih &ldquo;Lupa password?&rdquo; untuk membuat password pertamamu.
        </p>
        <div className="mt-2 w-full">
          {view === "login" ? (
            <LoginForm onForgot={() => setView("forgot")} />
          ) : (
            <ForgotPasswordForm onBack={() => setView("login")} />
          )}
        </div>
      </div>
    </section>
  );
}

function SignedIn() {
  const { profile, profileFailed, retryProfile, signOut } = useCustomerAuth();
  const [tab, setTab] = useState<"pesanan" | "profil">("pesanan");

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-2xl font-semibold text-foreground">
              {profile ? `Halo, ${profile.name?.split(" ")[0] || "Kak"}` : "Akun Saya"}
            </h1>
            {profile && <p className="text-sm text-muted-foreground">{profile.email}</p>}
            {profileFailed && (
              <p className="text-sm text-muted-foreground">
                Data akun belum bisa dimuat.{" "}
                <button type="button" onClick={retryProfile} className="font-medium text-primary hover:underline">
                  Coba lagi
                </button>
              </p>
            )}
          </div>
          <Button variant="outline" onClick={() => void signOut()}>
            Keluar
          </Button>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-6 border-b border-border">
          {(
            [
              ["pesanan", "Pesanan"],
              ["profil", "Profil"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`border-b-2 pb-2 text-sm font-medium ${
                tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "pesanan" ? (
          <OrderList />
        ) : (
          <dl className="grid max-w-md grid-cols-[7rem_1fr] gap-x-4 gap-y-3 text-sm">
            <dt className="text-muted-foreground">Nama</dt>
            <dd className="text-foreground">{profile?.name || "—"}</dd>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="text-foreground">{profile?.email ?? "—"}</dd>
            <dt className="text-muted-foreground">No. HP</dt>
            <dd className="text-foreground">{profile?.phone || "—"}</dd>
            <dd className="col-span-2 pt-2 text-xs text-muted-foreground">
              Untuk mengganti password, keluar lalu pilih &ldquo;Lupa password?&rdquo; di halaman login.
            </dd>
          </dl>
        )}
      </div>
    </div>
  );
}

function AccountView() {
  const { status } = useCustomerAuth();
  if (status === "loading") {
    return <div className="mx-auto max-w-4xl px-4 py-24 text-center text-sm text-muted-foreground">Memuat…</div>;
  }
  return status === "signedIn" ? <SignedIn /> : <SignedOut />;
}

export function AccountPageContent() {
  return (
    <CustomerAuthProvider>
      <AccountView />
    </CustomerAuthProvider>
  );
}
