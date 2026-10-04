"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { customerAccount } from "@/lib/scalev/customer-session";
import { formatIDR } from "@/lib/utils/format";
import type { CustomerOrder } from "@/types/customer";

// Filter chips from the live halimquran.com /orders page. Scalev's own order
// statuses (draft, pending, confirmed, in_process, ready, shipped, completed,
// canceled, rts, closed + payment_status unpaid/paid) fold into these groups.
const GROUPS = ["Semua status", "Belum Dibayar", "Dikemas", "Dikirim", "Selesai", "Dibatalkan", "Dikembalikan"] as const;
type Group = Exclude<(typeof GROUPS)[number], "Semua status">;

function groupOf(order: CustomerOrder): Group {
  switch (order.status) {
    case "canceled":
    case "closed":
      return "Dibatalkan";
    case "rts":
    case "shipped_rts":
      return "Dikembalikan";
    case "completed":
      return "Selesai";
    case "shipped":
      return "Dikirim";
  }
  // COD is paid at the door, so an unpaid COD order is already being packed.
  const awaitingPayment = order.payment_status === "unpaid" && order.payment_method !== "cod";
  return awaitingPayment ? "Belum Dibayar" : "Dikemas";
}

const GROUP_STYLE: Record<Group, string> = {
  "Belum Dibayar": "bg-amber-100 text-amber-800",
  Dikemas: "bg-primary/10 text-primary",
  Dikirim: "bg-primary/10 text-primary",
  Selesai: "bg-success/15 text-success",
  Dibatalkan: "bg-destructive/10 text-destructive",
  Dikembalikan: "bg-secondary text-muted-foreground",
};

function itemSummary(order: CustomerOrder): string[] {
  const lines = order.orderlines.map((l) => {
    const options = [l.variant_option1_value, l.variant_option2_value, l.variant_option3_value].filter(Boolean);
    return `${l.product_name ?? "Produk"}${options.length ? ` · ${options.join(" / ")}` : ""} × ${l.quantity}`;
  });
  return lines.length > 2 ? [...lines.slice(0, 2), `+${lines.length - 2} produk lainnya`] : lines;
}

export function OrderList() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState<(typeof GROUPS)[number]>("Semua status");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    customerAccount
      .listOrders()
      .then((page) => {
        if (cancelled) return;
        setOrders(page.data);
        setNextCursor(page.has_next ? (page.next_cursor ?? null) : null);
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  async function loadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const page = await customerAccount.listOrders(nextCursor);
      setOrders((prev) => [...prev, ...page.data]);
      setNextCursor(page.has_next ? (page.next_cursor ?? null) : null);
    } catch {
      setState("error");
    } finally {
      setLoadingMore(false);
    }
  }

  if (state === "loading") {
    return <p className="py-10 text-center text-sm text-muted-foreground">Memuat pesanan…</p>;
  }

  if (state === "error") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <p className="text-sm text-muted-foreground">Pesanan belum bisa dimuat. Periksa koneksi lalu coba lagi.</p>
        <Button
          variant="outline"
          onClick={() => {
            setState("loading");
            setAttempt((n) => n + 1);
          }}
        >
          Coba lagi
        </Button>
      </div>
    );
  }

  const visible = filter === "Semua status" ? orders : orders.filter((o) => groupOf(o) === filter);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">Order Saya ({orders.length})</p>
      <div className="flex flex-wrap gap-2">
        {GROUPS.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() => setFilter(group)}
            className={`rounded-full border px-3 py-1 text-xs ${
              filter === group ? "border-primary text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <Package className="size-10 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Tidak ada pesanan</p>
          <p className="text-sm text-muted-foreground">
            {orders.length === 0 ? "Silakan buat pesanan untuk melihatnya disini." : "Tidak ada pesanan dengan status ini."}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {visible.map((order) => {
            const group = groupOf(order);
            return (
              <li key={order.id} className="flex flex-col gap-3 rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{order.order_id}</span>
                    {order.created_at && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("id-ID", { dateStyle: "long" })}
                      </span>
                    )}
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${GROUP_STYLE[group]}`}>{group}</span>
                </div>

                <ul className="flex flex-col gap-0.5 text-sm text-foreground">
                  {itemSummary(order).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                {order.shipment_receipt && (
                  <p className="text-xs text-muted-foreground">
                    No. resi: <strong className="text-foreground">{order.shipment_receipt}</strong>
                  </p>
                )}

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">
                    Total <strong className="text-base text-primary">{formatIDR(Number(order.gross_revenue ?? 0))}</strong>
                  </span>
                  <Button asChild variant={group === "Belum Dibayar" ? "default" : "outline"} size="sm">
                    <Link href={`/o/${order.secret_slug}/success?from=akun`}>
                      {group === "Belum Dibayar" ? "Bayar sekarang" : "Lihat detail"}
                    </Link>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {nextCursor && (
        <Button variant="outline" onClick={loadMore} disabled={loadingMore} className="self-center">
          {loadingMore ? "Memuat…" : "Muat lebih banyak"}
        </Button>
      )}
    </div>
  );
}
