
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, setQuantity, totalPrice } = useCart();
  const [lastUpdatedId, setLastUpdatedId] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center flex flex-col items-center justify-center animate-in fade-in duration-1000">
        <div className="mb-10 relative">
          {/* Animated background rings for the icon */}
          <div className="absolute inset-0 bg-gray-50 rounded-full scale-150 opacity-20 animate-ping"></div>
          <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 relative z-10 shadow-inner animate-bounce duration-[3000ms]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
          Your Bag is Empty
        </h1>
        <p className="text-gray-400 mb-12 font-medium max-w-xs mx-auto text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          It looks like you haven't added any precision gear to your studio portfolio yet.
        </p>
        
        <Link 
          to="/shop" 
          className="group relative bg-black text-white px-12 py-5 rounded-full font-bold text-xs tracking-[0.3em] uppercase transition-all hover:bg-gray-800 active:scale-95 inline-flex items-center gap-3 shadow-2xl shadow-black/20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both overflow-hidden"
        >
          <span className="relative z-10">Start Collection</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </Link>
      </div>
    );
  }

  const handleQuantityInput = (id: string, value: string) => {
    const qty = parseInt(value, 10);
    if (!isNaN(qty)) {
      setQuantity(id, qty);
      triggerPulse(id);
    }
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    updateQuantity(id, delta);
    triggerPulse(id);
  };

  const triggerPulse = (id: string) => {
    setLastUpdatedId(id);
    setTimeout(() => setLastUpdatedId(null), 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Shopping Bag</h1>
          <p className="text-gray-400 mt-2 font-medium">Review your selection before checkout.</p>
        </div>
        <div className="hidden md:block">
           <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
             Keep Shopping
           </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div 
              key={item.id} 
              className={`group flex gap-6 p-6 bg-white border border-gray-100 rounded-[2rem] transition-all duration-500 hover:shadow-lg hover:shadow-black/5 animate-in slide-in-from-left-4 ${lastUpdatedId === item.id ? 'ring-1 ring-black/10 bg-gray-50/30' : ''}`}
            >
              <div className="w-24 h-24 sm:w-40 sm:h-40 bg-gray-50 rounded-2xl overflow-hidden shrink-0 transition-transform duration-500 group-hover:scale-[1.02]">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg md:text-xl tracking-tight">{item.name}</h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-gray-300 hover:text-red-500 p-2 -mr-2 transition-colors rounded-full hover:bg-red-50"
                      title="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-end mt-4 gap-4">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100/50">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, -1)} 
                      className="text-gray-400 hover:text-black font-black w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all active:scale-90"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityInput(item.id, e.target.value)}
                      className="text-sm font-bold w-12 text-center bg-transparent border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, 1)} 
                      className="text-gray-400 hover:text-black font-black w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all active:scale-90"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Subtotal</p>
                    <p className={`font-bold text-lg md:text-xl tracking-tighter transition-all duration-300 ${lastUpdatedId === item.id ? 'scale-105' : 'scale-100'}`}>
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-black text-white rounded-[2.5rem] p-10 space-y-8 sticky top-24 shadow-2xl shadow-black/20 animate-in slide-in-from-right-4 duration-700">
            <h3 className="text-xl font-bold tracking-tight pb-6 border-b border-white/10">Order Summary</h3>
            
            <div className="space-y-5 text-sm font-medium">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Items Total</span>
                <span className="font-bold">৳{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                <span className="text-green-500 font-bold tracking-widest uppercase text-[10px]">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Tax (GST)</span>
                <span className="text-gray-400 font-bold">Included</span>
              </div>
              
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-xl font-bold tracking-tight">Total</span>
                <span className="text-3xl font-bold tracking-tighter">৳{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Link 
                to="/checkout" 
                className="group relative flex items-center justify-center w-full bg-white text-black py-5 rounded-full text-center font-bold text-xs tracking-[0.2em] uppercase transition-all hover:bg-gray-100 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Proceed to Checkout</span>
                <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
              
              <p className="text-[10px] text-gray-500 text-center uppercase tracking-[0.2em] font-bold leading-relaxed opacity-60">
                Guaranteed safe checkout with <br /> encrypted 256-bit security
              </p>
            </div>
            
            <div className="flex justify-center gap-4 pt-4 border-t border-white/5 opacity-40">
              <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
              <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
              <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
            </div>
          </div>
          
          <div className="mt-8 p-6 border border-gray-100 rounded-3xl text-center">
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Need Help?</p>
             <p className="text-xs text-gray-500 font-medium">Contact our concierge for <br /> personalized assistance.</p>
             <Link to="/contact" className="text-[10px] font-bold uppercase tracking-widest text-black underline mt-3 inline-block">Consult a specialist</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
