import type { ScalevGuestCart, ScalevCartItemType } from "@/types/scalev";

// Storefront API v3 client — deliberately NOT server-only. Per
// dev.scalev.com/docs/storefront-api-overview (read 26 Sep 2026): "Do not
// place Storefront API v3 behind your own backend proxy... this API is
// designed for direct client-side usage." So unlike lib/scalev/client.ts
// (business routes, secret key, server-only), every function here runs in
// the browser and uses the PUBLISHABLE `sfpk_...` key, which is safe to
// ship to the client — that's why its env var is NEXT_PUBLIC_-prefixed.
//
// NOT YET LIVE-TESTED: Halim Quran's Scalev plan is currently Unpaid, and
// storefront routes return "Store not found" on an inactive plan
// regardless of key validity (see types/scalev.ts). Only getCart() and
// addCartItem() are implemented so far — they're the two calls the docs
// give a concrete example for. Add more (shipping options, checkout
// summary, checkout, locations, payment methods) following the same
// scalevStorefrontFetch() pattern once there's a real UI calling them and
// a live plan to verify the response shapes against.

const API_BASE = "https://api.scalev.com";
const GUEST_TOKEN_STORAGE_KEY = "halimquran_scalev_guest_token";

function storeId(): string {
  const id = process.env.NEXT_PUBLIC_SCALEV_STORE_ID;
  if (!id) {
    throw new Error(
      "NEXT_PUBLIC_SCALEV_STORE_ID is not set — Scalev storefront integration is not configured yet.",
    );
  }
  return id;
}

function storefrontApiKey(): string {
  const key = process.env.NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY;
  if (!key) {
    throw new Error(
      "NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY is not set — Scalev storefront integration is not configured yet.",
    );
  }
  return key;
}

function readGuestToken(): string | null {
  try {
    return window.localStorage.getItem(GUEST_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeGuestToken(token: string) {
  try {
    window.localStorage.setItem(GUEST_TOKEN_STORAGE_KEY, token);
  } catch {
    // storage may be unavailable (private mode, quota) — safe to ignore
  }
}

/**
 * Core fetch wrapper for /v3/stores/{store_id}/public/* routes. Always
 * `credentials: "omit"` per the docs (guest identity is carried by the
 * X-Scalev-Guest-Token header, not cookies). Persists any returned guest
 * token so the caller's next request reuses the same cart automatically.
 */
async function scalevStorefrontFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const guestToken = readGuestToken();
  const res = await fetch(`${API_BASE}/v3/stores/${storeId()}/public${path}`, {
    ...init,
    credentials: "omit",
    headers: {
      "X-Scalev-Storefront-Api-Key": storefrontApiKey(),
      "Content-Type": "application/json",
      ...(guestToken ? { "X-Scalev-Guest-Token": guestToken } : {}),
      ...init?.headers,
    },
  });

  const returnedGuestToken = res.headers.get("X-Scalev-Guest-Token");
  if (returnedGuestToken) {
    writeGuestToken(returnedGuestToken);
  }

  if (!res.ok) {
    throw new Error(`Scalev storefront API error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export const scalevStorefront = {
  /** GET .../public/cart — creates a new guest cart on first call. */
  async getCart(): Promise<ScalevGuestCart> {
    return scalevStorefrontFetch("/cart");
  },

  /** POST .../public/cart/items */
  async addCartItem(item: {
    type: ScalevCartItemType;
    variant_id: number;
    quantity: number;
  }): Promise<ScalevGuestCart> {
    return scalevStorefrontFetch("/cart/items", {
      method: "POST",
      body: JSON.stringify(item),
    });
  },
};
