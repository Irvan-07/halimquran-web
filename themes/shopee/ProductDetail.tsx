import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, MessageCircle, Star, Store, Truck } from "lucide-react";
import { ProductMediaProvider } from "@/components/product/ProductMediaContext";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ShippingAreaField } from "@/components/product/ShippingAreaField";
import { StockBadge } from "@/components/product/StockBadge";
import { TrackViewItem } from "@/components/tracking";
import { WHATSAPP_NUMBER } from "@/components/product/usePurchase";
import type { Product } from "@/types/product";
import type { ProductDetailProps } from "../types";
import { ShopeeGallery } from "./Gallery";
import { ShopeeProductCard } from "./ProductCard";
import { ShopeeProductGrid } from "./ProductGrid";
import { ShopeePurchaseBox } from "./PurchaseBox";

function formatAmount(n: number): string {
  return new Intl.NumberFormat("id-ID").format(n);
}

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(".0", "").replace(".", ",")}RB` : String(n);
}

// A content card. Mobile: full-bleed white block (the page's grey shows
// through the gaps between blocks); desktop: a contained card with a grey
// uppercase title band — the classic marketplace "section header".
function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="bg-card lg:rounded-sm lg:shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-3 lg:border-0 lg:bg-secondary lg:px-5 lg:py-3.5">
        <h2 className="text-sm font-medium text-foreground lg:text-lg lg:uppercase lg:text-foreground/90">{title}</h2>
        {action}
      </div>
      <div className="px-3 py-4 lg:px-5 lg:py-5">{children}</div>
    </section>
  );
}

// Title, rating/sold row and price. DOM order is title -> rating -> price
// (desktop: title above a grey price box); on phones the price jumps to the
// top like the app (`order-*`), with the title below.
function Summary({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-2 bg-card px-3 py-3 lg:gap-3 lg:bg-transparent lg:p-0">
      <h1 className="order-2 text-[15px] font-medium leading-snug text-foreground lg:order-1 lg:text-xl">
        {product.name}
      </h1>

      <div className="order-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm lg:order-2">
        {product.rating ? (
          <span className="flex items-center gap-1.5">
            <span className="border-b border-primary text-primary lg:text-base">{product.rating.toFixed(1)}</span>
            <span className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-3.5 lg:size-4 ${
                    i < Math.round(product.rating!) ? "fill-primary text-primary" : "fill-border text-border"
                  }`}
                />
              ))}
            </span>
            {product.ratingCount ? (
              <span className="text-muted-foreground">
                <span className="text-foreground">{formatCount(product.ratingCount)}</span> Penilaian
              </span>
            ) : null}
          </span>
        ) : null}
        {product.soldCount ? (
          <span className="text-muted-foreground">
            <span className="text-foreground">{formatCount(product.soldCount)}</span> Terjual
          </span>
        ) : null}
        <StockBadge product={product} />
      </div>

      <p className="order-1 flex items-baseline gap-0.5 text-primary lg:order-3 lg:bg-secondary lg:px-5 lg:py-4">
        <span className="text-base lg:text-xl">Rp</span>
        <span className="text-[26px] font-medium leading-none lg:text-3xl">{formatAmount(product.price)}</span>
      </p>
    </div>
  );
}

function Shipping({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-3 bg-card px-3 py-3 lg:flex-row lg:gap-6 lg:bg-transparent lg:p-0">
      <span className="flex items-center gap-2 text-sm text-foreground lg:w-28 lg:shrink-0 lg:items-start lg:pt-0.5 lg:text-muted-foreground">
        <Truck className="size-4 text-primary lg:hidden" />
        Pengiriman
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">Dikirim ke</span>
          <ShippingAreaField />
        </div>
        {product.weightGrams ? (
          <p className="text-muted-foreground">
            Berat <span className="text-foreground">{product.weightGrams} g</span>
          </p>
        ) : null}
        <p className="text-muted-foreground">Dikirim dalam 24 jam setelah pembayaran dikonfirmasi.</p>
      </div>
    </div>
  );
}

function ShopCard() {
  return (
    <section className="flex flex-wrap items-center gap-4 bg-card px-3 py-4 lg:rounded-sm lg:px-5 lg:py-5 lg:shadow-sm">
      <div className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
        <span className="relative size-14 shrink-0 overflow-hidden rounded-full border border-border bg-secondary lg:size-20">
          <Image src="/logo.png" alt="" fill sizes="80px" className="object-contain p-1.5" />
        </span>
        <div className="flex min-w-0 flex-col gap-2">
          <p className="truncate text-base font-medium text-foreground">Halim Qur&apos;an</p>
          <div className="flex gap-2">
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 items-center gap-1.5 rounded-sm border border-primary bg-accent px-3 text-xs text-primary hover:bg-primary/10"
            >
              <MessageCircle className="size-3.5" />
              Chat Sekarang
            </Link>
            <Link
              href="/produk"
              className="flex h-8 items-center gap-1.5 rounded-sm border border-border px-3 text-xs text-foreground hover:border-primary hover:text-primary"
            >
              <Store className="size-3.5" />
              Lihat Toko
            </Link>
          </div>
        </div>
      </div>
      <ul className="hidden flex-1 gap-x-12 gap-y-2 border-l border-border pl-8 text-sm text-muted-foreground lg:grid lg:grid-cols-2">
        <li>Pengiriman <span className="text-primary">24 jam</span></li>
        <li>Pembayaran <span className="text-primary">QRIS, VA &amp; e-wallet</span></li>
        <li>Custom <span className="text-primary">Ukir nama</span></li>
        <li>Layanan <span className="text-primary">WhatsApp</span></li>
      </ul>
    </section>
  );
}

function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 text-sm">
      <dt className="w-32 shrink-0 text-muted-foreground lg:w-44">{label}</dt>
      <dd className="min-w-0 text-foreground">{children}</dd>
    </div>
  );
}

// Marketplace product page with two real layouts from one markup:
//  - desktop (lg+): breadcrumb, one white card (gallery left, details +
//    buy box right), then shop card and titled content sections;
//  - phone: edge-to-edge gallery, price first, option/shipping blocks,
//    stacked content blocks, and the fixed chat | keranjang | beli bar.
export function ShopeeProductDetail({ product, related, descriptionText, categoryLabel }: ProductDetailProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 pb-20 sm:pb-8 lg:gap-4 lg:px-8 lg:pb-10 lg:pt-5">
      <TrackViewItem product={product} />

      <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-sm lg:flex">
        <Link href="/" className="text-primary hover:underline">Halim Qur&apos;an</Link>
        <ChevronRight className="size-3.5 text-muted-foreground" />
        <Link href={`/produk/${product.category}`} className="text-primary hover:underline">{categoryLabel}</Link>
        <ChevronRight className="size-3.5 text-muted-foreground" />
        <span className="truncate text-foreground">{product.name}</span>
      </nav>

      <ProductMediaProvider product={product}>
        <section className="flex flex-col gap-2 lg:grid lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:rounded-sm lg:bg-card lg:p-5 lg:shadow-sm">
          <ShopeeGallery product={product} />

          <div className="flex min-w-0 flex-col gap-2 lg:gap-6">
            <Summary product={product} />
            <div className="order-3 lg:order-2">
              <Shipping product={product} />
            </div>
            <div className="order-2 bg-card px-3 py-4 lg:order-3 lg:bg-transparent lg:p-0">
              <ShopeePurchaseBox product={product} />
            </div>
            {product.wakafEligible && (
              <Link
                href="/wakaf"
                className="order-4 flex items-center justify-between gap-3 border border-primary/30 bg-accent px-3 py-3 text-sm text-foreground hover:border-primary lg:rounded-sm"
              >
                <span>
                  Produk ini <strong>cocok untuk Wakaf Quran</strong>
                </span>
                <span className="shrink-0 text-primary">Lihat Wakaf &rarr;</span>
              </Link>
            )}
          </div>
        </section>

        <ShopCard />

        <Section title="Spesifikasi Produk">
          <dl className="flex flex-col gap-3">
            <Spec label="Kategori">
              <Link href={`/produk/${product.category}`} className="text-primary hover:underline">{categoryLabel}</Link>
            </Spec>
            {product.size && <Spec label="Ukuran">{product.size}</Spec>}
            {product.weightGrams ? <Spec label="Berat">{product.weightGrams} g</Spec> : null}
            {product.colorVariants && product.colorVariants.length > 0 ? (
              <Spec label="Pilihan Warna">{product.colorVariants.map((c) => c.name).join(", ")}</Spec>
            ) : null}
          </dl>
        </Section>

        <Section title="Deskripsi Produk">
          <ProductDescription text={descriptionText} hideTitle />
        </Section>

        <Section title="Penilaian Produk">
          <ProductReviews product={product} hideTitle />
        </Section>
      </ProductMediaProvider>

      {related.length > 0 && (
        <section className="flex flex-col gap-2 px-1.5 pt-1 sm:px-0 lg:gap-3">
          <div className="flex items-center justify-between px-1.5 py-1 lg:px-0">
            <h2 className="text-sm font-medium uppercase text-foreground/80 lg:text-lg">Produk Lainnya</h2>
            <Link href="/produk" className="flex items-center gap-0.5 text-sm text-primary">
              Lihat Semua <ChevronRight className="size-4" />
            </Link>
          </div>
          <ShopeeProductGrid>
            {related.map((p) => (
              <ShopeeProductCard key={p.id} product={p} />
            ))}
          </ShopeeProductGrid>
        </section>
      )}
    </div>
  );
}
