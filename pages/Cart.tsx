
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../store';

const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
         <div className="mb-8 flex justify-center">
            <div className="p-8 bg-white/5 rounded-full">
              <ShoppingBag size={64} className="text-gray-600" />
            </div>
         </div>
         <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
         <p className="text-gray-500 mb-10 max-w-md mx-auto font-light">
           Looks like you haven't added anything to your studio collection yet.
         </p>
         <Link to="/shop" className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold">
           Browse Shop
         </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
       <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>
       
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
             {cart.map(item => (
               <div key={item.id} className="flex gap-6 p-6 bg-[#0a0a0a] rounded-2xl border border-white/5">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-black rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                       <div>
                         <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                         <p className="text-xs text-gray-500 uppercase tracking-widest">{item.category}</p>
                       </div>
                       <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                       </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                       <div className="flex items-center gap-4 bg-black border border-white/10 rounded-lg p-1">
                          <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-white transition-colors"><Minus size={14}/></button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-white transition-colors"><Plus size={14}/></button>
                       </div>
                       <p className="font-bold">৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
               </div>
             ))}
          </div>

          <div className="space-y-8">
             <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold">Order Summary</h3>
                <div className="space-y-4 pt-4 border-t border-white/5">
                   <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>৳{subtotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest">Calculated at checkout</span>
                   </div>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                   <span className="text-lg font-bold">Total</span>
                   <span className="text-2xl font-bold">৳{subtotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                   Checkout <ArrowRight size={18} />
                </button>
             </div>

             <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-start gap-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><ShoppingBag size={20} /></div>
                <div>
                   <h4 className="text-sm font-bold text-blue-400 mb-1">Payment Method</h4>
                   <p className="text-xs text-blue-400/60 leading-relaxed">Only Cash on Delivery (COD) is supported for maximum security.</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Cart;
