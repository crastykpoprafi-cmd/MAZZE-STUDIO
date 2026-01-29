
import React, { useState } from 'react';

const SUPABASE_URL = 'https://zbubgvwooigvxrroiuqi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_22ahW-yKg4C92J5TP5fGfA_N0aiYnvt';

interface StoredOrder {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  total_amount: number;
  product_names: string;
  status: string;
  created_at: string;
}

const Tracking: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    if (!orderId.trim()) return;
    
    setError('');
    setIsLoading(true);
    setOrder(null);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(orderId.trim())}&select=*`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });

      const data = await response.json();

      if (data && data.length > 0) {
        setOrder(data[0]);
      } else {
        setError('Acquisition record not found. Please verify your Tracking ID.');
      }
    } catch (err) {
      console.error('Tracking fetch error:', err);
      setError('Database connection error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-32 animate-in fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Track Your Order</h1>
        <p className="text-gray-500">Live database lookup for your acquisition status.</p>
      </div>

      <div className="bg-gray-50 rounded-[3rem] p-10 space-y-8 border border-gray-100 shadow-sm">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 block px-2">Identification Code</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Order ID (e.g. #MZ-1234)" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              className="bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm shadow-sm flex-1 focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-200 font-bold tracking-widest uppercase"
            />
            <button 
              onClick={handleTrack}
              disabled={isLoading}
              className="bg-black text-white px-10 py-4 rounded-full font-black text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-black/10 disabled:opacity-50"
            >
              {isLoading ? 'Querying...' : 'Locate Package'}
            </button>
          </div>
          {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 px-2 animate-pulse">{error}</p>}
        </div>
      </div>

      {order && (
        <div className="mt-16 animate-in slide-in-from-bottom-8 duration-700">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 h-fit">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-black/10">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl tracking-tighter uppercase">{order.status}</h3>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Cloud Entry: {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="relative pl-10 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                  <div className="relative group">
                    <div className="absolute -left-[32px] w-5 h-5 rounded-full bg-black border-4 border-white transition-transform group-hover:scale-125"></div>
                    <h4 className="font-bold text-sm tracking-tight">Order Confirmed</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">Supabase Record Found</p>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">Your acquisition has been synchronized with the studio mainframe.</p>
                  </div>
                </div>
             </div>

             <div className="space-y-8">
                <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8 pb-4 border-b border-gray-200">Cloud Metadata</h3>
                  <div className="space-y-6">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Receiver</span>
                      <p className="font-bold text-base tracking-tight">{order.first_name} {order.last_name}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Destination</span>
                      <p className="font-bold text-base tracking-tight leading-relaxed">{order.address}, {order.city}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black text-white rounded-[2.5rem] p-10 shadow-2xl shadow-black/20">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6">Acquisition Portfolio</h3>
                  <div className="space-y-4 mb-8">
                    <p className="text-sm font-medium text-gray-300 leading-relaxed">
                      {order.product_names}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Net Value</span>
                    <span className="text-3xl font-bold tracking-tighter">৳{order.total_amount.toLocaleString()}</span>
                  </div>
                </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;
