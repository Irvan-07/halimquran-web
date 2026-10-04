import type {
  CustomerLoginResult,
  CustomerOrderPage,
  CustomerProfile,
  CustomerTokens,
} from "@/types/customer";
import { API_BASE, storeId, storefrontApiKey } from "./storefront-client";

// Customer-account calls of the Storefront API v3. Like storefront-client.ts
// these run in the browser by design (Scalev: "do not place the Storefront
// API behind your own backend proxy"). Two identity layers are used here:
//  - /public/auth/*       -> publishable storefront key (nobody is signed in yet)
//  - /customers/me/*      -> the customer's own JWT (no storefront key)
// Token storage and refresh live in customer-session.ts.

export class ScalevApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string | null,
    message: string,
  ) {
    super(message);
  }
}

async function parseError(res: Response): Promise<ScalevApiError> {
  let message = "";
  let code: string | null = null;
  try {
    const body = (await res.json()) as { message?: unknown; error_code?: unknown; error?: unknown };
    if (typeof body.message === "string") message = body.message;
    else if (typeof body.error === "string") message = body.error;
    if (typeof body.error_code === "string") code = body.error_code;
  } catch {
    // body was not JSON; fall through to the status-based message
  }
  return new ScalevApiError(res.status, code, message || `Scalev error ${res.status}`);
}

async function publicAuthPost<T>(path: string, body: unknown): Promise<T | null> {
  const res = await fetch(`${API_BASE}/v3/stores/${storeId()}/public/auth${path}`, {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      "X-Scalev-Storefront-Api-Key": storefrontApiKey(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await parseError(res);
  return res.status === 204 ? null : ((await res.json()) as T);
}

async function customerGet<T>(accessToken: string, path: string): Promise<T> {
  const res = await fetch(`${API_BASE}/v3/stores/${storeId()}/customers/me${path}`, {
    credentials: "omit",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw await parseError(res);
  return (await res.json()) as T;
}

export const scalevCustomer = {
  /** Password login; the store may answer with an OTP challenge instead of tokens. */
  async login(email: string, password: string): Promise<CustomerLoginResult> {
    const res = await publicAuthPost<CustomerTokens | { message: string }>("/login", { email, password });
    if (res && "access" in res) return { kind: "tokens", tokens: res };
    return { kind: "otp", message: res?.message ?? "" };
  },

  async verifyOtp(email: string, otp: string): Promise<CustomerTokens> {
    const res = await publicAuthPost<CustomerTokens>("/otp/verify", { email, otp });
    if (!res) throw new ScalevApiError(500, null, "Respons kosong dari Scalev.");
    return res;
  },

  /** Refresh tokens rotate: the returned `refresh` replaces the one sent. */
  async refresh(refresh: string): Promise<CustomerTokens> {
    const res = await publicAuthPost<CustomerTokens>("/jwt/refresh", { refresh });
    if (!res) throw new ScalevApiError(500, null, "Respons kosong dari Scalev.");
    return res;
  },

  async revoke(tokens: string[]): Promise<void> {
    await publicAuthPost("/jwt/blacklist", { tokens });
  },

  /** Always answers 204 whether or not the email has an account. */
  async forgotPassword(email: string): Promise<void> {
    await publicAuthPost("/forget-password", { email });
  },

  async savePassword(token: string, password: string): Promise<void> {
    await publicAuthPost("/save-password", { token, password });
  },

  async getProfile(accessToken: string): Promise<CustomerProfile> {
    const res = await customerGet<{ customer: CustomerProfile }>(accessToken, "");
    return res.customer;
  },

  async listOrders(accessToken: string, cursor?: string | null): Promise<CustomerOrderPage> {
    const query = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
    return customerGet<CustomerOrderPage>(accessToken, `/orders${query}`);
  },
};

/** Plain-Indonesian message for a failed customer call, for showing under a form. */
export function describeCustomerError(e: unknown, context: "login" | "reset" | "other" = "other"): string {
  if (e instanceof ScalevApiError) {
    if (e.status === 429) return "Terlalu banyak percobaan. Tunggu beberapa menit lalu coba lagi.";
    if (context === "login" && (e.status === 401 || e.status === 400)) {
      return e.message && e.status === 400 ? e.message : "Email atau password salah.";
    }
    if (context === "reset" && e.status === 404) {
      return "Tautan ini tidak valid atau sudah kedaluwarsa. Minta tautan baru dari halaman Akun.";
    }
    if (e.status === 400 && e.message) return e.message;
    return "Terjadi kendala di server. Coba lagi sebentar lagi.";
  }
  // fetch() itself failed: offline, blocked, or the origin is not allowed.
  return "Tidak bisa terhubung ke server. Periksa koneksi internet lalu coba lagi.";
}
