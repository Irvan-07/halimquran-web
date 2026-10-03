import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, MapPin, MessageCircle, Star, Truck } from "lucide-react";
import { ProductMediaProvider } from "@/components/product/ProductMediaContext";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ShippingAreaField } from "@/components/product/ShippingAreaField";
import { StockBadge } from "@/components/product/StockBadge";
import { TrackViewItem } from "@/components/tracking";
import { WHATSAPP_NUMBER } from "@/components/product/usePurchase";
import type { Product } from "@/types/product";
import type { ProductDetailProps } from "../types";
import { TokopediaGallery } from "./Gallery";
import { TokopediaProductCard } from "./ProductCard";
import { TokopediaProductGrid } from "./ProductGrid";
import {
  TokopediaMobileBar,
  TokopediaMobileQuantity,
  TokopediaOptions,
  TokopediaPurchaseCard,
  TokopediaPurchaseProvider,
} from "./Purchase";

function formatAmount(n: number): string {
  return new Intl.NumberFormat("id-ID").format(n);
}

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(".0", "").replace(".", ",")} rb+` : String(n);
}

function SellerCard() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-3 lg:p-4">
      <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border bg-secondary lg:size-14">
        <Image src="/logo.png" alt="" fill sizes="56px" className="object-contain p-1.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-extrabold text-foreground">Halim Qur&apos;an</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5" /> Kab. Bandung
        </p>
      </div>
      <div className="flex gap-2">
        <Link
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 items-center gap-1.5 rounded-lg border border-primary px-4 text-xs font-extrabold text-primary hover:bg-accent"
        >
          <MessageCircle className="size-4" /> Chat Penjual
        </Link>
        <Link
          href="/produk"
          className="flex h-9 items-center rounded-lg bg-primary px-4 text-xs font-extrabold text-primary-foreground hover:bg-primary-dark"
        >
          Kunjungi Toko
        </Link>
      </div>
    </div>
  );
}

function Shipping({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <p className="flex items-center gap-2 font-extrabold text-foreground">
        <Truck className="size-5 text-muted-foreground" /> Pengiriman
      </p>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        Dikirim ke <ShippingAreaField />
      </div>
      {product.weightGrams ? (
        <p className="text-muted-foreground">
          Berat satuan <span className="text-foreground">{product.weightGrams} g</span>
        </p>
      ) : null}
      <p className="text-muted-foreground">Dikirim dalam 24 jam setelah pembayaran dikonfirmasi.</p>
    </div>
  );
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground">
      {label}: <span className="text-foreground">{children}</span>
    </p>
  );
}

// Marketplace product page, two real layouts from one markup:
//  - desktop (lg+): breadcrumb, then three columns — sticky photo + thumbnails,
//    price/title/options/detail, and a sticky "Atur jumlah dan catatan" card
//    (qty, subtotal, + Keranjang, Beli Langsung); reviews, shop card and
//    related products below;
//  - phone: edge-to-edge photo + "warna" strip, price and title, order
//    options, quantity row, shipping and shop rows, with a fixed bottom bar
//    (chat | Beli Langsung | + Keranjang).
export function TokopediaProductDetail({ product, related, descriptionText, categoryLabel }: ProductDetailProps) {
  const backHref = `/produk/${product.category}`;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-28 lg:gap-8 lg:px-8 lg:pb-12 lg:pt-4">
      <TrackViewItem product={product} />

      <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-xs lg:flex">
        <Link href="/" className="font-bold text-primary hover:underline">Home</Link>
        <ChevronRight className="size-3.5 text-muted-foreground" />
        <Link href="/produk" className="font-bold text-primary hover:underline">Produk</Link>
        <ChevronRight className="size-3.5 text-muted-foreground" />
        <Link href={backHref} className="font-bold text-primary hover:underline">{categoryLabel}</Link>
        <ChevronRight className="size-3.5 text-muted-foreground" />
        <span className="truncate text-muted-foreground">{product.name}</span>
      </nav>

      <ProductMediaProvider product={product}>
        <TokopediaPurchaseProvider product={product}>
          <section className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)_280px] lg:items-start lg:gap-6">
            <TokopediaGallery product={product} />

            <div className="flex min-w-0 flex-col gap-5 px-3 lg:px-0">
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3 lg:hidden">
                  <p className="text-[28px] font-extrabold leading-8 text-foreground">
                    <span className="mr-0.5 text-base">Rp</span>
                    {formatAmount(product.price)}
                  </p>
                  <Heart className="mt-1 size-6 shrink-0 text-muted-foreground" aria-hidden />
                </div>
                <h1 className="text-sm font-bold leading-snug text-foreground lg:text-xl lg:font-extrabold">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  {product.soldCount ? (
                    <span>
                      Terjual <span className="text-foreground">{formatCount(product.soldCount)}</span>
                    </span>
                  ) : null}
                  {product.soldCount && product.rating ? <span>•</span> : null}
                  {product.rating ? (
                    <span className="flex items-center gap-1">
                      <Star className="size-4 fill-[#FFC400] text-[#FFC400]" />
                      <span className="text-foreground">{product.rating.toFixed(1)}</span>
                      {product.ratingCount ? <span>({formatCount(product.ratingCount)} rating)</span> : null}
                    </span>
                  ) : null}
                  <StockBadge product={product} />
                </div>
                <p className="hidden text-[28px] font-extrabold leading-9 text-foreground lg:block">
                  Rp{formatAmount(product.price)}
                </p>
              </div>

              <hr className="border-border" />

              <TokopediaOptions product={product} />

              <TokopediaMobileQuantity product={product} />

              <hr className="border-border" />

              <div className="flex flex-col gap-4">
                <h2 className="w-fit border-b-2 border-primary pb-2 text-sm font-extrabold text-primary">Detail Produk</h2>
                <div className="flex flex-col gap-1.5">
                  {product.weightGrams ? <Spec label="Berat Satuan">{product.weightGrams} g</Spec> : null}
                  {product.size ? <Spec label="Ukuran">{product.size}</Spec> : null}
                  <Spec label="Kategori">
                    <Link href={backHref} className="font-bold text-primary hover:underline">{categoryLabel}</Link>
                  </Spec>
                </div>
                <ProductDescription text={descriptionText} hideTitle />
              </div>

              {product.wakafEligible && (
                <Link
                  href="/wakaf"
                  className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-accent px-4 py-3 text-sm text-foreground hover:border-primary"
                >
                  <span>
                    Produk ini <strong>cocok untuk Wakaf Quran</strong>
                  </span>
                  <span className="shrink-0 font-bold text-primary">Lihat Wakaf &rarr;</span>
                </Link>
              )}

              <hr className="border-border lg:hidden" />
              <div className="lg:hidden">
                <Shipping product={product} />
              </div>
            </div>

            <div className="hidden min-w-0 flex-col gap-4 lg:sticky lg:top-40 lg:flex lg:self-start">
              <TokopediaPurchaseCard product={product} />
              <div className="rounded-lg border border-border p-4">
                <Shipping product={product} />
              </div>
            </div>
          </section>

          <TokopediaMobileBar />
        </TokopediaPurchaseProvider>
      </ProductMediaProvider>

      <div className="px-3 lg:px-0">
        <SellerCard />
      </div>

      <section className="flex flex-col gap-3 px-3 lg:px-0">
        <h2 className="text-base font-extrabold text-foreground lg:text-lg">Ulasan Pembeli</h2>
        <div className="rounded-lg border border-border p-4">
          <ProductReviews product={product} hideTitle />
        </div>
      </section>

      {related.length > 0 && (
        <section className="flex flex-col gap-3 px-3 lg:px-0">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-foreground lg:text-lg">Produk Lainnya</h2>
            <Link href="/produk" className="text-sm font-extrabold text-primary hover:underline">
              Lihat Semua
            </Link>
          </div>
          <TokopediaProductGrid>
            {related.map((p) => (
              <TokopediaProductCard key={p.id} product={p} />
            ))}
          </TokopediaProductGrid>
        </section>
      )}
    </div>
  );
}
