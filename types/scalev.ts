// Scalev API v3 types — VERIFIED two ways: against https://dev.scalev.com
// (fetched 25 Sep 2026) AND against LIVE responses from the real API using
// a real (Restricted, read-only) key — see the "list vs detail" split
// below, which the docs pages alone did not make obvious. Two distinct
// auth/route families exist — don't merge them:
//   - "Business" routes (product/order management): Authorization: Bearer
//     <api_key or OAuth JWT>, e.g. GET /v3/products, GET /v3/orders/{id}.
//     SECRET key, server-only — see lib/scalev/client.ts.
//   - "Storefront" (public/guest) routes: X-Scalev-Storefront-Api-Key
//     header (a PUBLISHABLE `sfpk_...` key, safe client-side), store-scoped
//     under /v3/stores/{store_id}/public/... using the store's `unique_id`
//     (NOT the numeric dashboard URL id) as {store_id}. An optional
//     X-Scalev-Guest-Token (UUID, read from a response header, not sent by
//     the caller initially) carries a guest's cart/session across requests.
//     Per dev.scalev.com/docs/storefront-api-overview (read 26 Sep 2026),
//     these routes are meant to be called DIRECTLY from the browser, not
//     proxied through our server — see lib/scalev/storefront-client.ts.
//     Only functions on an active Basic/Pro/Ultimate Scalev plan; an
//     unpaid/inactive plan returns "Store not found" regardless of key
//     validity (Halim Quran's Pro plan is Unpaid as of 26 Sep 2026, so
//     these routes are not yet live-testable).
// Field lists below are what was actually observed; treat any field NOT
// listed here as unconfirmed rather than assuming it's absent — both
// product and variant objects have more fields than modeled (marketing/
// affiliate/LMS-related ones omitted as unlikely to matter for the
// storefront). The storefront cart/checkout shapes below are inferred from
// docs prose and endpoint descriptions, NOT from example JSON payloads —
// treat every field as a best guess until checked against a real response.

export type ScalevItemType =
  | "physical"
  | "digital"
  | "course"
  | "license"
  | "subscription";

// IMPORTANT, confirmed live 25 Sep 2026: GET /v3/products (list) returns
// variants WITHOUT pricing. Only GET /v3/products/{id} (detail) includes
// price/cogs/sku on each variant. Plan accordingly — a catalog view needs
// the detail call (or a per-product fetch) to show a price, not just the list.

/** Variant shape as embedded in the LIST endpoint (GET /v3/products) — no price. */
export interface ScalevProductVariantSummary {
  id: number;
  uuid: string;
  name: string;
  product_name: string;
  /** Not the real SKU (see `sku` on the detail shape) — an internal slug-like id. */
  unique_id: string;
  images: string[];
  item_type: ScalevItemType;
  weight: number;
  metadata?: Record<string, unknown>;
}

/** Variant shape from the DETAIL endpoint (GET /v3/products/{id}) — has real pricing. */
export interface ScalevProductVariantDetail extends ScalevProductVariantSummary {
  /** The actual SKU (distinct from `unique_id`). */
  sku: string;
  fullname: string;
  option1_value?: string;
  option2_value?: string;
  option3_value?: string;
  /** Selling price, IDR, e.g. 109000.00. */
  price: number;
  /** Price before tax. */
  price_bt: number;
  price_mode: string;
  pricing_type: string;
  cogs?: number;
  cogs_bt?: number;
  reseller_price?: number | null;
  reseller_price_bt?: number | null;
  minimum_customer_price?: number | null;
  max_quota?: number | null;
  max_quota_available?: number | null;
  interval?: string;
  interval_count?: number;
  product_id: number;
}

interface ScalevProductBase {
  id: number;
  uuid: string;
  name: string;
  /** URL-safe identifier. */
  slug: string;
  display: string;
  description: string;
  images: string[];
  item_type: ScalevItemType;
  item_type_name: string;
  /** e.g. "active" — full enum not yet confirmed. */
  status: string;
  is_multiple: boolean;
  is_inventory: boolean;
  /** Variant option axes, e.g. "Warna" / "Ukuran" — not a fixed category field. */
  option1_name?: string;
  option2_name?: string;
  option3_name?: string;
  labels: { name: string }[];
  created_at: string;
  last_updated_at: string;
}

/** GET /v3/products response item — variants have NO price (see note above). */
export interface ScalevProduct extends ScalevProductBase {
  variants: ScalevProductVariantSummary[];
}

/** GET /v3/products/{id} response — variants HAVE full pricing. */
export interface ScalevProductDetail extends ScalevProductBase {
  variants: ScalevProductVariantDetail[];
  featured_image_url?: string;
  rich_description?: string;
  variants_count?: number;
}

// ---- Storefront (public/guest) cart ----

export type ScalevCartItemType = "variant" | "bundle_price_option";

export interface ScalevGuestCartLine {
  id: number;
  type: ScalevCartItemType;
  variant_id?: number;
  bundle_price_option_id?: number;
  bundle_price_option_slug?: string;
  bundle_price_option_unique_id?: string;
  quantity: number;
}

export interface ScalevGuestCart {
  id: number;
  item_count: number;
  total: string;
  items: ScalevGuestCartLine[];
}

// ---- Storefront (public/guest) checkout ----

export interface ScalevPublicCheckoutItem {
  type: ScalevCartItemType;
  variant_id: number;
  quantity: number;
}

export interface ScalevPublicCheckoutRequest {
  checkout_intent_token?: string;
  items: ScalevPublicCheckoutItem[];
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address?: string;
  shipping_province?: string;
  shipping_city?: string;
  shipping_subdistrict?: string;
  shipping_postal_code?: string;
  shipping_location_id?: number | string;
  payment_method: string;
  courier_service_id?: number;
  warehouse_unique_id?: string;
  courier_aggregator_code?: string;
  discount_code_code?: string;
  notes?: string;
}

export interface ScalevPublicOrder {
  id: string;
  order_id: string;
  secret_slug: string;
  status: string;
  payment_status: string;
  gross_revenue: number;
  product_price: number;
  shipping_cost: number;
  payment_method: string;
  /** Redirect the customer here to complete payment. */
  payment_url: string;
  orderlines: unknown[];
  customer: unknown;
  destination_address: unknown;
  store: unknown;
}

// ---- Business (privileged) orders ----

export type ScalevOrderStatus =
  | "draft"
  | "pending"
  | "confirmed"
  | "in_process"
  | "ready"
  | "shipped"
  | "completed"
  | "canceled"
  | "rts"
  | "closed";

export type ScalevPaymentStatus = "unpaid" | "paid" | "conflict" | "settled";

export interface ScalevOrderLine {
  id: string;
  product_name: string;
  variant_sku: string;
  quantity: number;
  variant_price: number;
  discount: number;
  weight: number;
  tax_rate: number;
  item_type: ScalevItemType;
}

export interface ScalevDestinationAddress {
  address: string;
  city: string;
  province: string;
  subdistrict: string;
  postal_code: string;
  name: string;
  phone: string;
}

export interface ScalevOrder {
  id: string;
  order_id: string;
  external_id?: string;
  secret_slug: string;
  created_at: string;
  last_updated_at: string;
  status: ScalevOrderStatus;
  payment_status: ScalevPaymentStatus;
  destination_address: ScalevDestinationAddress;
  orderlines: ScalevOrderLine[];
  gross_revenue: number;
  net_revenue: number;
  product_price: number;
  shipping_cost: number;
  customer: { id: string; email: string; name: string; phone: string };
}
