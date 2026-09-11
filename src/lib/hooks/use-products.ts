import { useMemo } from "react";
import type { Product } from "@/lib/data/products";

interface UseProductsOptions {
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  onSale?: boolean;
  sortBy?: "price-asc" | "price-desc" | "name" | "newest";
}

export function useProducts(
  allProducts: Product[],
  options: UseProductsOptions = {},
): Product[] {
  const { category, maxPrice, minPrice, onSale, sortBy } = options;

  return useMemo(() => {
    let filtered = allProducts;

    if (category && category !== "ALL") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= minPrice);
    }

    if (onSale) {
      filtered = filtered.filter((p) => p.sale);
    }

    const sorted = [...filtered];

    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        // Default order is already "newest first" based on catalog order
        break;
      default:
        break;
    }

    return sorted;
  }, [allProducts, category, maxPrice, minPrice, onSale, sortBy]);
}
