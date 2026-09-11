import { Suspense } from "react";
import { ShopLayout } from "@/components/shop/shop-layout";
import { ShopContent } from "@/components/shop/shop-content";

export const metadata = {
  title: "Shop — WAGMI Club",
  description: "WAGMI Club shop — wear the movement.",
};

export default function ShopPage() {
  return (
    <ShopLayout>
      <Suspense fallback={<ShopSkeleton />}>
        <ShopContent />
      </Suspense>
    </ShopLayout>
  );
}

function ShopSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-10 w-48 animate-pulse rounded bg-surface-2" />
        <div className="mt-3 h-5 w-64 animate-pulse rounded bg-surface-2" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] rounded-sm border border-line bg-surface-2 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
