
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    navigate('/checkout');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 hover:scale-[1.01]">
      {/* Primary Clickable Area */}
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
          {/* Shimmer Loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 z-0 overflow-hidden bg-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
            </div>
          )}
          
          <img 
            src={product.images[0]} 
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          />
          
          {/* Status Badge */}
          {product.isFeatured && (
            <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-sm z-10">
              Studio Pick
            </span>
          )}
        </div>

        <div className="p-7 pb-4">
          <div className="space-y-1 mb-3">
            <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-black">{product.category}</p>
            <h3 className="text-xl md:text-2xl font-bold tracking-tighter text-gray-900 group-hover:text-black transition-colors leading-tight">
              {product.name}
            </h3>
          </div>
          <p className="text-lg font-black tracking-tighter text-black/80">
            ৳{product.price.toLocaleString()}
          </p>
        </div>
      </Link>

      {/* Secondary Actions Area */}
      <div className="p-7 pt-2 mt-auto">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleAddToCart}
            className="bg-black text-white py-4 rounded-full font-black text-[9px] tracking-[0.2em] uppercase transition-all hover:bg-gray-800 active:scale-95 shadow-lg shadow-black/5"
          >
            Add to Bag
          </button>
          <button 
            onClick={handleBuyNow}
            className="border border-black/10 text-black py-4 rounded-full font-black text-[9px] tracking-[0.2em] uppercase transition-all hover:bg-black hover:text-white hover:border-black active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
