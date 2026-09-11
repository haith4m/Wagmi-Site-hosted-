"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/shop-context";
import { formatPrice } from "@/lib/data/products";
export function CartDrawer() {
  const { cart, removeItem, updateQty, clear, close } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (cart.opened) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [cart.opened, close]);

  if (!cart.opened) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />
      <aside
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-line bg-surface shadow-shadow"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-lg uppercase tracking-tight">
            Your Cart
          </h2>
          <button
            onClick={close}
            className="rounded-full p-1 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-surface-2 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-muted">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <p className="text-sm font-medium text-muted">Your cart is empty</p>
              <p className="mt-1 text-xs text-muted/60">Add some WAGMI gear to get started.</p>
            </div>
          ) : (
            <ul>
              {cart.items.map((item, index) => (
                <CartItemRow key={`${item.product.slug}-${item.size}-${item.color}-${index}`} index={index} item={item} onRemove={removeItem} onUpdateQty={updateQty} onViewProduct={close} />
              ))}
            </ul>
          )}
        </div>

        {cart.items.length > 0 && (
          <CartFooter cart={cart} onCheckout={close} onClear={clear} />
        )}
      </aside>
    </>
  );
}

interface CartItemRowProps {
  index: number;
  item: ReturnType<typeof useCart>["cart"]["items"][0];
  onRemove: (idx: number) => void;
  onUpdateQty: (idx: number, qty: number) => void;
  onViewProduct: () => void;
}

function CartItemRow({ index, item, onRemove, onUpdateQty, onViewProduct }: CartItemRowProps) {
  return (
    <li className="flex gap-4 px-6 py-4">
      <div className="relative h-20 w-20 shrink-0 rounded overflow-hidden bg-surface-2">
        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="80px" />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/shop/${item.product.slug}`} className="font-medium text-sm text-foreground hover:underline truncate" onClick={onViewProduct}>
          {item.product.name}
        </Link>
        <p className="mt-0.5 text-xs text-muted">{item.size && `${item.size} / `}{item.color}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => onUpdateQty(index, item.quantity - 1)} className="rounded-full border border-line bg-surface px-2 py-0.5 text-xs text-muted hover:bg-surface-2" aria-label="Decrease quantity">-</button>
            <span className="text-sm font-medium text-foreground">{item.quantity}</span>
            <button onClick={() => onUpdateQty(index, item.quantity + 1)} className="rounded-full border border-line bg-surface px-2 py-0.5 text-xs text-muted hover:bg-surface-2" aria-label="Increase quantity">+</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{formatPrice(item.product.price * item.quantity, item.product.currency)}</span>
            <button onClick={() => onRemove(index)} className="text-xs text-muted hover:text-danger transition-colors" aria-label={`Remove ${item.product.name} from cart`}>Remove</button>
          </div>
        </div>
      </div>
    </li>
  );
}

interface CartFooterProps {
  cart: ReturnType<typeof useCart>["cart"];
  onCheckout: () => void;
  onClear: () => void;
}

function CartFooter({ cart, onCheckout, onClear }: CartFooterProps) {
  const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const currency = cart.items[0]?.product.currency || "GBP";

  return (
    <div className="border-t border-line px-6 py-4">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted">Subtotal</span>
        <span className="font-medium text-foreground">{formatPrice(subtotal, currency)}</span>
      </div>
      <p className="mt-1 text-xs text-muted/60">Shipping and taxes calculated at checkout.</p>
      <div className="mt-4 flex gap-3">
        <Link href="/shop/checkout" className="flex-1 rounded-sm border border-foreground bg-foreground py-3 text-center text-sm font-semibold uppercase tracking-wider text-background hover:bg-foreground/90" onClick={onCheckout}>
          Checkout
        </Link>
        <button onClick={onClear} className="rounded-sm border border-line py-3 text-sm text-muted hover:bg-surface-2 hover:text-foreground">Clear</button>
      </div>
    </div>
  );
}
