
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, Category, OrderStatus } from './types';
import { INITIAL_PRODUCTS, DELIVERY_FEES } from './constants';

interface AppContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  // Use indexed access type Order['status'] to retrieve the type correctly
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  deliveryFees: { dhaka: number; outside: number };
  updateDeliveryFees: (dhaka: number, outside: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deliveryFees, setDeliveryFees] = useState(DELIVERY_FEES);

  // Persistence
  useEffect(() => {
    const savedOrders = localStorage.getItem('mazze_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    
    const savedProducts = localStorage.getItem('mazze_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));

    const savedFees = localStorage.getItem('mazze_fees');
    if (savedFees) setDeliveryFees(JSON.parse(savedFees));
  }, []);

  useEffect(() => {
    localStorage.setItem('mazze_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
      localStorage.setItem('mazze_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
      localStorage.setItem('mazze_fees', JSON.stringify(deliveryFees));
  }, [deliveryFees]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      userId: user?.id,
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  // Correctly type the status parameter using OrderStatus
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const login = (email: string) => {
    setUser({ id: 'u1', email, name: email.split('@')[0], isAdmin: false });
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const updateDeliveryFees = (dhaka: number, outside: number) => {
      setDeliveryFees({ dhaka, outside });
  };

  return (
    <AppContext.Provider value={{
      products, setProducts, cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      orders, placeOrder, updateOrderStatus, user, login, logout, isAdmin, setIsAdmin,
      deliveryFees, updateDeliveryFees
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
