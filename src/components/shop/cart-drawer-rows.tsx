"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/shop-context";
import { formatPrice } from "@/lib/data/products";

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
