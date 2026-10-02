import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, MapPin, MessageCircle, ShieldCheck, Star, Store, Truck } from "lucide-react";
import { ProductMediaProvider } from "@/components/product/ProductMediaContext";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ShippingAreaField } from "@/components/product/ShippingAreaField";
import { StockBadge } from "@/components/product/StockBadge";
import { TrackViewItem } from "@/components/tracking";
import { WHATSAPP_NUMBER } from "@/components/product/usePurchase";
import { formatIDR } from "@/lib/utils/format";
import type { Product } from "@/types/product";
import type { ProductDetailProps } from "../types";
import { BlibliBuyBox } from "./BuyBox";
import { BlibliGallery } from "./Gallery";
import { BlibliProductCard } from "./ProductCard";
import { BlibliProductGrid } from "./ProductGrid";

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(".0", "").replace(".", ",")}rb` : String(n);
}

function SellerCard() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-primary">
        <Image src="/logo-white.png" alt="" fill sizes="48px" className="object-contain p-2" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold text-foreground">Halim Quran</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5" /> Cipagalo, Kab. Bandung
        </p>
      </div>
      <Link
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-primary px-4 text-sm font-semibold text-primary hover:bg-accent"
      >
        <MessageCircle className="size-4" />
        Chat
      </Link>
    </div>
  );
}

function ShippingCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="flex items-center gap-2 font-semibold text-foreground">
        <Truck className="size-5 text-muted-foreground" />
        Metode pengiriman
      </p>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        Dikirim ke <ShippingAreaField />
      </div>
      {product.weightGrams ? (
        <p className="text-muted-foreground">
          Berat <span className="text-foreground">{product.weightGrams} g</span>
        </p>
      ) : null}
      <p className="text-muted-foreground">Dikirim dalam 24 jam setelah pembayaran dikonfirmasi.</p>
    </div>
  );
}

function SpecRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 text-sm">
      <dt className="w-20 shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-foreground">{children}</dd>
    </div>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-36 text-lg font-semibold text-foreground lg:text-xl">
      {children}
    </h2>
  );
}

// Marketplace product page, two real layouts from one markup:
//  - desktop (lg+): rounded photo + thumbnails | price/title/options | a
//    sticky seller + shipping column, then Detail / Ulasan / Rekomendasi
//    sections under a tab row;
//  - phone: full-bleed swipe photo with floating back/bag buttons, price
//    row with heart, title, trust strip, options, then seller/shipping
//    rows and the sections stacked.
// A fixed purchase bar (see BuyBox) is present on both.
export function BlibliProductDetail({ product, related, descriptionText, categoryLabel }: ProductDetailProps) {
  const backHref = `/produk/${product.category}`;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-32 lg:gap-10 lg:px-8 lg:pt-4">
      <TrackViewItem product={product} />

      <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-sm lg:flex">
        <Link href="/" className="text-primary hover:underline">Beranda</Link>
        <ChevronRight className="size-3.5 text-muted-foreground" />
        <Link href={backHref} className="text-primary hover:underline">{categoryLabel}</Link>
        <ChevronRight className="size-3.5 text-muted-foreground" />
        <span className="truncate text-muted-foreground">{product.name}</span>
      </nav>

      <ProductMediaProvider product={product}>
        <section className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)_300px] lg:items-start lg:gap-8">
          <BlibliGallery product={product} backHref={backHref} />

          <div className="flex min-w-0 flex-col gap-5 px-4 lg:px-0">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <p className="text-2xl font-semibold text-foreground lg:text-[32px] lg:leading-10">
                  {formatIDR(product.price)}
                </p>
                <button
                  type="button"
                  aria-label="Simpan ke wishlist"
                  className="mt-1 shrink-0 text-muted-foreground hover:text-destructive lg:hidden"
                >
                  <Heart className="size-6 fill-current" />
                </button>
              </div>
              <h1 className="text-base font-medium leading-snug text-foreground lg:text-xl">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                {product.rating ? (
                  <span className="flex items-center gap-1">
                    <Star className="size-4 fill-[#FFC600] text-[#FFC600]" />
                    <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
                    {product.ratingCount ? <span>({formatCount(product.ratingCount)})</span> : null}
                  </span>
                ) : null}
                {product.soldCount ? <span>Terjual {formatCount(product.soldCount)}</span> : null}
                <StockBadge product={product} />
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-secondary px-3 py-2 text-sm text-foreground lg:bg-transparent lg:px-0">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-primary" /> Produk resmi Halim Qur&apos;an
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="size-4 text-primary" /> Dikirim 24 jam
                </span>
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <BlibliBuyBox product={product} />
            </div>

            <dl className="flex flex-col gap-2 border-t border-border pt-5">
              <SpecRow label="Kategori">
                <Link href={backHref} className="text-primary hover:underline">{categoryLabel}</Link>
              </SpecRow>
              <SpecRow label="Merk">
                <Link href="/produk" className="text-primary hover:underline">Halim Quran</Link>
              </SpecRow>
              {product.size && <SpecRow label="Ukuran">{product.size}</SpecRow>}
              {product.weightGrams ? <SpecRow label="Berat">{product.weightGrams} g</SpecRow> : null}
            </dl>

            {product.wakafEligible && (
              <Link
                href="/wakaf"
                className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-accent px-4 py-3 text-sm text-foreground hover:border-primary"
              >
                <span>
                  Produk ini <strong>cocok untuk Wakaf Quran</strong>
                </span>
                <span className="shrink-0 text-primary">Lihat Wakaf &rarr;</span>
              </Link>
            )}

            {/* Phone: seller + shipping as plain rows */}
            <div className="flex flex-col gap-5 border-t border-border pt-5 lg:hidden">
              <SellerCard />
              <ShippingCard product={product} />
            </div>
          </div>

          {/* Desktop: sticky seller + shipping column */}
          <aside className="sticky top-40 hidden flex-col overflow-hidden rounded-xl border border-border lg:flex">
            <div className="border-b border-border p-4">
              <SellerCard />
              <Link
                href="/produk"
                className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-full bg-secondary text-sm font-medium text-foreground hover:bg-accent hover:text-primary"
              >
                <Store className="size-4" />
                Lihat semua produk
              </Link>
            </div>
            <div className="p-4">
              <ShippingCard product={product} />
            </div>
          </aside>
        </section>
      </ProductMediaProvider>

      <nav aria-label="Bagian halaman" className="flex gap-6 border-b border-border px-4 text-sm lg:px-0">
        {[
          ["Detail", "#detail"],
          ["Ulasan", "#ulasan"],
          ["Rekomendasi", "#rekomendasi"],
        ].map(([label, href], i) => (
          <a
            key={href}
            href={href}
            className={`-mb-px border-b-2 py-3 ${i === 0 ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}
          >
            {label}
          </a>
        ))}
      </nav>

      <section className="flex flex-col gap-4 px-4 lg:px-0">
        <SectionTitle id="detail">Detail produk</SectionTitle>
        <ProductDescription text={descriptionText} hideTitle />
      </section>

      <section className="flex flex-col gap-4 px-4 lg:px-0">
        <SectionTitle id="ulasan">Ulasan pembeli</SectionTitle>
        <div className="rounded-xl border border-border p-4">
          <ProductReviews product={product} hideTitle />
        </div>
      </section>

      {related.length > 0 && (
        <section className="flex flex-col gap-4 px-4 lg:px-0">
          <SectionTitle id="rekomendasi">Rekomendasi buat kamu</SectionTitle>
          <BlibliProductGrid>
            {related.map((p) => (
              <BlibliProductCard key={p.id} product={p} />
            ))}
          </BlibliProductGrid>
        </section>
      )}
    </div>
  );
}
