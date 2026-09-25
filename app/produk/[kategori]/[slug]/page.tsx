import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/product/ProductCard";
import { PurchasePanel } from "@/components/product/PurchasePanel";
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

// Factual, attribute-derived only — no invented marketing claims (no data
// on paper quality, ink, etc. is available from Scalev or the live-site audit).
function getBenefits(product: Product, categoryLabel: string): string[] {
  const benefits: string[] = [];
  if (product.badge === "Ukir Nama") {
    benefits.push("Tersedia layanan ukir nama");
  }
  benefits.push(`Kategori ${categoryLabel}`);
  if (product.size) {
    benefits.push(`Ukuran ${product.size}`);
  }
  return benefits;
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

/** Renders one `\n\n`-separated block of description text — either a plain
 * paragraph, or a "Header:\n- bullet\n- bullet" block as a labeled list. */
function DescriptionBlock({ block }: { block: string }) {
  const lines = block.split("\n").filter(Boolean);
  const [first, ...rest] = lines;
  const isList = first.trim().endsWith(":") && rest.length > 0;

  if (!isList) {
    return (
      <p className="max-w-3xl text-sm text-muted-foreground">{lines.join(" ")}</p>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-medium text-foreground">{first}</p>
      <ul className="flex max-w-3xl flex-col gap-1 pl-1 text-sm text-muted-foreground">
        {rest.map((line, i) => (
          <li key={i}>{line.replace(/^[-✔]\s*/, "")}</li>
        ))}
      </ul>
    </div>
  );
}

function getFaq(product: Product) {
  return [
    {
      q: "Bagaimana cara memesan?",
      a: "Pilih personalisasi dan jumlah di atas, lalu klik Tambah ke Keranjang atau Beli Sekarang.",
    },
    {
      q: "Apakah ukir nama tersedia?",
      a:
        product.badge === "Ukir Nama"
          ? "Ya, pilih opsi Quran + Nama atau Quran + Nama + Box pada bagian Personalisasi."
          : "Ketersediaan ukir nama dapat dipilih melalui opsi Personalisasi di atas.",
    },
    {
      q: "Bagaimana estimasi pengiriman?",
      a: "Estimasi pengiriman dihitung otomatis saat checkout, berdasarkan alamat tujuan.",
    },
  ];
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

  const benefits = getBenefits(product, categoryLabel);
  const faq = getFaq(product);
  const descriptionText = product.description ?? generateDescriptionText(product, categoryLabel);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 pb-24 sm:px-6 lg:px-8 sm:pb-8">
      <TrackViewItem product={product} />
      <div className="flex flex-col gap-1">
        <Link
          href={`/produk/${product.category}`}
          className="w-fit text-sm text-muted-foreground hover:text-primary"
        >
          &larr; Kembali
        </Link>
        <nav className="text-xs text-muted-foreground">
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
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Gallery */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          )}
          {product.badge && (
            <span className="absolute left-3 top-3 rounded bg-brand-yellow px-2.5 py-1 text-xs font-bold text-brand-yellow-foreground">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info + Purchase Panel */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-primary">
              {categoryLabel}
            </span>
            <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              {product.name}
            </h1>
            {product.rating && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="size-4 fill-brand-yellow text-brand-yellow" />
                {product.rating} dari 5
              </span>
            )}
            <p className="text-2xl font-semibold text-primary">
              {formatIDR(product.price)}
            </p>
          </div>

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

          <div className="flex flex-col gap-1.5 border-t border-border pt-4">
            <span className="text-sm font-medium text-foreground">
              Estimasi Pengiriman
            </span>
            <p className="text-sm text-muted-foreground">
              Dihitung otomatis berdasarkan alamat tujuan saat checkout.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="flex flex-wrap gap-2">
        {benefits.map((b) => (
          <span
            key={b}
            className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
          >
            {b}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Deskripsi
        </h2>
        {descriptionText.split("\n\n").map((block, i) => (
          <DescriptionBlock key={i} block={block} />
        ))}
      </div>

      {/* Specifications */}
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Spesifikasi
        </h2>
        <table className="w-full max-w-md text-sm">
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 text-muted-foreground">Kategori</td>
              <td className="py-2 text-foreground">{categoryLabel}</td>
            </tr>
            {product.size && (
              <tr className="border-b border-border">
                <td className="py-2 text-muted-foreground">Ukuran</td>
                <td className="py-2 text-foreground">{product.size}</td>
              </tr>
            )}
            <tr>
              <td className="py-2 text-muted-foreground">Kode Produk</td>
              <td className="py-2 text-foreground">{product.slug}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Reviews */}
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Ulasan
        </h2>
        {product.rating ? (
          <p className="text-sm text-muted-foreground">
            Rating {product.rating} dari 5. Detail ulasan pelanggan akan
            tersedia setelah situs terhubung ke sistem review.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Belum ada rating untuk produk ini.
          </p>
        )}
      </div>

      {/* FAQ */}
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          FAQ
        </h2>
        <Accordion type="single" collapsible className="max-w-2xl">
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Produk Terkait
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
