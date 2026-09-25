"use client";

import { useState } from "react";
import { Heart, Package } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Copy, tabs, and order-status filters below are read directly from the
// live halimquran.com /orders page (verified 2026-09-17), shown there even
// to a signed-out visitor. Login/Daftar are deliberately NOT real forms —
// there's no auth backend yet (Scalev), and a form that looks like it logs
// you in but doesn't would be misleading. Clicking them explains why.
const orderStatuses = [
  "Semua status",
  "Belum Dibayar",
  "Dikemas",
  "Dikirim",
  "Selesai",
  "Dibatalkan",
  "Dikembalikan",
];

function notReadyToast() {
  toast.info("Fitur ini menunggu integrasi Scalev", {
    description: "Login dan akun pelanggan belum tersedia di fase fondasi ini.",
  });
}

export function AccountPageContent() {
  const [tab, setTab] = useState<"pesanan" | "wishlist">("pesanan");
  const [statusFilter, setStatusFilter] = useState("Semua status");

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Akun Saya
          </h1>
          <p className="text-base font-medium text-foreground">
            Nikmati Diskon Spesial dan Pantau Pesanan Kamu
          </p>
          <p className="max-w-xl text-sm text-muted-foreground">
            Dapatkan diskon eksklusif sambil melacak pesanan dan percakapan
            kamu dengan mudah. Tetap terhubung dengan kami dan selalu tahu
            perkembangan pembelian kamu, semua dalam satu platform.
          </p>
          <div className="flex gap-3">
            <Button onClick={notReadyToast}>Login</Button>
            <Button variant="outline" onClick={notReadyToast}>
              Daftar
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-6 border-b border-border">
          {(["pesanan", "wishlist"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`border-b-2 pb-2 text-sm font-medium capitalize ${
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "pesanan" ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">Order Saya (0)</p>
            <div className="flex flex-wrap gap-2">
              {orderStatuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    statusFilter === status
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Package className="size-10 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                Tidak ada pesanan
              </p>
              <p className="text-sm text-muted-foreground">
                Silakan buat pesanan untuk melihatnya disini.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <Heart className="size-10 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">
              Wishlist kosong
            </p>
            <p className="text-sm text-muted-foreground">
              Belum ada produk yang disimpan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
