"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Also accepts the order link/code the buyer received (…/o/CODE/success):
// the public order page is addressed by that secret code, so when it's
// pasted we can go straight there without a phone check.
function extractSlug(input: string): string | null {
  const t = input.trim();
  const m = t.match(/\/o\/([A-Za-z0-9]{20,})/) ?? t.match(/^([A-Za-z0-9]{20,})$/);
  return m ? m[1] : null;
}

export function TrackOrderForm() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const slug = extractSlug(orderId);
    if (slug) {
      router.push(`/o/${slug}/success`);
      return;
    }
    if (!phone.trim()) {
      setError("Isi nomor telepon yang dipakai saat memesan.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/pesanan/lacak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, phone }),
      });
      const data = (await res.json()) as { slug?: string; error?: string };
      if (!res.ok || !data.slug) {
        setError(data.error ?? "Pesanan tidak ditemukan.");
        setLoading(false);
        return;
      }
      router.push(`/o/${data.slug}/success`);
    } catch {
      setError("Gagal menghubungi server, coba lagi.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-4 px-4 py-12 sm:px-6">
      <h1 className="font-heading text-2xl font-semibold text-foreground">Lacak Pesanan</h1>
      <p className="text-sm text-muted-foreground">
        Masukkan nomor pesanan (mis. <code>261002QKOVIWM</code>) dan nomor telepon yang dipakai saat memesan,
        untuk melihat status dan nomor resi.
      </p>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-id">Nomor pesanan atau tautan pesanan</Label>
        <Input
          id="order-id"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="261002QKOVIWM"
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-phone">No. telepon / WhatsApp</Label>
        <Input
          id="order-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="08123456789"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={!orderId.trim() || loading}>
        {loading ? "Mencari…" : "Lacak"}
      </Button>
    </form>
  );
}
