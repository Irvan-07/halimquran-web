"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { scalevStorefront } from "@/lib/scalev/storefront-client";
import { formatIDR } from "@/lib/utils/format";
import type { ScalevPublicOrder } from "@/types/scalev";

interface OrderDetail
  extends Omit<ScalevPublicOrder, "gross_revenue" | "shipping_cost" | "store" | "orderlines"> {
  gross_revenue: number | string;
  shipping_cost: number | string;
  payment_expiration_at?: string | null;
  handler_phone?: string;
  chat_message?: string;
  pg_payment_info?: Record<string, unknown>;
  unique_code_discount?: string | number;
  store?: {
    payment_accounts?: {
      account_holder: string;
      account_number: string;
      method: string;
      financial_entity?: { name: string };
    }[];
  };
  orderlines: { quantity: number; product_name: string; variant_price: string | number }[];
  courier_service?: { name: string; courier?: { name: string } };
}

const statusLabel: Record<string, string> = {
  unpaid: "Menunggu pembayaran",
  paid: "Sudah dibayar",
  settled: "Sudah dibayar",
};

function paymentLinks(info: Record<string, unknown> | undefined): { label: string; url: string }[] {
  if (!info) return [];
  return Object.entries(info)
    .filter(([, v]) => typeof v === "string" && /^https?:\/\//.test(v as string))
    .map(([k, v]) => ({ label: k.replace(/_/g, " "), url: v as string }));
}

export function OrderStatus({ secretSlug }: { secretSlug: string }) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const first = (await scalevStorefront.getOrder(secretSlug)) as OrderDetail;
        if (cancelled) return;
        setOrder(first);
        if (first.payment_status === "unpaid" && first.payment_method !== "bank_transfer") {
          // Idempotent: creates (or reuses) the gateway payment for e-payment methods.
          await scalevStorefront.createOrderPayment(secretSlug).catch(() => null);
          const refreshed = (await scalevStorefront.getOrder(secretSlug)) as OrderDetail;
          if (!cancelled) setOrder(refreshed);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Gagal memuat pesanan.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [secretSlug]);

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">Pesanan tidak ditemukan</h1>
        <p className="mt-2 text-sm text-muted-foreground">Periksa kembali tautan pesanan Anda.</p>
        <Button asChild className="mt-6">
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    );
  }

  if (!order) {
    return <div className="mx-auto max-w-xl px-4 py-24 text-center text-sm text-muted-foreground">Memuat pesanan…</div>;
  }

  const total = Number(order.gross_revenue);
  const account = order.store?.payment_accounts?.find((a) => a.method === "bank_transfer");
  const links = paymentLinks(order.pg_payment_info);
  const unpaid = order.payment_status === "unpaid";
  const whatsapp = order.handler_phone
    ? `https://wa.me/${order.handler_phone}?text=${order.chat_message ?? ""}`
    : null;

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-10 sm:px-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Terima kasih, pesanan diterima</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          No. pesanan <strong className="text-foreground">{order.order_id}</strong> ·{" "}
          {statusLabel[order.payment_status] ?? order.payment_status}
        </p>
      </div>

      {unpaid && (
        <section className="flex flex-col gap-3 rounded-lg border border-primary/30 bg-secondary p-4 text-sm">
          <h2 className="text-base font-bold text-foreground">Cara Pembayaran</h2>
          <p>
            Total yang harus dibayar:{" "}
            <strong className="text-lg text-primary">{formatIDR(total)}</strong>
          </p>
          {order.payment_method === "bank_transfer" && account ? (
            <div className="flex flex-col gap-1">
              <span>Transfer tepat sesuai nominal ke:</span>
              <strong>
                {account.financial_entity?.name ?? "Bank"} · {account.account_number}
              </strong>
              <span className="text-muted-foreground">a.n. {account.account_holder}</span>
            </div>
          ) : order.payment_method === "cod" ? (
            <p>Bayar tunai ke kurir saat pesanan tiba.</p>
          ) : typeof order.pg_payment_info?.qr_string === "string" ? (
            <div className="flex flex-col items-center gap-2 rounded-md bg-white p-4">
              <QRCodeSVG value={order.pg_payment_info.qr_string} size={220} marginSize={2} />
              <span className="text-center text-xs text-muted-foreground">
                Scan dengan aplikasi bank atau e-wallet apa pun yang mendukung QRIS.
              </span>
            </div>
          ) : links.length > 0 ? (
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <Button key={l.url} asChild>
                  <a href={l.url}>Lanjut bayar ({l.label})</a>
                </Button>
              ))}
            </div>
          ) : order.public_order_url ? (
            <Button asChild>
              <a href={order.public_order_url}>Buka halaman pembayaran</a>
            </Button>
          ) : null}
          {order.payment_expiration_at && (
            <p className="text-xs text-muted-foreground">
              Bayar sebelum{" "}
              {new Date(order.payment_expiration_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}
            </p>
          )}
        </section>
      )}

      <section className="flex flex-col gap-2 rounded-lg border border-border p-4 text-sm">
        <h2 className="text-base font-bold text-foreground">Rincian Pesanan</h2>
        {order.orderlines.map((l, i) => (
          <div key={i} className="flex justify-between gap-3">
            <span className="text-muted-foreground">
              {l.quantity}x {l.product_name}
            </span>
            <span>{formatIDR(Number(l.variant_price) * l.quantity)}</span>
          </div>
        ))}
        {order.courier_service && (
          <div className="flex justify-between border-t border-border pt-2">
            <span className="text-muted-foreground">
              Pengiriman ({order.courier_service.courier?.name} {order.courier_service.name})
            </span>
            <span>{formatIDR(Number(order.shipping_cost))}</span>
          </div>
        )}
        {Number(order.unique_code_discount) > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Potongan kode unik transfer</span>
            <span>-{formatIDR(Number(order.unique_code_discount))}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-border pt-2 font-semibold">
          <span>Total</span>
          <span>{formatIDR(total)}</span>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        {whatsapp && (
          <Button asChild variant="outline" className="flex-1">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              Konfirmasi via WhatsApp
            </a>
          </Button>
        )}
        <Button asChild className="flex-1">
          <Link href="/produk">Lanjut Belanja</Link>
        </Button>
      </div>
    </div>
  );
}
