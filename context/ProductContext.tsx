
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

const SUPABASE_URL = 'https://zbubgvwooigvxrroiuqi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_22ahW-yKg4C92J5TP5fGfA_N0aiYnvt';

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  addProduct: (product: Partial<Product>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [localInitialProducts, setLocalInitialProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  const [deletedIds, setDeletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('mazze_deleted_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchDbProducts = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 404) {
          console.info('Mazzé Studio: Products table not found in DB.');
          return;
        }
        throw new Error('Sync failed');
      }
      
      if (Array.isArray(data)) {
        const mapped: Product[] = data.map(item => ({
          ...item,
          id: item.id.toString(),
          price: Number(item.price),
          images: Array.isArray(item.images) ? item.images : JSON.parse(item.images || '[]'),
          specs: typeof item.specs === 'object' ? item.specs : JSON.parse(item.specs || '{}'),
          features: Array.isArray(item.features) ? item.features : JSON.parse(item.features || '[]')
        }));
        setDbProducts(mapped);
      }
    } catch (err) {
      console.warn('Real-time sync currently offline.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDbProducts();
    const interval = setInterval(fetchDbProducts, 15000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('mazze_deleted_ids', JSON.stringify(deletedIds));
  }, [deletedIds]);

  const addProduct = async (productData: Partial<Product>) => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) throw new Error('DB Save Failed');
      await fetchDbProducts();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    const isHardcoded = INITIAL_PRODUCTS.some(p => p.id === id);
    if (isHardcoded) {
      setLocalInitialProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } as Product : p));
      return;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) throw new Error('Update failed');
      await fetchDbProducts();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    const isHardcoded = INITIAL_PRODUCTS.some(p => p.id === id);
    if (isHardcoded) {
      setDeletedIds(prev => [...prev, id]);
      return;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        }
      });
      
      if (response.status === 204 || response.ok) {
        await fetchDbProducts();
      } else {
        const errorText = await response.text();
        throw new Error(`Delete failed: ${errorText}`);
      }
    } catch (err) {
      console.error('Mazzé Studio Product Deletion Error:', err);
      alert('Asset archival failed. Verify database connectivity.');
      throw err;
    }
  };

  const products = [
    ...localInitialProducts.filter(p => !deletedIds.includes(p.id)),
    ...dbProducts
  ];

  return (
    <ProductContext.Provider value={{ products, isLoading, addProduct, updateProduct, deleteProduct, refreshProducts: fetchDbProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
