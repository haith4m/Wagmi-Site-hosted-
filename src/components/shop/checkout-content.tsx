"use client";

import { useState } from "react";
import { useCart } from "@/lib/shop-context";
import { formatPrice } from "@/lib/data/products";
import Link from "next/link";

const FREE_SHIPPING_THRESHOLD = 75;
const SHIPPING_FLAT_RATE = 4.95;

export function CheckoutContent() {
  const { cart, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  const items = cart.items;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const currency = items[0]?.product.currency || "GBP";
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  function placeOrder() {
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-script -rotate-3 text-5xl text-foreground">WAGMI.</p>
        <h1 className="mt-6 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          Order placed.
        </h1>
        <p className="mt-5 text-base leading-7 text-muted">
          This is a demo checkout — nothing was charged. Your gear will be with you in 3–5 working
          days. See you Monday, 7PM, North Greenwich.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-accent-ink transition hover:-translate-y-px hover:bg-accent/85"
          >
            Back to shop <span aria-hidden>→</span>
          </Link>
          <Link
            href="/runs"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-foreground transition hover:border-foreground/60 hover:bg-foreground/5"
          >
            Runs <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-kicker text-[11px] uppercase tracking-[0.24em] text-muted">Checkout</p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          Your cart is empty.
        </h1>
        <p className="mt-5 text-base leading-7 text-muted">
          Nothing to check out yet — the shop is where the movement lives.
        </p>
        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-accent-ink transition hover:-translate-y-px hover:bg-accent/85"
          >
            Browse shop <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="kicker kicker--beige">Checkout</p>
      <h1 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
        Almost there.
      </h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <CheckoutForm onSubmit={placeOrder} />
        <aside>
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            currency={currency}
            onPlaceOrder={placeOrder}
          />
        </aside>
      </div>
    </div>
  );
}

interface CheckoutFormProps {
  onSubmit: () => void;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  return (
    <div className="flex flex-col">
      <section className="border-t border-line pt-8">
        <p className="kicker kicker--beige">Contact</p>
        <form className="mt-4 space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <Field label="Email address">
            <input type="email" required className="cart-input" placeholder="you@example.com" />
          </Field>
          <Field label="Phone (optional)">
            <input type="tel" className="cart-input" placeholder="+44 7700 900000" />
          </Field>
        </form>
      </section>

      <section className="border-t border-line pt-8">
        <p className="kicker kicker--beige">Shipping address</p>
        <form className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name">
              <input type="text" required className="cart-input" placeholder="Alex" />
            </Field>
            <Field label="Last name">
              <input type="text" required className="cart-input" placeholder="Morgan" />
            </Field>
          </div>
          <Field label="Address line 1">
            <input type="text" required className="cart-input" placeholder="22a Riverside Walk" />
          </Field>
          <Field label="Town or city">
            <input type="text" required className="cart-input" placeholder="London" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Postcode">
              <input type="text" required className="cart-input" placeholder="SE10 9AT" />
            </Field>
            <Field label="Country">
              <select className="cart-input"><option value="GB">United Kingdom</option></select>
            </Field>
          </div>
        </form>
      </section>

      <section className="border-t border-line pt-8">
        <p className="kicker kicker--beige">Card details</p>
        <p className="mt-2 text-sm text-muted/60">This is a demo checkout. No card details are collected or stored.</p>
        <div className="mt-4 flex items-center gap-3 rounded-sm border border-line bg-surface px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
          <span className="text-sm text-muted">Demo checkout — click place order to confirm</span>
        </div>
      </section>
    </div>
  );
}

interface OrderSummaryProps {
  items: ReturnType<typeof useCart>["cart"]["items"];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  onPlaceOrder: () => void;
}

export function OrderSummary({ items, subtotal, shipping, total, currency, onPlaceOrder }: OrderSummaryProps) {
  return (
    <div className="flex flex-col">
      <h2 className="font-display text-xl font-black tracking-tight text-foreground">Order summary</h2>
      <ul className="mt-4 divide-y divide-line">
        {items.map((item, index) => (
          <li key={index} className="flex gap-4 py-4">
            <div className="relative h-16 w-16 shrink-0 rounded overflow-hidden bg-surface-2">
              <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/shop/${item.product.slug}`} className="font-medium text-sm text-foreground hover:underline truncate">{item.product.name}</Link>
              <p className="mt-0.5 text-xs text-muted">{item.size && `${item.size} / `}{item.color}{item.quantity > 1 && ` × ${item.quantity}`}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{formatPrice(item.product.price * item.quantity, currency)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between"><span className="text-muted">Subtotal</span><span className="font-medium text-foreground">{formatPrice(subtotal, currency)}</span></div>
        <div className="flex items-center justify-between"><span className="text-muted">Shipping</span><span className="font-medium text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping, currency)}</span></div>
        <div className="flex items-center justify-between border-t border-line pt-2"><span className="font-semibold text-foreground">Total</span><span className="font-display text-xl font-bold text-foreground">{formatPrice(total, currency)}</span></div>
      </div>
      <button onClick={onPlaceOrder} className="mt-8 w-full rounded-sm border border-foreground bg-foreground py-4 text-center text-base font-semibold uppercase tracking-wider text-background hover:bg-foreground/90 transition-colors">Place order</button>
      <p className="mt-4 text-xs text-muted/60">By placing this order you agree to our terms and conditions.</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</label>
      {children}
    </div>
  );
}

export const CART_INPUT_CLASS = "w-full rounded-sm border border-line bg-surface px-4 py-3 text-foreground placeholder-muted/50 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors";
