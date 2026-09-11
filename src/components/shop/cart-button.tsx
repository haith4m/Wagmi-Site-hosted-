"use client";

import { useCart } from "@/lib/shop-context";

export function CartButton() {
  const { cart, open } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={open}
      className="relative rounded-sm border border-line bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 hover:border-foreground/40"
      aria-label={`Open cart, ${itemCount} items`}
    >
      <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
        {itemCount > 0 ? itemCount : ""}
      </span>
      Cart
    </button>
  );
}
