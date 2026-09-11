import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/data/products";
import { ShopLayout } from "@/components/shop/shop-layout";
import { CartButton } from "@/components/shop/cart-button";

export const metadata = {
  title: "Product — WAGMI Club",
};

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <ShopLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Shop
        </Link>
        <CartButton />
      </div>

      <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-sm bg-surface-2">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectPosition: "center" }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              No image available
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-background/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted backdrop-blur-sm">
              {product.category}
            </span>
            {product.sale && (
              <span className="rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-ink">
                Sale
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          <p className="mt-3 font-script text-2xl text-muted">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent-ink">
              Price TBC
            </span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-8 border-t border-line pt-8">
            <div className="rounded-sm border border-line bg-surface px-5 py-6">
              <p className="kicker kicker--beige">COMING SOON</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                This piece is still in production. Final pricing, fabric and the drop date
                will be announced at the Monday run and on Instagram — follow
                {" "}
                <span className="font-semibold text-foreground">@wagmiclub_</span> so you
                don&apos;t miss it.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-8">
            <p className="kicker kicker--beige">Product Details</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{product.details}</p>
          </div>

          <div className="mt-8 border-t border-line pt-8">
            <p className="kicker kicker--beige">Shipping &amp; Returns</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Free UK shipping on orders over £75. Delivered in 3–5 working days. Free returns
              within 28 days.
            </p>
          </div>
        </div>
      </div>
      </div>
    </ShopLayout>
  );
}
