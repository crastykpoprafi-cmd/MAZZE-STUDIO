
export type Category = 'Watch' | 'Watch Straps' | 'Earbuds' | 'Model' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  specifications: string[];
  stock: number;
  isNewArrival?: boolean;
  isTrending?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  zone: 'Dhaka' | 'Outside Dhaka';
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  userId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isAdmin: boolean;
}
