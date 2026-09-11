export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  billingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  images: string[];
  categories?: string[];
  variants?: {
    id: string;
    size?: string;
    color?: string;
    price?: number;
  }[];
}

export interface ICartItem {
  productId: string;
  variantId?: string;
  productName: string;
  productPrice: number;
  productCurrency: string;
  image?: string;
  size?: string;
  color?: string;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  subtotal: number;
  tax?: number;
  total: number;
  currency: string;
}
