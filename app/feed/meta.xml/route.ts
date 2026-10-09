import { siteConfig } from "@/config/site";
import { productCategories } from "@/lib/mock-data/categories";
import { getMergedCatalog } from "@/lib/scalev/catalog";
import { API_BASE } from "@/lib/scalev/storefront-client";

// Product feed for Meta (Facebook/Instagram) Commerce Manager: add this URL as
// a scheduled "Data feed" in the catalogue (Data sources > Add > Data feed).
// Items are products, with id = the Scalev product id, which is the same id the
// pixel sends as content_ids on ViewContent / AddToCart / InitiateCheckout.
// Only products that exist in Scalev are listed (the others can't be bought).
// Regenerated every 10 minutes, so price and stock follow Scalev.
export const revalidate = 600;

const BRAND = "Halim Quran";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function tag(name: string, value: string | number | undefined): string {
  return value === undefined || value === "" ? "" : `<g:${name}>${esc(String(value))}</g:${name}>`;
}

function absolute(base: string, url: string): string {
  return /^https?:\/\//i.test(url) ? url : `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}

// Meta only accepts JPEG / PNG (and GIF / BMP) images, not WebP.
const SUPPORTED_IMAGE = /\.(jpe?g|png)(\?|$)/i;

// Ids of the products that have at least one variant with stock, from ONE call
// to Scalev ("products with available quantity > 0"). Checking every variant
// one by one would be hundreds of requests per refresh and gets rate-limited.
// null = Scalev could not be reached.
async function getInStockProductIds(): Promise<Set<string> | null> {
  const key = process.env.SCALEV_API_KEY;
  if (!key) return null;
  const ids = new Set<string>();
  let cursor: string | undefined;
  try {
    for (let page = 0; page < 10; page++) {
      const params = new URLSearchParams({ qty_type: "available_qty", page_size: "100" });
      if (cursor) params.set("next_cursor", cursor);
      const res = await fetch(`${API_BASE}/v3/products?${params}`, {
        headers: { Authorization: `Bearer ${key}` },
        next: { revalidate: 600 },
      });
      if (!res.ok) return null;
      const body = (await res.json()) as { data?: { id: number | string }[]; has_next?: boolean; next_cursor?: string };
      for (const p of body.data ?? []) ids.add(String(p.id));
      if (!body.has_next || !body.next_cursor) break;
      cursor = body.next_cursor;
    }
  } catch {
    return null;
  }
  return ids;
}

function describe(product: { name: string; description?: string; colorVariants?: { name: string }[] }): string {
  const own = product.description?.replace(/\s+/g, " ").trim();
  if (own) return own.slice(0, 4900);
  const colors = product.colorVariants?.map((v) => v.name).join(", ");
  return [`${product.name} dari ${BRAND}.`, colors ? `Pilihan warna: ${colors}.` : ""].filter(Boolean).join(" ");
}

export async function GET() {
  const base = siteConfig.url.replace(/\/$/, "");

  // A feed with nothing in it, or with stock unknown, would make Meta drop or
  // mislabel the whole catalogue, so when Scalev can't be reached answer with
  // an error instead: Meta then keeps the catalogue it already has and tries
  // again at the next fetch.
  const unavailable = () =>
    new Response("Catalogue temporarily unavailable", { status: 503, headers: { "Retry-After": "300" } });

  const [catalog, inStock] = await Promise.all([getMergedCatalog(), getInStockProductIds()]);
  if (!inStock) return unavailable();

  // Meta rejects an item with no image, so those are left out.
  const products = catalog.filter(
    (p) =>
      p.source === "scalev" &&
      p.price > 0 &&
      [p.imageUrl, ...(p.galleryImages ?? [])].some((u) => u && SUPPORTED_IMAGE.test(u)),
  );
  if (products.length === 0) return unavailable();

  const items = products.map((product) => {
    const candidates = [product.imageUrl, ...(product.galleryImages ?? [])].filter((u): u is string => Boolean(u));
    const images = [...new Set(candidates.filter((u) => SUPPORTED_IMAGE.test(u)).map((u) => absolute(base, u)))];
    const categoryLabel = productCategories.find((c) => c.slug === product.category)?.label;

    return `<item>${[
      tag("id", product.id),
      tag("title", product.name),
      tag("description", describe(product)),
      tag("availability", inStock.has(product.id) ? "in stock" : "out of stock"),
      tag("condition", "new"),
      tag("price", `${product.price} IDR`),
      tag("link", `${base}/produk/${product.category}/${product.slug}`),
      tag("image_link", images[0]),
      ...images.slice(1, 10).map((u) => tag("additional_image_link", u)),
      tag("brand", BRAND),
      tag("product_type", categoryLabel),
      tag("shipping_weight", product.weightGrams ? `${product.weightGrams} g` : undefined),
      tag("custom_label_0", product.size),
      tag("custom_label_1", categoryLabel),
    ].join("")}</item>`;
  });

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0"><channel>` +
    `<title>${esc(BRAND)}</title><link>${esc(base)}</link><description>${esc(siteConfig.description)}</description>` +
    items.join("") +
    `</channel></rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=600",
    },
  });
}
