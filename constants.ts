
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Zenith Pods Pro',
    description: 'Seamless wireless earbuds with zero-latency gaming mode and ultra-transparent ambient mode.',
    price: 21500,
    category: 'Earbuds',
    image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?auto=format&fit=crop&q=80&w=800',
    features: ['Dual micro-drivers', 'IPX5 Sweat resistance', 'Hybrid ANC', 'Voice assistant sync'],
    specs: { 'Latency': '<40ms', 'Driver': 'Dual 6mm Balance Armature', 'Battery': '30h total with case' },
    isFeatured: true
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
    features: ['Swiss Movement', 'Scratch-proof sapphire', 'Brushed steel case', 'Leather strap'],
    specs: { 'Movement': 'Automatic Caliber', 'Case': '38mm', 'Water Resistance': '100m' }
  },
  {
    id: '6',
    name: 'Mazzé Nexus 1',
    description: 'The ultimate minimalist mobile device focused on productivity and privacy.',
    price: 89000,
    category: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    features: ['OLED Display', 'Privacy switch', 'Zero-bloat OS', 'Aluminum unibody'],
    specs: { 'Display': '6.1" OLED', 'Processor': 'Studio Core X1', 'Storage': '256GB' }
  },
  {
    id: '7',
    name: 'Neo Hub Pro',
    description: '10-in-1 Thunderbolt 4 docking station for professional creative workflows.',
    price: 28000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
    features: ['Dual 4K support', '100W Power Delivery', 'SD 4.0 Reader', 'Gigabit Ethernet'],
    specs: { 'Ports': 'Thunderbolt, HDMI, DP, USB-C', 'Material': 'Aluminum Alloy' }
  },
  {
    id: '8',
    name: 'Mazzé Origin Console',
    description: 'Minimalist gaming hub designed for performance and aesthetic integration.',
    price: 65000,
    category: 'Gaming Consoles',
    image: 'https://images.unsplash.com/photo-1605906302474-f60df68a609e?auto=format&fit=crop&q=80&w=800',
    features: ['4K 120FPS Support', 'Ultra-silent cooling', 'Modular storage', 'Studio integration'],
    specs: { 'GPU': '12 TFLOPS', 'Storage': '1TB NVMe SSD', 'Memory': '16GB GDDR6' }
  },
  {
    id: '9',
    name: 'Cortex Pad Elite',
    description: 'Precision gaming controller with mechanical switches and zero-latency haptics.',
    price: 15500,
    category: 'Controllers',
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=800',
    features: ['Mechanical buttons', 'Customizable triggers', 'Hall-effect sticks', '20h Battery'],
    specs: { 'Connectivity': 'Wireless 2.4Ghz', 'Weight': '280g', 'Switches': 'Cortex Mechanical' }
  },
  {
    id: '10',
    name: 'Mazzé Lens One',
    description: 'A compact full-frame mirrorless camera for cinematic daily capture.',
    price: 125000,
    category: 'Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    features: ['4K 60fps RAW', 'In-body stabilization', 'Minimalist UI', 'Fast autofocus'],
    specs: { 'Sensor': '24MP Full Frame', 'Mount': 'M-Mount', 'ISO Range': '100 - 51200' }
  }
];

export const FAQS = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day no-questions-asked return policy for all products in original packaging."
  },
  {
    question: "How long does shipping take?",
    answer: "Domestic orders typically arrive within 2-4 business days. International shipping takes 7-14 business days."
  },
  {
    question: "Are your products under warranty?",
    answer: "Yes, all Mazzé Studio products come with a 12-month manufacturer warranty."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "For business or educational inquiries, please contact our sales team at business@mazze.studio."
  }
];
