
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  
  const product = products.find(p => p.id === id);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product, products]);

  // Reset active image when product changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="text-black font-bold underline uppercase tracking-widest text-xs">Return to Collection</button>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Gallery Section */}
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-[3rem] overflow-hidden aspect-square border border-gray-100 shadow-sm relative group">
            {!mainImageLoaded && (
              <div className="absolute inset-0 z-0 overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
            )}
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name} 
              onLoad={() => setMainImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${mainImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} 
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {product.images.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImageIndex(i)}
                  className={`bg-gray-50 rounded-2xl aspect-square overflow-hidden border transition-all duration-500 cursor-pointer ${activeImageIndex === i ? 'border-black ring-2 ring-black/5 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
             ))}
          </div>
        </div>

        {/* Information Section */}
        <div className="flex flex-col py-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
                <span className="h-[1px] w-6 bg-black"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">{product.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-[1.1]">{product.name}</h1>
            <div className="flex items-baseline gap-4">
                <p className="text-4xl font-bold tracking-tighter">৳{product.price.toLocaleString()}</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-50 px-3 py-1 rounded-full">In Stock</span>
            </div>
          </div>
          
          <div className="h-[1px] bg-gray-100 w-full mb-10"></div>
          
          <p className="text-gray-500 leading-relaxed mb-12 text-lg font-light max-w-lg">
            {product.description}
          </p>

          <div className="space-y-6 mb-16">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Key Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium group">
                    <div className="w-1.5 h-1.5 rounded-full bg-black group-hover:scale-150 transition-transform"></div>
                    {feature}
                </div>
                ))}
            </div>
          </div>

          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => { addToCart(product); }}
              className="bg-black text-white py-6 rounded-full font-black text-[11px] tracking-[0.3em] uppercase hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-black/10"
            >
              Add to Bag
            </button>
            <button 
              onClick={handleBuyNow}
              className="border-2 border-black text-black py-6 rounded-full font-black text-[11px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-32 border-t border-gray-100">
        <button 
          onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
          className="w-full flex flex-col md:flex-row md:items-center justify-between py-16 group transition-all"
        >
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 block group-hover:text-black transition-colors">Engineered Data</span>
            <div className="flex items-center gap-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Technical Manifest</h2>
              <div className={`transition-transform duration-500 ${isSpecsExpanded ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium mt-4 md:mt-0 italic">
            {isSpecsExpanded ? 'Collapse Blueprint' : 'View Full Blueprint'}
          </p>
        </button>
        
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 overflow-hidden transition-all duration-700 ease-in-out ${isSpecsExpanded ? 'max-h-[2000px] pb-32 opacity-100' : 'max-h-0 opacity-0'}`}>
          {Object.entries(product.specs).map(([key, val]) => (
            <div key={key} className="group border-b border-gray-50 pb-8">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 group-hover:text-black transition-colors">{key}</h3>
              <p className="font-bold text-xl tracking-tight">{val}</p>
              <div className="w-0 group-hover:w-full h-[1px] bg-black mt-4 transition-all duration-700"></div>
            </div>
          ))}
          <div className="md:col-span-3 pt-12 text-center border-t border-gray-50">
             <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.5em]">Verified by Mazzé Studio Labs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
