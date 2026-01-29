
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedId1, setSelectedId1] = useState<string>(PRODUCTS[0].id);
  const [selectedId2, setSelectedId2] = useState<string>(PRODUCTS[1].id);
  const [showComparison, setShowComparison] = useState(false);

  const product1 = useMemo(() => PRODUCTS.find(p => p.id === selectedId1), [selectedId1]);
  const product2 = useMemo(() => PRODUCTS.find(p => p.id === selectedId2), [selectedId2]);

  const handleCompare = () => {
    setShowComparison(true);
  };

  const handleSelectAndCheckout = (product: Product) => {
    addToCart(product);
    navigate('/checkout');
  };

  const ComparisonRow = ({ label, val1, val2, isList = false }: { label: string, val1: any, val2: any, isList?: boolean }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 py-10 border-b border-gray-100 items-start group">
      <div className="mb-4 md:mb-0">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 group-hover:text-black transition-colors">
          {label}
        </span>
      </div>
      <div className="md:px-4">
        {isList ? (
          <ul className="space-y-2">
            {(val1 as string[]).map((item, i) => (
              <li key={i} className="text-sm font-medium flex items-center gap-2">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl font-bold tracking-tight">{val1}</p>
        )}
      </div>
      <div className="md:px-4 mt-8 md:mt-0">
        {isList ? (
          <ul className="space-y-2">
            {(val2 as string[]).map((item, i) => (
              <li key={i} className="text-sm font-medium flex items-center gap-2">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl font-bold tracking-tight">{val2}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-1000">
      <div className="text-center mb-20">
        <div className="inline-block mb-4">
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 px-6 py-2 border border-gray-100 rounded-full">Compare Mode</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-none">Compare before <br /> you choose.</h1>
        <p className="text-gray-500 text-lg md:text-xl font-light max-w-xl mx-auto">
          Technical side-by-side analysis for the discerning collector. Select your gear below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Selector 1 */}
        <div className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-black/5">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 block">Gadget One</label>
          <select 
            value={selectedId1} 
            onChange={(e) => { setSelectedId1(e.target.value); setShowComparison(false); }}
            className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold tracking-tight focus:ring-1 focus:ring-black outline-none shadow-sm cursor-pointer appearance-none"
          >
            {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          {product1 && (
            <div className="mt-8 flex items-center gap-6 animate-in slide-in-from-left-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 shrink-0">
                <img src={product1.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">{product1.category}</p>
                <h3 className="font-bold text-lg">{product1.name}</h3>
              </div>
            </div>
          )}
        </div>

        {/* Selector 2 */}
        <div className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-black/5">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 block">Gadget Two</label>
          <select 
            value={selectedId2} 
            onChange={(e) => { setSelectedId2(e.target.value); setShowComparison(false); }}
            className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold tracking-tight focus:ring-1 focus:ring-black outline-none shadow-sm cursor-pointer appearance-none"
          >
            {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          {product2 && (
            <div className="mt-8 flex items-center gap-6 animate-in slide-in-from-right-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 shrink-0">
                <img src={product2.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">{product2.category}</p>
                <h3 className="font-bold text-lg">{product2.name}</h3>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mb-32">
        <button 
          onClick={handleCompare}
          className="bg-black text-white px-16 py-6 rounded-full font-black text-xs tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-2xl shadow-black/20 active:scale-95"
        >
          Compare Now
        </button>
      </div>

      {showComparison && product1 && product2 && (
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="bg-white rounded-[3rem] border border-gray-100 p-10 md:p-20 shadow-2xl shadow-black/5">
            <ComparisonRow 
              label="Price Point" 
              val1={`৳${product1.price.toLocaleString()}`} 
              val2={`৳${product2.price.toLocaleString()}`} 
            />
            <ComparisonRow 
              label="Battery Life" 
              val1={product1.specs.Battery || product1.specs['Battery life'] || 'N/A'} 
              val2={product2.specs.Battery || product2.specs['Battery life'] || 'N/A'} 
            />
            <ComparisonRow 
              label="Warranty" 
              val1="12-Month Studio Warranty" 
              val2="12-Month Studio Warranty" 
            />
            <ComparisonRow 
              label="Core Features" 
              val1={product1.features} 
              val2={product2.features} 
              isList
            />
            
            <div className="mt-20 flex flex-col md:flex-row gap-6 justify-center">
              <button 
                onClick={() => handleSelectAndCheckout(product1)}
                className="bg-black text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-80 transition-all active:scale-95 shadow-lg shadow-black/10"
              >
                Select {product1.name}
              </button>
              <button 
                onClick={() => handleSelectAndCheckout(product2)}
                className="border border-black px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all active:scale-95 shadow-lg shadow-black/5"
              >
                Select {product2.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
