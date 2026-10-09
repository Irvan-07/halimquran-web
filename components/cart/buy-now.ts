"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { CartItem } from "@/types/cart";

const KEY = "halimquran_buy_now";
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
function read() {
  try { return window.sessionStorage.getItem(KEY) ?? "[]"; }
  catch { return "[]"; }
}
export function setBuyNowItem(item: Omit<CartItem, "cartItemId">): boolean {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify([{ ...item, cartItemId: "buy-now" }]));
    notify();
    return true;
  } catch { return false; }
}
export function clearBuyNow() {
  try { window.sessionStorage.removeItem(KEY); } catch { /* Storage unavailable. */ }
  notify();
}
export function useBuyNowItems(): CartItem[] {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  return useMemo(() => {
    try { const items = JSON.parse(raw); return Array.isArray(items) ? items : []; }
    catch { return []; }
  }, [raw]);
}
