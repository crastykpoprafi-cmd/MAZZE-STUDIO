
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const SUPABASE_URL = 'https://zbubgvwooigvxrroiuqi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_22ahW-yKg4C92J5TP5fGfA_N0aiYnvt';
const FORMSPREE_URL = 'https://formspree.io/f/mgoyyqjd';

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState<'inside' | 'outside'>('inside');
  const [trackingId, setTrackingId] = useState('');
  const [copied, setCopied] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const shippingCost = deliveryZone === 'inside' ? 80 : 100;
  const finalTotal = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Generate a unique tracking ID
    const newId = `#MZ-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingId(newId);

    const productListString = cart.map(i => `${i.name} (x${i.quantity})`).join(', ');

    // 1. Prepare Supabase Payload
    const supabasePayload = {
      id: newId,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postal_code: formData.zip,
      product_names: productListString,
      delivery_zone: deliveryZone === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka',
      total_amount: finalTotal,
      status: 'Confirmed'
    };

    // 2. Prepare Formspree Payload
    const formspreePayload = {
      tracking_id: newId,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phone,
      shipping_address: formData.address,
      city: formData.city,
      postal_code: formData.zip,
      products: productListString,
      delivery_zone: deliveryZone === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka',
      total_amount: `৳${finalTotal.toLocaleString()}`,
      order_date: new Date().toLocaleString()
    };

    try {
      // Execute both submissions in parallel
      const [supabaseResponse, formspreeResponse] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(supabasePayload)
        }),
        fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formspreePayload)
        })
      ]);

      if (!supabaseResponse.ok) {
        const errorData = await supabaseResponse.json();
        console.error('Supabase Error Details:', errorData);
        throw new Error('Database sync failed.');
      }

      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Submission Error:', err);
      alert('There was an issue processing your order. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center animate-in zoom-in fade-in duration-700 px-4 bg-white">
        <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mb-10 shadow-2xl shadow-black/20 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Acquisition Successful.</h1>
        <p className="text-gray-400 font-medium max-w-sm text-lg mb-8">Your order has been registered and our team has been notified. Please copy your tracking ID below.</p>
        
        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center gap-4 mb-12 w-full max-w-xs">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Your Tracking ID</span>
          <span className="text-3xl font-bold tracking-widest">{trackingId}</span>
          <button 
            onClick={copyToClipboard}
            className={`mt-2 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full transition-all ${copied ? 'bg-green-500 text-white' : 'bg-black text-white hover:opacity-80'}`}
          >
            {copied ? 'Copied!' : 'Copy ID'}
          </button>
        </div>

        <button 
          onClick={() => navigate('/tracking')}
          className="text-black font-bold underline uppercase tracking-widest text-xs hover:opacity-70 transition-opacity"
        >
          Go to Tracking Page
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="mb-20 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
            <span className="h-[1px] w-8 bg-black"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Acquisition Protocol</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4">Finalize Order.</h1>
        <p className="text-gray-500 font-medium text-lg md:text-xl">
          Complete your acquisition using our premium delivery service.
        </p>
      </header>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7 space-y-24">
          <section className="group">
            <div className="flex items-center justify-between mb-12 border-b-2 border-black/5 pb-8 transition-colors group-hover:border-black">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">01. Delivery Logistics</h3>
                <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">* Mandatory field</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              <div className="space-y-4 transition-transform duration-500 hover:translate-x-1">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black block">First Name *</label>
                <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="e.g. Adnan" className="bg-white border-b-2 border-gray-100 py-4 text-base w-full focus:border-black outline-none transition-all placeholder:text-gray-200 font-medium" />
              </div>
              <div className="space-y-4 transition-transform duration-500 hover:translate-x-1">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black block">Last Name *</label>
                <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="e.g. Chowdhury" className="bg-white border-b-2 border-gray-100 py-4 text-base w-full focus:border-black outline-none transition-all placeholder:text-gray-200 font-medium" />
              </div>
              <div className="sm:col-span-2 space-y-4 transition-transform duration-500 hover:translate-x-1">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black block">Email Address *</label>
                <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="contact@example.com" className="bg-white border-b-2 border-gray-100 py-4 text-base w-full focus:border-black outline-none transition-all placeholder:text-gray-200 font-medium" />
              </div>
              <div className="sm:col-span-2 space-y-5 transition-transform duration-500 hover:translate-x-1 ring-2 ring-black/5 p-8 rounded-3xl bg-gray-50/50">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black block">Primary Contact Number *</label>
                <input 
                  required 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel" 
                  placeholder="+880 1XXX XXXXXX" 
                  className="bg-transparent border-b-2 border-black/10 py-5 text-xl w-full focus:border-black outline-none transition-all placeholder:text-gray-300 font-bold tracking-tight" 
                />
              </div>
              <div className="sm:col-span-2 space-y-4 transition-transform duration-500 hover:translate-x-1">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black block">Shipping Address *</label>
                <input required name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Apartment, building, street address" className="bg-white border-b-2 border-gray-100 py-4 text-base w-full focus:border-black outline-none transition-all placeholder:text-gray-200 font-medium" />
              </div>
              <div className="space-y-4 transition-transform duration-500 hover:translate-x-1">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black block">City *</label>
                <input required name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="Dhaka" className="bg-white border-b-2 border-gray-100 py-4 text-base w-full focus:border-black outline-none transition-all placeholder:text-gray-200 font-medium" />
              </div>
              <div className="space-y-4 transition-transform duration-500 hover:translate-x-1">
                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-black block">Postal Code *</label>
                <input required name="zip" value={formData.zip} onChange={handleInputChange} type="text" placeholder="1212" className="bg-white border-b-2 border-gray-100 py-4 text-base w-full focus:border-black outline-none transition-all placeholder:text-gray-200 font-medium" />
              </div>
            </div>
          </section>

          <section className="animate-in slide-in-from-bottom-4 duration-700 delay-200 space-y-12">
            <div className="flex items-center justify-between border-b-2 border-black/5 pb-8 transition-colors hover:border-black">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">02. Settlement & Zone</h3>
            </div>
            
            <div className="relative overflow-hidden p-10 bg-black text-white rounded-[3rem] shadow-2xl shadow-black/20 group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h4 className="text-2xl font-bold tracking-tighter">Cash on Delivery</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <button
                type="button"
                onClick={() => setDeliveryZone('inside')}
                className={`relative flex items-center justify-between p-8 rounded-[2rem] border-2 transition-all duration-300 ${deliveryZone === 'inside' ? 'border-black bg-gray-50 scale-[1.02]' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <div className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Local</span>
                  <span className="text-xl font-bold tracking-tight">Inside Dhaka</span>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs ${deliveryZone === 'inside' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                  ৳80
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryZone('outside')}
                className={`relative flex items-center justify-between p-8 rounded-[2rem] border-2 transition-all duration-300 ${deliveryZone === 'outside' ? 'border-black bg-gray-50 scale-[1.02]' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <div className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">National</span>
                  <span className="text-xl font-bold tracking-tight">Outside Dhaka</span>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs ${deliveryZone === 'outside' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                  ৳100
                </div>
              </button>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gray-50 rounded-[3rem] p-12 border border-gray-100 relative overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 group">
              <h3 className="text-2xl font-bold tracking-tighter mb-10 pb-6 border-b border-gray-200">Portfolio</h3>
              
              <div className="space-y-6 mb-12 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center animate-in slide-in-from-right-4">
                    <div className="flex flex-col">
                        <span className="text-black font-bold text-sm tracking-tight">{item.name}</span>
                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Quantity: {item.quantity}</span>
                    </div>
                    <span className="font-bold tracking-tighter text-sm">৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-5 mb-10 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center pt-8">
                    <span className="text-xl font-bold tracking-tighter">Total Due</span>
                    <span className="text-4xl font-bold tracking-tighter">৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="group relative w-full bg-black text-white py-6 rounded-full font-black text-[11px] tracking-[0.4em] uppercase transition-all hover:bg-gray-800 active:scale-95 shadow-xl shadow-black/10 flex items-center justify-center overflow-hidden"
              >
                {isProcessing ? (
                   <span className="flex items-center gap-3">
                     <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                     Processing...
                   </span>
                ) : (
                  <>
                    <span className="relative z-10">Confirm Acquisition</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
