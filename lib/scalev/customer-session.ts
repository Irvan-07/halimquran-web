import type { CustomerOrderPage, CustomerProfile, CustomerTokens } from "@/types/customer";
import { ScalevApiError, scalevCustomer } from "./customer-client";

// The signed-in customer's session, kept in the browser (Scalev's design:
// "customer access and refresh tokens are browser-held credentials").
// - The access token lives 15 minutes, the refresh token 30 days.
// - Refresh tokens are SINGLE-USE and rotate: re-using an already-rotated one
//   revokes the whole token family and signs the customer out everywhere.
//   So refreshes are serialised (Web Locks across tabs, a shared promise as
//   the fallback) and always re-read storage inside the lock, in case another
//   tab already refreshed.

const STORAGE_KEY = "halimquran_customer_session";
// Refresh a little early so a request never leaves with a token about to expire.
const EXPIRY_SKEW_MS = 30_000;

export interface CustomerSession {
  access: string;
  refresh: string;
  accessExpiresAt: number;
  refreshExpiresAt: number;
}

// Storage can be unavailable (private mode, blocked cookies): keep the session
// in memory for the tab's lifetime instead of failing.
let memorySession: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function readSessionRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return memorySession;
  }
}

function writeSessionRaw(raw: string | null) {
  memorySession = raw;
  try {
    if (raw === null) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // in-memory copy above is the fallback
  }
  emit();
}

/** For useSyncExternalStore: re-render when this tab or another tab changes the session. */
export function subscribeSession(onChange: () => void): () => void {
  listeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function parseSession(raw: string | null): CustomerSession | null {
  if (!raw) return null;
  try {
    const s = JSON.parse(raw) as Partial<CustomerSession>;
    // typeof, not truthiness: an access token marked expired is stored as 0.
    if (
      typeof s.access === "string" &&
      typeof s.refresh === "string" &&
      typeof s.accessExpiresAt === "number" &&
      typeof s.refreshExpiresAt === "number"
    ) {
      return s as CustomerSession;
    }
  } catch {
    // corrupt value: treated as signed out
  }
  return null;
}

export function saveTokens(tokens: CustomerTokens): CustomerSession {
  const now = Date.now();
  const session: CustomerSession = {
    access: tokens.access,
    refresh: tokens.refresh,
    accessExpiresAt: now + tokens.expires_in * 1000,
    refreshExpiresAt: now + tokens.refresh_expires_in * 1000,
  };
  writeSessionRaw(JSON.stringify(session));
  return session;
}

export function clearSession() {
  writeSessionRaw(null);
}

/** Signs out: revokes both tokens at Scalev (best effort) and forgets them locally. */
export async function signOut() {
  const session = parseSession(readSessionRaw());
  clearSession();
  if (session) {
    await scalevCustomer.revoke([session.access, session.refresh]).catch(() => undefined);
  }
}

let refreshInFlight: Promise<CustomerSession | null> | null = null;

async function refreshOnce(): Promise<CustomerSession | null> {
  const current = parseSession(readSessionRaw());
  if (!current) return null;
  // Another tab (or an earlier call) already refreshed while we waited.
  if (current.accessExpiresAt - Date.now() > EXPIRY_SKEW_MS) return current;
  if (current.refreshExpiresAt <= Date.now()) {
    clearSession();
    return null;
  }
  try {
    return saveTokens(await scalevCustomer.refresh(current.refresh));
  } catch (e) {
    // 400/401: the refresh token is no longer valid. Anything else (offline,
    // 5xx) keeps the session so the customer can retry.
    if (e instanceof ScalevApiError && (e.status === 400 || e.status === 401)) clearSession();
    return null;
  }
}

async function refreshSession(): Promise<CustomerSession | null> {
  if (typeof navigator !== "undefined" && navigator.locks) {
    return await navigator.locks.request("halimquran-customer-refresh", () => refreshOnce());
  }
  refreshInFlight ??= refreshOnce().finally(() => {
    refreshInFlight = null;
  });
  return refreshInFlight;
}

async function validAccessToken(): Promise<string | null> {
  const session = parseSession(readSessionRaw());
  if (!session) return null;
  if (session.accessExpiresAt - Date.now() > EXPIRY_SKEW_MS) return session.access;
  return (await refreshSession())?.access ?? null;
}

/**
 * Runs a signed-in request. On 401 it forces one refresh and retries once; if
 * that fails too, the session is dropped (the account page then shows login).
 */
async function withCustomerToken<T>(call: (accessToken: string) => Promise<T>): Promise<T> {
  const token = await validAccessToken();
  if (!token) throw new ScalevApiError(401, null, "Sesi berakhir.");
  try {
    return await call(token);
  } catch (e) {
    if (!(e instanceof ScalevApiError) || e.status !== 401) throw e;
    const stale = parseSession(readSessionRaw());
    if (stale) writeSessionRaw(JSON.stringify({ ...stale, accessExpiresAt: 0 }));
    const next = await refreshSession();
    if (!next) {
      clearSession();
      throw e;
    }
    return call(next.access);
  }
}

export const customerAccount = {
  getProfile: (): Promise<CustomerProfile> => withCustomerToken((t) => scalevCustomer.getProfile(t)),
  listOrders: (cursor?: string | null): Promise<CustomerOrderPage> =>
    withCustomerToken((t) => scalevCustomer.listOrders(t, cursor)),
};
