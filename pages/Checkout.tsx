
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Truck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../store';

const Checkout: React.FC = () => {
  const { cart, deliveryFees, placeOrder, clearCart } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    zone: 'Dhaka' as 'Dhaka' | 'Outside Dhaka'
  });

  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = formData.zone === 'Dhaka' ? deliveryFees.dhaka : deliveryFees.outside;
  const total = subtotal + deliveryCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields.');
      return;
    }

    placeOrder({
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      zone: formData.zone,
      items: cart,
      subtotal,
      deliveryCharge,
      total,
    });

    setIsOrdered(true);
    setTimeout(() => {
        clearCart();
        navigate('/dashboard');
    }, 3000);
  };

  if (isOrdered) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
         <div className="flex justify-center mb-8">
            <div className="p-6 bg-green-500/20 rounded-full text-green-500 animate-bounce">
               <CheckCircle2 size={64} />
            </div>
         </div>
         <h1 className="text-4xl font-bold mb-4">Order Confirmed</h1>
         <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Your order has been placed successfully. Redirecting you to your dashboard...
         </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <button onClick={() => navigate('/cart')} className="flex items-center text-sm text-gray-500 hover:text-white mb-8 transition-colors">
        <ChevronLeft size={16} className="mr-2" /> Back to Cart
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
           <section className="space-y-6">
              <h2 className="text-2xl font-bold">Delivery Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/30" 
                        placeholder="John Doe"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/30" 
                        placeholder="+880 1XXX-XXXXXX"
                      />
                   </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Full Address</label>
                    <textarea 
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/30 h-32 resize-none" 
                      placeholder="Street address, City, Apartment, etc."
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Delivery Zone</label>
                    <div className="grid grid-cols-2 gap-4">
                       <button 
                        type="button"
                        onClick={() => setFormData({...formData, zone: 'Dhaka'})}
                        className={`p-4 rounded-xl border text-sm font-medium flex items-center justify-between transition-all ${formData.zone === 'Dhaka' ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30'}`}
                       >
                         Dhaka <span>৳{deliveryFees.dhaka}</span>
                       </button>
                       <button 
                        type="button"
                        onClick={() => setFormData({...formData, zone: 'Outside Dhaka'})}
                        className={`p-4 rounded-xl border text-sm font-medium flex items-center justify-between transition-all ${formData.zone === 'Outside Dhaka' ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30'}`}
                       >
                         Outside <span>৳{deliveryFees.outside}</span>
                       </button>
                    </div>
                 </div>
                 <button type="submit" className="w-full py-5 bg-white text-black rounded-2xl font-bold text-lg mt-8 hover:bg-gray-200 transition-colors">
                   Confirm Order (COD)
                 </button>
              </form>
           </section>
        </div>

        <div className="lg:pl-12">
           <div className="bg-[#0a0a0a] rounded-3xl border border-white/10 p-8 space-y-8 sticky top-32">
              <h3 className="text-xl font-bold">Review Order</h3>
              <div className="max-h-64 overflow-y-auto pr-4 space-y-4">
                 {cart.map(item => (
                   <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-black rounded-lg overflow-hidden flex-shrink-0">
                           <img src={item.image} className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <p className="font-bold">{item.name}</p>
                            <p className="text-gray-500 text-[10px] uppercase font-bold">Qty: {item.quantity}</p>
                         </div>
                      </div>
                      <p className="font-bold">৳{(item.price * item.quantity).toLocaleString()}</p>
                   </div>
                 ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                 <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-gray-400">
                    <span className="flex items-center gap-2">Shipping <Truck size={14}/></span>
                    <span>৳{deliveryCharge.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/5">
                    <span>Total</span>
                    <span>৳{total.toLocaleString()}</span>
                 </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl text-center">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Payment on Delivery</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
