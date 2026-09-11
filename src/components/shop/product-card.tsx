import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/data/products";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const primaryImage = product.images[0];

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative block overflow-hidden rounded-sm border border-line bg-surface"
    >
      <div className="aspect-[4/5] overflow-hidden bg-surface-2">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            No image
          </div>
        )}
      </div>

      <div className="absolute top-3 left-3">
        <span className="rounded-full bg-background/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="absolute inset-x-3 bottom-3">
        <p className="text-sm font-medium leading-tight text-background drop-shadow-sm">
          {product.name}
        </p>
        <p className="mt-1 text-[11px] text-background/70 drop-shadow-sm">
          {product.tagline}
        </p>
      </div>

      {product.comingSoon ? (
        <div className="absolute right-3 bottom-3">
          <span className="rounded-full bg-background/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted shadow-sm backdrop-blur-sm">
            Coming soon
          </span>
        </div>
      ) : (
        <div className="absolute right-3 bottom-3">
          <span className="rounded-full bg-background/90 px-2.5 py-0.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>
      )}

      {product.sale && (
        <div className="absolute left-3 bottom-3">
          <span className="rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-ink">
            SALE
          </span>
        </div>
      )}
    </Link>
  );
}
