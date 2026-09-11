"use client";

import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/shop/product-card";
import { CartButton } from "@/components/shop/cart-button";

export function ShopContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker kicker--beige">WAGMI CLUB SHOP</p>
            <h1 className="font-display mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Wear the
              <br />
              movement.
            </h1>
          </div>
          <CartButton />
        </div>
        <p className="mt-4 max-w-xl text-lg text-muted">
          WAGMI Club clothing, made for the run and the day after. Our first drop is in
          production — sign up or come to a run to hear about it first.
        </p>
      </header>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            First drop
          </h2>
          <span className="text-sm text-muted">{PRODUCTS.length} piece</span>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} priority />
          ))}
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker kicker--beige">SHIPPING &amp; RETURNS</p>
            <h2 className="font-display mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Free shipping on orders over £75.
            </h2>
          </div>
          <p className="max-w-md text-muted">
            UK delivery is free for orders over £75 and takes 3–5 working days. Returns are
            free within 28 days — just email us.
          </p>
        </div>
      </section>
    </div>
  );
}
