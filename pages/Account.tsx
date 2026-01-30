
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [selectedId1, setSelectedId1] = useState<string>(products[0]?.id || '');
  const [selectedId2, setSelectedId2] = useState<string>(products[1]?.id || '');
  const [showComparison, setShowComparison] = useState(false);

  const product1 = useMemo(() => products.find(p => p.id === selectedId1), [selectedId1, products]);
  const product2 = useMemo(() => products.find(p => p.id === selectedId2), [selectedId2, products]);

  const handleCompare = () => setShowComparison(true);

  const handleSelectAndCheckout = (product: Product) => {
    addToCart(product);
    navigate('/checkout');
  };

  if (products.length < 2) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold">Catalog too small for comparison.</h1>
        <p className="mt-4 text-gray-400">Add more studio assets to use this mode.</p>
      </div>
    );
  }

  const ComparisonRow = ({ label, val1, val2, isList = false }: { label: string, val1: any, val2: any, isList?: boolean }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 py-10 border-b border-gray-100 items-start">
      <div className="mb-4 md:mb-0"><span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">{label}</span></div>
      <div className="md:px-4">
        {isList ? (
          <ul className="space-y-2">
            {(val1 as string[] || []).map((item, i) => (
              <li key={i} className="text-sm font-medium flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div>{item}</li>
            ))}
          </ul>
        ) : <p className="text-xl font-bold tracking-tight">{val1}</p>}
      </div>
      <div className="md:px-4 mt-8 md:mt-0">
        {isList ? (
          <ul className="space-y-2">
            {(val2 as string[] || []).map((item, i) => (
              <li key={i} className="text-sm font-medium flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div>{item}</li>
            ))}
          </ul>
        ) : <p className="text-xl font-bold tracking-tight">{val2}</p>}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-1000">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">Compare Gear.</h1>
        <p className="text-gray-500 text-lg md:text-xl font-light max-w-xl mx-auto">Technical side-by-side analysis for the collector.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-50 p-10 rounded-[3rem] border">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 block">Asset One</label>
          <select value={selectedId1} onChange={(e) => { setSelectedId1(e.target.value); setShowComparison(false); }} className="w-full bg-white border p-4 rounded-xl text-sm font-bold">
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          {product1 && (
            <div className="mt-8 flex items-center gap-6">
              <img src={product1.images[0]} className="w-24 h-24 rounded-2xl object-cover" />
              <div><p className="text-xs font-black uppercase text-gray-400">{product1.category}</p><h3 className="font-bold text-lg">{product1.name}</h3></div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-10 rounded-[3rem] border">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 block">Asset Two</label>
          <select value={selectedId2} onChange={(e) => { setSelectedId2(e.target.value); setShowComparison(false); }} className="w-full bg-white border p-4 rounded-xl text-sm font-bold">
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          {product2 && (
            <div className="mt-8 flex items-center gap-6">
              <img src={product2.images[0]} className="w-24 h-24 rounded-2xl object-cover" />
              <div><p className="text-xs font-black uppercase text-gray-400">{product2.category}</p><h3 className="font-bold text-lg">{product2.name}</h3></div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mb-32">
        <button onClick={handleCompare} className="bg-black text-white px-16 py-6 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all">Compare Now</button>
      </div>

      {showComparison && product1 && product2 && (
        <div className="bg-white rounded-[3rem] border p-10 md:p-20 shadow-2xl shadow-black/5 animate-in slide-in-from-bottom-8">
          <ComparisonRow label="Price" val1={`৳${product1.price.toLocaleString()}`} val2={`৳${product2.price.toLocaleString()}`} />
          <ComparisonRow label="Features" val1={product1.features} val2={product2.features} isList />
          <ComparisonRow label="Warranty" val1={product1.specs.Warranty || 'Standard'} val2={product2.specs.Warranty || 'Standard'} />
          <div className="mt-20 flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={() => handleSelectAndCheckout(product1)} className="bg-black text-white px-10 py-5 rounded-full text-[10px] font-black uppercase">Select {product1.name}</button>
            <button onClick={() => handleSelectAndCheckout(product2)} className="border border-black px-10 py-5 rounded-full text-[10px] font-black uppercase">Select {product2.name}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
