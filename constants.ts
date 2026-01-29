
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mazzé Buds Air Pro',
    description: 'Ultra-lightweight earbuds with studio-grade audio, active noise cancellation, and a sleek pebble charging case.',
    price: 12500,
    category: 'Earbuds',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    features: ['ANC 45dB', 'Transparency Mode', '40h Total Playtime', 'IPX5 Water Resistant'],
    specs: { 'Driver': '11mm Graphene', 'Bluetooth': '5.4', 'Latency': '40ms' },
    isFeatured: true
  },
  {
    id: '11',
    name: 'Mazzé Buds Core',
    description: 'Essential audio experience with powerful bass and crystal clear calls for your daily commute.',
    price: 6500,
    category: 'Earbuds',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80&w=800',
    features: ['Deep Bass', 'Dual Mic ENC', '24h Battery', 'Touch Controls'],
    specs: { 'Driver': '10mm Dynamic', 'Bluetooth': '5.3', 'Charging': 'USB-C' }
  },
  {
    id: '2',
    name: 'Mazzé Sonic Max',
    description: 'Precision-engineered over-ear headphones with advanced active noise cancellation and spatial audio.',
    price: 39990,
    category: 'Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    features: ['High-fidelity audio', 'Adaptive EQ', '20-hour battery life', 'Premium leather finish'],
    specs: { 'Driver': '40mm Dynamic', 'Bluetooth': '5.3', 'Charging': 'USB-C Fast Charge' },
    isFeatured: true
  },
  {
    id: '3',
    name: 'Aura Track Pro',
    description: 'Advanced fitness tracker with medical-grade heart rate monitoring and sapphire glass.',
    price: 18900,
    category: 'Smart Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    features: ['ECG & SpO2 sensing', 'Waterproof 5ATM', 'Built-in GPS', 'Sleep scoring'],
    specs: { 'Display': '1.4" AMOLED', 'Battery': 'Up to 14 days', 'Sensors': 'Optical HR' }
  },
  {
    id: '4',
    name: 'Pulse Core 360',
    description: 'Omnidirectional studio-grade speaker with deep bass response and minimal footprint.',
    price: 32000,
    category: 'Speakers',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=800',
    features: ['360° Soundstage', 'Multi-room sync', 'Natural wood finish', 'Lossless streaming'],
    specs: { 'Power': '60W RMS', 'Connectivity': 'Wi-Fi 6, BT 5.2', 'Frequency': '45Hz - 22kHz' }
  },
  {
    id: '5',
    name: 'Chronos Mono',
    description: 'A minimalist mechanical timepiece for those who value analog precision in a digital world.',
    price: 55000,
    category: 'Watches',
    image: 'https://images.unsplash.com/photo-1524592091214-8c6ca0ad061a?auto=format&fit=crop&q=80&w=800',
    features: ['Swiss Movement', 'Sapphire Crystal', '10ATM Water Resistance', 'Stainless Steel 316L'],
    specs: { 'Movement': 'Automatic Caliber', 'Case Size': '40mm', 'Strap': 'Genuine Italian Leather' }
  },
  {
    id: '6',
    name: 'Nexus Phone 1',
    description: 'The ultimate smartphone experience with a minimalist OS and pro-grade camera system.',
    price: 115000,
    category: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    features: ['Pure OS', '50MP Triple Camera', 'LTPO 120Hz Display', 'Titanium Frame'],
    specs: { 'Chipset': 'Snapdragon 8 Gen 3', 'RAM': '12GB LPDDR5X', 'Storage': '256GB/512GB' }
  },
  {
    id: '7',
    name: 'Mazzé Slim Case',
    description: 'Ultra-thin aramid fiber case providing robust protection without the bulk.',
    price: 4500,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800',
    features: ['Aramid Fiber', 'MagSafe Compatible', '0.6mm Thin', 'Soft Touch Finish'],
    specs: { 'Material': 'Aramid Fiber', 'Weight': '12g', 'Texture': 'Matte' }
  },
  {
    id: '8',
    name: 'Mazzé Play Station',
    description: 'The next generation of gaming immersion with lightning-fast SSD and 4K output.',
    price: 75000,
    category: 'Gaming Consoles',
    image: 'https://images.unsplash.com/photo-1605898960764-7bc6002f2674?auto=format&fit=crop&q=80&w=800',
    features: ['4K Ray Tracing', 'DualSense Support', '1TB NVMe SSD', '8K Output Ready'],
    specs: { 'GPU': '10.28 TFLOPS', 'CPU': '8-core Zen 2', 'Memory': '16GB GDDR6' }
  },
  {
    id: '9',
    name: 'Pro Controller X',
    description: 'High-performance controller with hall-effect sensors and customizable paddles.',
    price: 15000,
    category: 'Controllers',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f3580243a?auto=format&fit=crop&q=80&w=800',
    features: ['Hall-Effect Joysticks', 'Mechanical Buttons', 'RGB Accents', 'Wireless 2.4GHz'],
    specs: { 'Polling Rate': '1000Hz', 'Battery': '1200mAh', 'Weight': '210g' }
  },
  {
    id: '10',
    name: 'Vision 4K Studio',
    description: 'Professional-grade mirrorless camera for cinematic video and high-resolution photography.',
    price: 145000,
    category: 'Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    features: ['Full Frame Sensor', 'In-Body Stabilization', '4K 120fps', 'Dual ISO'],
    specs: { 'Resolution': '42.4 MP', 'Mount': 'E-Mount', 'Focus': 'Real-time Eye AF' }
  }
];

export const FAQS = [
  {
    question: 'What is the standard delivery time?',
    answer: 'Orders within Dhaka are typically delivered within 24-48 hours. Outside Dhaka, delivery takes approximately 3-5 business days.'
  },
  {
    question: 'Does Mazzé Studio offer international shipping?',
    answer: 'Currently, we focus on providing premium service within Bangladesh. International shipping is not supported at this time.'
  },
  {
    question: 'What is the warranty policy on gadgets?',
    answer: 'All electronics from Mazzé Studio come with a standard 12-month studio warranty covering manufacturing defects.'
  },
  {
    question: 'Can I track my order in real-time?',
    answer: 'Yes! Use your Tracking ID provided at checkout on our Tracking page to see the real-time status of your acquisition.'
  }
];
