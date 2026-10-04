"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { scalevCustomer } from "@/lib/scalev/customer-client";
import {
  customerAccount,
  readSessionRaw,
  saveTokens,
  signOut as endSession,
  subscribeSession,
} from "@/lib/scalev/customer-session";
import type { CustomerProfile } from "@/types/customer";

type AuthStatus = "loading" | "signedOut" | "signedIn";

interface CustomerAuth {
  status: AuthStatus;
  /** Null while it loads (see profileFailed) or when signed out. */
  profile: CustomerProfile | null;
  profileFailed: boolean;
  /** "done" = signed in; "otp" = the store wants the emailed one-time code next. */
  signIn: (email: string, password: string) => Promise<"done" | "otp">;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  retryProfile: () => void;
}

const CustomerAuthContext = createContext<CustomerAuth | null>(null);

export function useCustomerAuth(): CustomerAuth {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be used inside <CustomerAuthProvider>");
  return ctx;
}

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  // `undefined` on the server and during hydration, then the stored session
  // (or null). It also follows sign-ins/outs made in other tabs.
  const sessionRaw = useSyncExternalStore(subscribeSession, readSessionRaw, () => undefined);
  const hasSession = sessionRaw === undefined ? undefined : sessionRaw !== null;

  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [profileFailed, setProfileFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!hasSession) return;
    let cancelled = false;
    customerAccount
      .getProfile()
      .then((p) => {
        if (cancelled) return;
        setProfile(p);
        setProfileFailed(false);
      })
      .catch(() => {
        // A 401 already cleared the session (the page flips to login); anything
        // else (offline, 5xx) leaves the customer a retry button.
        if (!cancelled) setProfileFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [hasSession, attempt]);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await scalevCustomer.login(email, password);
    if (result.kind === "tokens") {
      saveTokens(result.tokens);
      return "done" as const;
    }
    return "otp" as const;
  }, []);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    saveTokens(await scalevCustomer.verifyOtp(email, otp));
  }, []);

  const signOut = useCallback(async () => {
    setProfile(null);
    setProfileFailed(false);
    await endSession();
  }, []);

  const retryProfile = useCallback(() => {
    setProfileFailed(false);
    setAttempt((n) => n + 1);
  }, []);

  const value = useMemo<CustomerAuth>(
    () => ({
      status: hasSession === undefined ? "loading" : hasSession ? "signedIn" : "signedOut",
      profile: hasSession ? profile : null,
      profileFailed: hasSession ? profileFailed : false,
      signIn,
      verifyOtp,
      signOut,
      retryProfile,
    }),
    [hasSession, profile, profileFailed, signIn, verifyOtp, signOut, retryProfile],
  );

  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>;
}
