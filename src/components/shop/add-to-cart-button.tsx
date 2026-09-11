"use client";

import { useCart } from "@/lib/shop-context";
import type { Product } from "@/lib/data/products";
import { useState } from "react";

interface AddToCartButtonProps {
  product: Product;
  size: string;
  color: string;
  quantity?: number;
}

export function AddToCartButton({
  product,
  size,
  color,
  quantity = 1,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      product,
      size,
      color,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full rounded-sm border py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
        added
          ? "border-accent bg-accent text-accent-ink"
          : "border-foreground bg-foreground text-background hover:bg-foreground/90"
      }`}
    >
      {added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
