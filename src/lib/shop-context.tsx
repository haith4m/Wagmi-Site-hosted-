"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CartState, CartItem, addToCart, removeFromCart, updateQuantity, clearCart } from "@/lib/shop-cart";

interface CartContextValue {
  cart: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (idx: number) => void;
  updateQty: (idx: number, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({ items: [], opened: false });

  const addItem = useCallback((item: CartItem) => {
    setCart((c) => {
      const next = [...c.items];
      const idx = next.findIndex(
        (i) =>
          i.product.slug === item.product.slug &&
          i.size === item.size &&
          i.color === item.color,
      );
      if (idx >= 0) {
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
      } else {
        next.push(item);
      }
      return { ...c, items: next, opened: true };
    });
  }, []);

  const removeItem = useCallback((idx: number) => {
    setCart((c) => ({ ...c, items: c.items.filter((_, i) => i !== idx) }));
  }, []);

  const updateQty = useCallback((idx: number, qty: number) => {
    setCart((c) => {
      const next = [...c.items];
      if (idx < 0 || idx >= next.length) return c;
      next[idx] = { ...next[idx], quantity: Math.max(1, qty) };
      return { ...c, items: next };
    });
  }, []);

  const clear = useCallback(() => {
    setCart((c) => ({ ...c, items: [], opened: false }));
  }, []);

  const open = useCallback(() => {
    setCart((c) => ({ ...c, opened: true }));
  }, []);

  const close = useCallback(() => {
    setCart((c) => ({ ...c, opened: false }));
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQty, clear, open, close }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
