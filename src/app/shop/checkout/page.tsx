import { ShopLayout } from "@/components/shop/shop-layout";
import { CheckoutContent } from "@/components/shop/checkout-content";

export const metadata = {
  title: "Checkout — WAGMI Club",
};

export default function CheckoutPage() {
  return (
    <ShopLayout>
      <CheckoutContent />
    </ShopLayout>
  );
}

