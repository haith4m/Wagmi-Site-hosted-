/**
 * WAGMI Club Shop — cart utilities
 *
 * Shared types and helpers for the shop cart.
 * The cart is held in a React context on the client side only.
 */

import type { Product } from "@/lib/data/products";

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  opened: boolean;
}

export function addToCart(cart: CartState, item: CartItem): CartState {
  const next = [...cart.items];
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
  return { ...cart, items: next, opened: true };
}

export function removeFromCart(cart: CartState, idx: number): CartState {
  const next = cart.items.filter((_, i) => i !== idx);
  return { ...cart, items: next };
}

export function updateQuantity(
  cart: CartState,
  idx: number,
  quantity: number,
): CartState {
  const next = [...cart.items];
  if (idx < 0 || idx >= next.length) return cart;
  next[idx] = { ...next[idx], quantity: Math.max(1, quantity) };
  return { ...cart, items: next };
}

export function clearCart(cart: CartState): CartState {
  return { ...cart, items: [], opened: false };
}

export function cartItemCount(cart: CartState): number {
  return cart.items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartItemSubtotal(item: CartItem): number {
  return item.product.price * item.quantity;
}

export function cartTotal(cart: CartState): number {
  return cart.items.reduce((sum, i) => sum + cartItemSubtotal(i), 0);
}

export function sameProductVariant(
  a: CartItem,
  b: Pick<CartItem, "product" | "size" | "color">,
): boolean {
  return (
    a.product.slug === b.product.slug &&
    a.size === b.size &&
    a.color === b.color
  );
}
