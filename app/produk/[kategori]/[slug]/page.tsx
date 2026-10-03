import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveTheme } from "@/themes/server";
import { getMergedCatalog, getMergedProductBySlug } from "@/lib/scalev/catalog";
import { productCategories } from "@/lib/mock-data/categories";
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
  const { ProductDetail } = (await getActiveTheme()).slots;

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
    <ProductDetail
      product={product}
      related={related}
      descriptionText={descriptionText}
      categoryLabel={categoryLabel}
    />
  );
}
