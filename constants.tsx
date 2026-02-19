
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mazze Edition Watch Series X',
    category: 'Watch',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    description: 'Precision engineering meets timeless elegance. The Series X features a sapphire glass display and military-grade titanium casing.',
    specifications: ['OLED Retina Display', 'Heart Rate Monitor', '7-Day Battery', 'Water Resistant 50m'],
    stock: 12,
    isTrending: true,
  },
  {
    id: '2',
    name: 'Pure Silicone Sport Strap',
    category: 'Watch Straps',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop',
    description: 'Flexible, durable, and ready for any challenge. Our premium silicone straps provide all-day comfort.',
    specifications: ['Medical Grade Silicone', 'Sweat Resistant', 'Universal Fit', 'Magnetic Closure'],
    stock: 45,
    isNewArrival: true,
  },
  {
    id: '3',
    name: 'Mazze Audio Pro Earbuds',
    category: 'Earbuds',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    description: 'Immersive sound quality with active noise cancellation. Experience audio the way it was meant to be heard.',
    specifications: ['Active Noise Cancellation', '30hr Total Battery', 'Transparency Mode', 'Spatial Audio'],
    stock: 8,
    isTrending: true,
  },
  {
    id: '4',
    name: 'Mazze Model M1 Desktop',
    category: 'Model',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop',
    description: 'The pinnacle of desktop performance. The M1 model combines brute force with elegant minimalism.',
    specifications: ['32GB DDR5 RAM', '1TB NVMe SSD', 'NVIDIA RTX Graphics', 'Liquid Cooling'],
    stock: 3,
    isNewArrival: true,
  },
  {
    id: '5',
    name: 'Leather Tech Folio',
    category: 'Accessories',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
    description: 'Organize your digital life in style. Handcrafted from top-grain leather.',
    specifications: ['Genuine Leather', 'Multiple Slots', 'RFID Blocking', 'Slim Design'],
    stock: 20,
  }
];

export const DELIVERY_FEES = {
  dhaka: 80,
  outside: 100
};

export const ADMIN_PIN = '4048';
