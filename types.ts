
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  features: string[];
  specs: Record<string, string>;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  date: string;
  address: string;
}

export type Category = 
  | 'Earbuds' 
  | 'Headphones' 
  | 'Smart Watch' 
  | 'Speakers' 
  | 'Watches' 
  | 'Mobile Phones' 
  | 'Accessories' 
  | 'Gaming Consoles' 
  | 'Controllers' 
  | 'Camera';
