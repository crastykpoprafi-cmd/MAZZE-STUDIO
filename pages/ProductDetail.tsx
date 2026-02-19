
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Shield, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { useApp } from '../store';
import { getSmartStyleAdvice } from '../services/geminiService';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useApp();
  const [styleAdvice, setStyleAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (product) {
      setLoadingAdvice(true);
      getSmartStyleAdvice(product.name).then(advice => {
        setStyleAdvice(advice);
        setLoadingAdvice(false);
      });
    }
  }, [product]);

  if (!product) return <div className="p-24 text-center">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5">
            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square rounded-xl bg-[#0a0a0a] border border-white/5 overflow-hidden opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                  <img src={product.image} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-2 block">{product.category}</span>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-light">৳{product.price.toLocaleString()}</p>
          </div>

          <p className="text-gray-400 text-lg font-light leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 pt-6 border-t border-white/5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Specifications</h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {product.specifications.map((spec, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-center">
                   <div className="w-1.5 h-1.5 bg-white/20 rounded-full mr-3" /> {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Gemini Style Advice */}
          <div className="p-6 bg-[#111] rounded-2xl border border-white/5 relative overflow-hidden group">
             <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Style Assistant</span>
             </div>
             <p className="text-sm text-gray-300 italic">
               {loadingAdvice ? "Generating styling advice..." : styleAdvice}
             </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button 
              onClick={() => {
                addToCart(product);
                navigate('/cart');
              }}
              className="flex-1 bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="px-6 py-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
              <Heart size={20} />
            </button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5">
            <div className="flex items-center gap-4">
               <div className="p-2 bg-white/5 rounded-full"><Truck size={18} className="text-gray-400" /></div>
               <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 leading-tight">Fast Delivery<br/>Islandwide</div>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-2 bg-white/5 rounded-full"><RotateCcw size={18} className="text-gray-400" /></div>
               <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 leading-tight">7-Day<br/>Exchange</div>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-2 bg-white/5 rounded-full"><Shield size={18} className="text-gray-400" /></div>
               <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 leading-tight">12 Month<br/>Warranty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
