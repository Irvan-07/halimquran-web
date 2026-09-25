"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "halimquran_cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "cartItemId">) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function buildCartItemId(item: Omit<CartItem, "cartItemId">): string {
  return [item.slug, item.customization, item.customName ?? ""].join("::");
}

// Cart lives only in the browser for now — there's no backend yet.
// Modeled as an external store (localStorage) via useSyncExternalStore
// rather than effect+setState, so reads stay in sync with writes made
// from any tab without a cascading-render lint violation.
const tabListeners = new Set<() => void>();

function readRaw(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function writeRaw(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage may be unavailable (private mode, quota) — safe to ignore
  }
  // The native "storage" event only fires in *other* tabs; notify this
  // tab's subscribers directly so the UI updates immediately too.
  tabListeners.forEach((listener) => listener());
}

function subscribe(onStoreChange: () => void) {
  tabListeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    tabListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getServerSnapshot(): string {
  return "[]";
}

function parseItems(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // getSnapshot must return the same reference while unchanged — the raw
  // string from localStorage satisfies that; parsing happens separately.
  const raw = useSyncExternalStore(subscribe, readRaw, getServerSnapshot);
  const items = useMemo(() => parseItems(raw), [raw]);

  const addItem: CartContextValue["addItem"] = (newItem) => {
    const cartItemId = buildCartItemId(newItem);
    const existing = items.find((i) => i.cartItemId === cartItemId);
    const next = existing
      ? items.map((i) =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i,
        )
      : [...items, { ...newItem, cartItemId }];
    writeRaw(next);
  };

  const removeItem = (cartItemId: string) => {
    writeRaw(items.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    writeRaw(
      items.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => writeRaw([]);

  const { itemCount, subtotal } = useMemo(
    () => ({
      itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
