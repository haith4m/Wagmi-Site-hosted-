"use client";

import { CATEGORIES } from "@/lib/data/products";
import type { ProductCategory } from "@/lib/data/products";

interface CategoryFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <nav
      aria-label="Filter products by category"
      className="flex flex-wrap gap-2"
    >
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`rounded-sm border px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
            selectedCategory === category
              ? "border-foreground bg-foreground text-background"
              : "border-line bg-transparent text-muted hover:border-foreground/40 hover:text-foreground"
          }`}
          aria-pressed={selectedCategory === category}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}
