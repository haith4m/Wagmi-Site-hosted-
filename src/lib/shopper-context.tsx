"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { ICustomer, ICart, ICartItem, IProduct } from "@/types/products";

interface ShopperContextValue {
  customer: ICustomer | null;
  cart: ICart | null;
  setCustomer: (customer: ICustomer | null) => void;
  setCart: (cart: ICart | null) => void;
  addToCart: (item: ICartItem) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
}

const ShopperContext = createContext<ShopperContextValue | null>(null);

export function ShopperProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [cart, setCart] = useState<ICart | null>(null);

  const addToCart = useCallback((item: ICartItem) => {
    setCart((prev) => {
      if (!prev) {
        const newCart: ICart = {
          items: [item],
          subtotal: item.productPrice * item.quantity,
          tax: 0,
          total: item.productPrice * item.quantity,
          currency: item.productCurrency,
        };
        return newCart;
      }

      const existingIndex = prev.items.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );

      if (existingIndex >= 0) {
        const updatedItems = [...prev.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + item.quantity,
        };
        const newSubtotal = updatedItems.reduce(
          (sum, i) => sum + i.productPrice * i.quantity,
          0
        );
        return {
          ...prev,
          items: updatedItems,
          subtotal: newSubtotal,
          total: newSubtotal,
        };
      }

      const newItems = [...prev.items, item];
      const newSubtotal = newItems.reduce(
        (sum, i) => sum + i.productPrice * i.quantity,
        0
      );
      return {
        ...prev,
        items: newItems,
        subtotal: newSubtotal,
        total: newSubtotal,
      };
    });
  }, []);

  const removeFromCart = useCallback(
    (productId: string, variantId?: string) => {
      setCart((prev) => {
        if (!prev) return null;
        const filteredItems = prev.items.filter(
          (i) => !(i.productId === productId && i.variantId === variantId)
        );
        if (filteredItems.length === prev.items.length) return prev;
        const newSubtotal = filteredItems.reduce(
          (sum, i) => sum + i.productPrice * i.quantity,
          0
        );
        return {
          ...prev,
          items: filteredItems,
          subtotal: newSubtotal,
          total: newSubtotal,
        };
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantId?: string) => {
      setCart((prev) => {
        if (!prev) return null;
        const updatedItems = prev.items.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity }
            : item
        );
        const removedItems = updatedItems.filter((item) => item.quantity <= 0);
        const newItems = removedItems.length > 0
          ? updatedItems.filter((item) => item.quantity > 0)
          : updatedItems;
        const newSubtotal = newItems.reduce(
          (sum, i) => sum + i.productPrice * i.quantity,
          0
        );
        return {
          ...prev,
          items: newItems,
          subtotal: newSubtotal,
          total: newSubtotal,
        };
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart(null);
  }, []);

  return (
    <ShopperContext.Provider
      value={{
        customer,
        cart,
        setCustomer,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </ShopperContext.Provider>
  );
}

export function useShopper(): ShopperContextValue {
  const context = useContext(ShopperContext);
  if (!context) {
    throw new Error("useShopper must be used within a ShopperProvider");
  }
  return context;
}
