
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
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
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  total_amount: number;
  product_names: string;
  status: string;
  created_at: string;
  delivery_zone: string;
  postal_code?: string;
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
