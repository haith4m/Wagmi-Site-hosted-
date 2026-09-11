import { CartProvider } from "@/lib/shop-context";
import { ShopperProvider } from "@/lib/shopper-context";
import { CartDrawer } from "@/components/shop/cart-drawer";

export function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <ShopperProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </ShopperProvider>
  );
}
