import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Star } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductMediaProvider } from "@/components/product/ProductMediaContext";
import { ProductColorPicker } from "@/components/product/ProductColorPicker";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductReviews } from "@/components/product/ProductReviews";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { ShippingAreaField } from "@/components/product/ShippingAreaField";
import { TrackViewItem } from "@/components/tracking";
import { getMergedCatalog, getMergedProductBySlug } from "@/lib/scalev/catalog";
import { productCategories } from "@/lib/mock-data/categories";
import { formatIDR } from "@/lib/utils/format";
import type { Product } from "@/types/product";

interface PdpPageProps {
  // `kategori` isn't used to look the product up (Scalev has no real
  // category data yet — see lib/scalev/catalog.ts), only for the
  // breadcrumb URL shape; lookup is by slug alone so links generated from
  // any category segment still resolve.
  params: Promise<{ kategori: string; slug: string }>;
}

// No generateStaticParams: the real Scalev catalog changes independently
// of the app's build, so these render dynamically (with the 60s
// revalidation already set on the underlying fetch — see lib/scalev/client.ts)
// rather than depending on a build-time snapshot.

export async function generateMetadata({
  params,
}: PdpPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getMergedProductBySlug(slug);
  return { title: product?.name ?? "Produk" };
}

// Generated (not copied) description text, in the same "intro paragraph +
// labeled bullet blocks" shape as the one real PDP copy we have (product
// id "3" — see lib/mock-data/products.ts). Deliberately sticks to claims
// this app can actually back up from the product's own data — no invented
// certifications, paper brand names, or specific regulatory claims.
function generateDescriptionText(product: Product, categoryLabel: string): string {
  const intro = `${product.name} hadir untuk menemani ibadah harian kamu — dipilih dari koleksi ${categoryLabel} Halim Quran dengan kualitas cetak yang nyaman dibaca kapan saja.`;

  const specs = [`Kategori ${categoryLabel}`];
  if (product.size) specs.push(`Ukuran ${product.size}, ringkas dan mudah dibawa`);
  if (product.colors && product.colors.length > 0) {
    specs.push(`Tersedia ${product.colors.length} pilihan warna`);
  }

  const useCases = ["Bacaan dan hafalan sehari-hari"];
  if (product.wakafEligible) useCases.push("Wakaf Quran ke masjid, sekolah, atau pesantren");
  if (product.giftEligible) useCases.push("Hadiah untuk keluarga, sahabat, atau guru mengaji");
  if (!product.wakafEligible && !product.giftEligible) {
    useCases.push("Koleksi pribadi atau hadiah untuk orang terdekat");
  }

  const benefits = ["Kertas berkualitas, nyaman untuk tilawah dalam waktu lama"];
  if (product.customNameEligible) benefits.push("Tersedia opsi ukir nama untuk kesan personal");
  if (product.badge) benefits.push(`Termasuk produk ${product.badge.toLowerCase()}`);

  return [
    intro,
    `Spesifikasi:\n${specs.map((s) => `- ${s}`).join("\n")}`,
    `Cocok untuk:\n${useCases.map((s) => `- ${s}`).join("\n")}`,
    `Keunggulan:\n${benefits.map((s) => `- ${s}`).join("\n")}`,
  ].join("\n\n");
}

export default async function ProductDetailPage({ params }: PdpPageProps) {
  const { slug } = await params;

  const catalog = await getMergedCatalog();
  const product = catalog.find((p) => p.slug === slug) ?? null;

  if (!product) {
    notFound();
  }

  const related = catalog.filter((p) => p.slug !== slug).slice(0, 4);

  const category = productCategories.find((c) => c.slug === product.category);
  const categoryLabel = category?.label ?? product.category;

  const descriptionText = product.description ?? generateDescriptionText(product, categoryLabel);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 pb-24 sm:px-6 lg:px-8 sm:pb-8">
      <TrackViewItem product={product} />
      <nav className="hidden text-xs text-muted-foreground sm:block">
        <Link href="/produk" className="hover:text-primary">
          Semua Produk
        </Link>
        {" / "}
        <Link href={`/produk/${product.category}`} className="hover:text-primary">
          {categoryLabel}
        </Link>
        {" / "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <ProductMediaProvider product={product}>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Gallery */}
          <ProductGallery product={product} />

          {/* Product Info + Purchase Panel */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="w-fit rounded bg-destructive px-2 py-0.5 text-xs font-semibold text-white">
                Ada Stok
              </span>
              <h1 className="font-heading text-lg font-semibold text-foreground">
                {product.name}
              </h1>
              {product.rating && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < Math.round(product.rating!)
                            ? "fill-primary text-primary"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </span>
                  {product.rating.toFixed(1)} ({product.ratingCount ?? 1})
                </span>
              )}
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-bold text-foreground">
                  {formatIDR(product.price)}
                </p>
                <button
                  type="button"
                  aria-label="Simpan ke wishlist"
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Heart className="size-6" />
                </button>
              </div>
            </div>

            <ProductColorPicker product={product} />

            <PurchasePanel product={product} />

            {product.wakafEligible && (
              <Link
                href="/wakaf"
                className="flex items-center justify-between rounded-lg border border-primary/30 bg-secondary px-4 py-3 text-sm text-foreground hover:border-primary"
              >
                <span>
                  Produk ini <strong>cocok untuk Wakaf Quran</strong>
                </span>
                <span className="text-primary">Lihat Wakaf &rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </ProductMediaProvider>

      <ProductDescription text={descriptionText} />

      <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
        <span className="text-base font-bold text-foreground">Pengiriman</span>
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground">Dikirim ke:</span>
          <ShippingAreaField />
        </div>
        {product.weightGrams && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Berat:</span>
            <span className="text-foreground">{product.weightGrams}g</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Dikirim dalam 24 jam,
          <br />
          (Setelah pembayaran dikonfirmasi)
        </p>
      </div>

      <ProductReviews product={product} />

      {/* Related Products */}
      {related.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Rekomendasi lainnya
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
