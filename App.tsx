
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './store';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/Admin';

const Shop = () => {
    const { products } = useApp();
    // Getting query params for categories
    const hash = window.location.hash;
    const queryStr = hash.includes('?') ? hash.split('?')[1] : '';
    const queryParams = new URLSearchParams(queryStr);
    const categoryFilter = queryParams.get('category');
    
    const filtered = categoryFilter 
        ? products.filter(p => p.category === categoryFilter)
        : products;

    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <h1 className="text-4xl font-bold mb-12">{categoryFilter || 'Shop All'}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {filtered.map(product => (
                    <div key={product.id} className="group cursor-pointer">
                        <a href={`#/product/${product.id}`} className="relative block aspect-square overflow-hidden rounded-2xl bg-[#0a0a0a] mb-4">
                            <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} />
                        </a>
                        <div className="space-y-1">
                            <h3 className="font-medium text-gray-200">{product.name}</h3>
                            <p className="font-bold">৳{product.price.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No products found in this category.
                </div>
            )}
        </div>
    );
};

const UserDashboard = () => {
    const { orders } = useApp();
    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <h1 className="text-4xl font-bold mb-12">Order History</h1>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders placed yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map(o => (
                        <div key={o.id} className="p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl flex justify-between items-center">
                            <div>
                                <p className="font-mono text-xs text-gray-500">{o.id}</p>
                                <p className="font-bold">{o.customerName}</p>
                                <p className="text-sm text-gray-400">{o.items.length} items • ৳{o.total.toLocaleString()}</p>
                            </div>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase tracking-widest">{o.status}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/login" element={<div className="p-24 text-center text-gray-500">Login Feature Coming Soon</div>} />
            <Route path="/track" element={<div className="p-24 text-center text-gray-500">Tracking Feature Coming Soon</div>} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
