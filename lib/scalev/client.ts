import "server-only";
import type {
  ScalevGuestCart,
  ScalevOrder,
  ScalevProduct,
  ScalevProductDetail,
  ScalevPublicCheckoutRequest,
  ScalevPublicOrder,
} from "@/types/scalev";

// Real implementation against Scalev API v3 — base URL, paths, auth
// headers, and (for the business/product routes) actual response shapes
// LIVE-VERIFIED 25 Sep 2026 with a real Restricted read-only key
// (order:read, product:list, product:read). listProducts/getProduct
// against api.scalev.com both returned real Halim Quran catalog data
// during that verification. Storefront (cart/checkout) routes are still
// only docs-verified, not live-tested — no storefront key/store ID exists
// yet. Every call throws a clear error until its required env vars are
// set, so nothing here can misfire by accident.
//
// `import "server-only"` makes an accidental import from a Client Component
// fail the build — these keys must never reach the browser.

const API_BASE = "https://api.scalev.com";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set — Scalev integration is not configured yet.`,
    );
  }
  return value;
}

async function parseOrThrow<T>(res: Response, label: string): Promise<T> {
  if (!res.ok) {
    throw new Error(`Scalev ${label} error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

/** Business routes — privileged, Authorization: Bearer <api_key>. */
async function businessRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const apiKey = requireEnv("SCALEV_API_KEY");
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    // Revalidate every 60s so the catalog stays fresh without hitting the
    // real API on every single page request.
    next: { revalidate: 60 },
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  return parseOrThrow<T>(res, "business API");
}

/** Storefront (public/guest) routes — X-Scalev-Storefront-Api-Key, store-scoped. */
async function storefrontRequest<T>(
  path: string,
  guestToken: string | undefined,
  init?: RequestInit,
): Promise<T> {
  const storefrontKey = requireEnv("SCALEV_STOREFRONT_API_KEY");
  const storeId = requireEnv("SCALEV_STORE_ID");
  const res = await fetch(`${API_BASE}/v3/stores/${storeId}/public${path}`, {
    ...init,
    headers: {
      "X-Scalev-Storefront-Api-Key": storefrontKey,
      "Content-Type": "application/json",
      ...(guestToken ? { "X-Scalev-Guest-Token": guestToken } : {}),
      ...init?.headers,
    },
  });
  return parseOrThrow<T>(res, "storefront API");
}

export const scalev = {
  /**
   * GET /v3/products — business route, requires product:list scope.
   * NOTE: variants here have NO price — use getProduct() for a priced view.
   */
  async listProducts(): Promise<{ data: ScalevProduct[] }> {
    return businessRequest("/v3/products");
  },

  /** GET /v3/products/{id} — business route, requires product:read scope. Variants include real pricing. */
  async getProduct(productId: number | string): Promise<ScalevProductDetail> {
    return businessRequest(`/v3/products/${productId}`);
  },

  /** GET /v3/orders/{id} — business route, requires order:read scope. */
  async getOrder(orderId: string): Promise<ScalevOrder> {
    return businessRequest(`/v3/orders/${orderId}`);
  },

  /** GET .../public/cart — storefront route. Pass the guest token from a prior call to keep the same cart. */
  async getGuestCart(guestToken?: string): Promise<ScalevGuestCart> {
    return storefrontRequest("/cart", guestToken);
  },

  /** POST .../public/checkout — storefront route. Returns a payment_url to redirect the customer to. */
  async createPublicCheckout(
    body: ScalevPublicCheckoutRequest,
    guestToken?: string,
  ): Promise<ScalevPublicOrder> {
    return storefrontRequest("/checkout", guestToken, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};
