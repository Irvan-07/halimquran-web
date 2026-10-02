"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/components/cart/CartProvider";
import { scalevStorefront } from "@/lib/scalev/storefront-client";
import { formatIDR } from "@/lib/utils/format";
import type { CartItem, CustomizationOption } from "@/types/cart";
import type {
  ScalevCheckoutSummary,
  ScalevShippingOption,
  ScalevStorefrontLocation,
  ScalevStorefrontPaymentMethod,
} from "@/types/scalev";

const customizationLabels: Record<CustomizationOption, string> = {
  "quran-saja": "Quran Saja",
  "quran-nama": "Quran + Nama",
  "quran-nama-box": "Quran + Nama + Box",
};

function buildNotes(items: CartItem[], extra: string): string {
  const lines = items.map((item) => {
    const parts = [
      `${item.quantity}x ${item.name}`,
      item.colorName ? `warna ${item.colorName}` : null,
      customizationLabels[item.customization],
      item.customName ? `nama ukiran: "${item.customName}"` : null,
    ].filter(Boolean);
    return parts.join(" | ");
  });
  return [...lines, extra.trim() ? `Catatan pembeli: ${extra.trim()}` : null]
    .filter(Boolean)
    .join("\n");
}

function errorMessage(e: unknown): string {
  const raw = e instanceof Error ? e.message : "";
  if (/out of stock/i.test(raw)) {
    return "Ada produk di keranjang yang stoknya habis. Hapus produk tersebut dari keranjang lalu coba lagi.";
  }
  const detail = raw.match(/"error"\s*:\s*"([^"]+)"/)?.[1];
  return detail ?? (raw ? "Terjadi kesalahan, coba lagi." : "Terjadi kesalahan, coba lagi.");
}

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [locationQuery, setLocationQuery] = useState("");
  const [locationResults, setLocationResults] = useState<ScalevStorefrontLocation[]>([]);
  const [location, setLocation] = useState<ScalevStorefrontLocation | null>(null);
  const [postalCode, setPostalCode] = useState("");

  const [paymentMethods, setPaymentMethods] = useState<ScalevStorefrontPaymentMethod[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [shippingOptions, setShippingOptions] = useState<ScalevShippingOption[]>([]);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shipping, setShipping] = useState<ScalevShippingOption | null>(null);

  const [summary, setSummary] = useState<ScalevCheckoutSummary | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const checkoutItems = useMemo(
    () =>
      items
        .filter((i) => i.variantId !== undefined)
        .map((i) => ({ type: "variant" as const, variant_id: i.variantId!, quantity: i.quantity })),
    [items],
  );
  const missingVariant = items.some((i) => i.variantId === undefined);
  const postalValid = /^\d{5}$/.test(postalCode);
  const destination = useMemo(
    () => (location && postalValid ? { location_id: location.id, postal_code: postalCode } : null),
    [location, postalValid, postalCode],
  );

  useEffect(() => {
    let cancelled = false;
    scalevStorefront
      .listPaymentMethods()
      .then((methods) => {
        if (cancelled) return;
        setPaymentMethods(methods);
        setPaymentMethod((current) => current || methods[0]?.code || "");
      })
      .catch((e) => toast.error(`Gagal memuat metode pembayaran: ${errorMessage(e)}`));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (location || locationQuery.trim().length < 3) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      scalevStorefront
        .searchLocations(locationQuery.trim())
        .then((results) => !cancelled && setLocationResults(results))
        .catch(() => !cancelled && setLocationResults([]));
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [locationQuery, location]);

  useEffect(() => {
    if (!destination || checkoutItems.length === 0) return;
    let cancelled = false;
    scalevStorefront
      .getShippingOptions({ items: checkoutItems, destination, payment_method: paymentMethod || undefined })
      .then((options) => {
        if (cancelled) return;
        setShippingOptions(options);
        setShipping((current) =>
          options.find((o) => o.courier_service_id === current?.courier_service_id) ?? null,
        );
      })
      .catch((e) => {
        if (cancelled) return;
        setShippingOptions([]);
        toast.error(errorMessage(e));
      })
      .finally(() => !cancelled && setShippingLoading(false));
    return () => {
      cancelled = true;
    };
  }, [destination, checkoutItems, paymentMethod]);

  useEffect(() => {
    if (!destination || !shipping || !paymentMethod || checkoutItems.length === 0) return;
    let cancelled = false;
    scalevStorefront
      .getCheckoutSummary({
        items: checkoutItems,
        destination,
        courier_service_id: shipping.courier_service_id,
        warehouse_unique_id: shipping.warehouse_unique_id,
        courier_aggregator_code: shipping.courier_aggregator_code,
        payment_method: paymentMethod,
      })
      .then((s) => !cancelled && setSummary(s))
      .catch((e) => {
        if (cancelled) return;
        setSummary(null);
        toast.error(`Gagal menghitung total: ${errorMessage(e)}`);
      });
    return () => {
      cancelled = true;
    };
  }, [destination, shipping, paymentMethod, checkoutItems]);

  function pickLocation(l: ScalevStorefrontLocation) {
    setLocation(l);
    setLocationQuery(l.display);
    setLocationResults([]);
    setShipping(null);
    setSummary(null);
    setShippingOptions([]);
  }

  function changeLocation(value: string) {
    setLocationQuery(value);
    setLocation(null);
    setShipping(null);
    setSummary(null);
    setShippingOptions([]);
    if (value.trim().length < 3) setLocationResults([]);
  }

  function changePostal(value: string) {
    setPostalCode(value.replace(/\D/g, "").slice(0, 5));
    setShipping(null);
    setSummary(null);
    setShippingOptions([]);
    setShippingLoading(/^\d{5}$/.test(value));
  }

  const canSubmit =
    !submitting &&
    !missingVariant &&
    name.trim() &&
    /\S+@\S+\.\S+/.test(email) &&
    phone.trim().length >= 9 &&
    address.trim() &&
    destination &&
    shipping &&
    paymentMethod;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !destination || !shipping) return;
    setSubmitting(true);
    try {
      const order = await scalevStorefront.createCheckout({
        items: checkoutItems,
        customer_name: name.trim(),
        customer_email: email.trim(),
        customer_phone: phone.trim(),
        shipping_address: address.trim(),
        shipping_location_id: destination.location_id,
        shipping_subdistrict: location?.subdistrict_name,
        shipping_postal_code: destination.postal_code,
        courier_service_id: shipping.courier_service_id,
        warehouse_unique_id: shipping.warehouse_unique_id,
        courier_aggregator_code: shipping.courier_aggregator_code ?? undefined,
        payment_method: paymentMethod,
        notes: buildNotes(items, note),
      });
      clearCart();
      const next =
        order.redirect_url ??
        order.public_order_url ??
        `/pesanan/sukses?order=${order.secret_slug}`;
      window.location.href = next;
    } catch (err) {
      toast.error(`Pesanan gagal dibuat: ${errorMessage(err)}`);
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">Keranjang Kosong</h1>
        <p className="text-sm text-muted-foreground">Tambahkan produk dulu sebelum checkout.</p>
        <Button asChild>
          <Link href="/produk">Lihat Produk</Link>
        </Button>
      </div>
    );
  }

  const total = summary ? Number(summary.gross_revenue) : subtotal;

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-10 pb-32 sm:px-6">
      <h1 className="font-heading text-2xl font-semibold text-foreground">Checkout</h1>

      {missingVariant && (
        <p className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          Beberapa produk di keranjang belum terhubung ke katalog toko (kemungkinan keranjang lama).
          Hapus lalu tambahkan ulang produk dari halaman produk.
        </p>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-base font-bold text-foreground">Data Pemesan</h2>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Nama lengkap</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">No. WhatsApp</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="08123456789" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-base font-bold text-foreground">Alamat Pengiriman</h2>
        <div className="relative flex flex-col gap-1.5">
          <Label htmlFor="location">Kecamatan / Kelurahan</Label>
          <Input
            id="location"
            value={locationQuery}
            onChange={(e) => changeLocation(e.target.value)}
            placeholder="Ketik minimal 3 huruf, mis. Cempaka Putih"
            autoComplete="off"
          />
          {!location && locationResults.length > 0 && (
            <ul className="absolute top-full z-20 mt-1 max-h-64 w-full overflow-auto rounded-md border border-border bg-background shadow-lg">
              {locationResults.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => pickLocation(l)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-secondary"
                  >
                    {l.display}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="postal">Kode pos</Label>
            <Input id="postal" inputMode="numeric" value={postalCode} onChange={(e) => changePostal(e.target.value)} placeholder="10510" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="address">Alamat lengkap</Label>
            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={2} placeholder="Nama jalan, nomor rumah, RT/RW" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-foreground">Pengiriman</h2>
        {!destination ? (
          <p className="text-sm text-muted-foreground">Pilih kecamatan dan isi kode pos untuk melihat ongkos kirim.</p>
        ) : shippingLoading && shippingOptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">Memuat ongkos kirim…</p>
        ) : shippingOptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {paymentMethod === "cod"
              ? "COD tidak tersedia untuk tujuan ini. Pilih metode pembayaran lain."
              : "Tidak ada layanan pengiriman untuk tujuan ini."}
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {shippingOptions.map((o) => (
              <label
                key={`${o.courier_service_id}-${o.warehouse_unique_id}`}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm ${
                  shipping?.courier_service_id === o.courier_service_id ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shipping?.courier_service_id === o.courier_service_id}
                    onChange={() => setShipping(o)}
                  />
                  <span>
                    <span className="font-medium uppercase">{o.courier_code.replace("_", " ")} {o.name}</span>
                    {o.etd ? <span className="ml-2 text-muted-foreground">{o.etd} hari</span> : null}
                  </span>
                </span>
                <span className="font-semibold">{formatIDR(o.cost)}</span>
              </label>
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-foreground">Metode Pembayaran</h2>
        <div className="flex flex-col gap-2">
          {paymentMethods.map((m) => (
            <label
              key={m.code}
              className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm ${
                paymentMethod === m.code ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <input type="radio" name="payment" checked={paymentMethod === m.code} onChange={() => setPaymentMethod(m.code)} />
              {m.label}
            </label>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-1.5">
        <Label htmlFor="note">Catatan untuk penjual (opsional)</Label>
        <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} rows={2} />
      </section>

      <section className="flex flex-col gap-3 rounded-lg border border-border p-4 text-sm">
        <h2 className="text-base font-bold text-foreground">Ringkasan</h2>
        {items.map((item) => (
          <div key={item.cartItemId} className="flex justify-between gap-3">
            <span className="text-muted-foreground">
              {item.quantity}x {item.name}
              {item.colorName ? ` (${item.colorName})` : ""}
              {item.customName ? ` · ukir "${item.customName}"` : ""}
            </span>
            <span>{formatIDR(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-border pt-3">
          <span className="text-muted-foreground">Subtotal produk</span>
          <span>{formatIDR(summary ? Number(summary.product_price) : subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Ongkos kirim</span>
          <span>{summary ? formatIDR(Number(summary.shipping_cost)) : "—"}</span>
        </div>
        {summary && Number(summary.other_income) > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">{summary.other_income_name ?? "Biaya lain"}</span>
            <span>{formatIDR(Number(summary.other_income))}</span>
          </div>
        )}
        {summary && Number(summary.service_fee) > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Biaya layanan</span>
            <span>{formatIDR(Number(summary.service_fee))}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
          <span>Total</span>
          <span className="text-primary">{formatIDR(total)}</span>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background p-3 sm:static sm:border-0 sm:p-0">
        <Button type="submit" className="w-full" disabled={!canSubmit}>
          {submitting ? "Memproses…" : `Buat Pesanan · ${formatIDR(total)}`}
        </Button>
      </div>
    </form>
  );
}
