
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { Category, Product, Order } from '../types';

const SUPABASE_URL = 'https://zbubgvwooigvxrroiuqi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_22ahW-yKg4C92J5TP5fGfA_N0aiYnvt';

declare global {
  interface Window {
    html2pdf: any;
  }
}

type Tab = 'dashboard' | 'products' | 'sales' | 'orders';

export default function Admin() {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, refreshProducts } = useProducts();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Earbuds' as Category,
    price: '',
    description: '',
    brand: '',
    model: '',
    color: '',
    warranty: '',
    features: '',
    images: [] as string[]
  });

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); 
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      const data = await response.json();
      
      if (response.ok && Array.isArray(data)) {
        // RESET TIMER: Filter out orders older than 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const validOrders = data.filter(o => {
          const orderDate = new Date(o.created_at);
          return orderDate >= sixMonthsAgo;
        });
        
        setOrders(validOrders);
      }
    } catch (err) {
      console.warn('Orders offline');
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm(`Are you sure you want to permanently remove acquisition record ${id} from the studio registry? This action cannot be undone.`)) return;
    
    try {
      // Precise ID encoding is critical for Supabase IDs containing special characters like '#'
      const response = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        }
      });

      // PostgREST 204 No Content signifies a successful deletion
      if (response.status === 204 || response.ok) {
        setOrders(prev => prev.filter(o => o.id !== id));
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Order deletion error details:', errorData);
        alert(`Registry error: Could not clear record ${id}. Permissions may be restricted.`);
      }
    } catch (err) {
      console.error('Mazzé Registry Connectivity Error:', err);
      alert('Registry synchronization failed. Check network connection.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      const promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      newImages.push(await promise);
    }
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleDownloadInvoice = async (order: Order) => {
    if (!order) return;
    setIsGeneratingPDF(true);
    
    const shipping = order.delivery_zone?.includes('Outside') ? 100 : 80;
    const subtotal = Math.max(0, (order.total_amount || 0) - shipping);
    const vat = subtotal * 0.05;
    const itemsTotal = subtotal - vat;

    const element = document.createElement('div');
    element.id = 'invoice-render-temp';
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '800px';
    element.style.zIndex = '-1000';
    element.style.backgroundColor = '#ffffff';
    element.style.opacity = '1';
    
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 60px; color: #000; background: #fff; width: 800px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; border-bottom: 4px solid #000; padding-bottom: 30px; margin-bottom: 50px;">
          <div>
            <h1 style="font-size: 36px; font-weight: 900; margin: 0; letter-spacing: -2px;">MAZZÉ STUDIO.</h1>
            <p style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 3px; margin-top: 5px;">Premium Tech Registry</p>
          </div>
          <div style="text-align: right;">
            <h2 style="font-size: 22px; margin: 0; font-weight: 900;">INVOICE</h2>
            <p style="font-size: 14px; font-weight: 800; margin: 5px 0;">ID: ${order.id}</p>
            <p style="font-size: 11px; color: #666; margin: 0;">${new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 60px;">
          <div>
            <p style="font-size: 9px; color: #aaa; font-weight: 900; text-transform: uppercase; margin-bottom: 10px;">Ship From</p>
            <p style="font-weight: 900; font-size: 16px; margin: 0;">Mazzé Studio Labs</p>
            <p style="font-size: 13px; color: #555; margin: 5px 0; line-height: 1.5;">Gulshan-2, Road 112<br/>Dhaka 1212, Bangladesh</p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 9px; color: #aaa; font-weight: 900; text-transform: uppercase; margin-bottom: 10px;">Ship To</p>
            <p style="font-weight: 900; font-size: 16px; margin: 0;">${order.first_name} ${order.last_name}</p>
            <p style="font-size: 13px; color: #555; margin: 5px 0; line-height: 1.5;">${order.address}<br/>${order.city}, ${order.postal_code || ''}</p>
            <p style="font-size: 13px; font-weight: 800; margin: 5px 0;">${order.phone}</p>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 60px;">
          <thead>
            <tr style="border-bottom: 2px solid #000;">
              <th style="text-align: left; padding: 15px 10px; font-size: 10px; font-weight: 900; text-transform: uppercase;">Manifest Item Description</th>
              <th style="text-align: right; padding: 15px 10px; font-size: 10px; font-weight: 900; text-transform: uppercase;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 30px 10px; border-bottom: 1px solid #f0f0f0;">
                <p style="font-weight: 800; font-size: 15px; margin: 0;">${order.product_names}</p>
                <p style="font-size: 11px; color: #888; margin-top: 5px;">Studio Certified Asset Acquisition</p>
              </td>
              <td style="padding: 30px 10px; border-bottom: 1px solid #f0f0f0; text-align: right; font-weight: 900; font-size: 15px;">৳${subtotal.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        <div style="display: flex; justify-content: flex-end;">
          <div style="width: 300px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px;">
              <span style="color: #666;">Subtotal</span>
              <span style="font-weight: 700;">৳${itemsTotal.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px;">
              <span style="color: #666;">Tax (VAT 5%)</span>
              <span style="font-weight: 700;">৳${vat.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px;">
              <span style="color: #666;">Logistics (${order.delivery_zone})</span>
              <span style="font-weight: 700;">৳${shipping.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-top: 3px solid #000; padding-top: 20px; margin-top: 20px;">
              <span style="font-weight: 900; font-size: 14px;">TOTAL VALUE</span>
              <span style="font-weight: 900; font-size: 24px; letter-spacing: -1px;">৳${(order.total_amount || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(element);

    const opt = {
      margin: 0,
      filename: `MAZZE_INVOICE_${order.id}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await new Promise(r => setTimeout(r, 200));
      await window.html2pdf().from(element).set(opt).save();
    } catch (e) {
      console.error(e);
    } finally {
      document.body.removeChild(element);
      setIsGeneratingPDF(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ 
      name: '', 
      category: 'Earbuds', 
      price: '', 
      description: '', 
      brand: '', 
      model: '', 
      color: '', 
      warranty: '12 Months Studio Warranty', 
      features: '', 
      images: [] 
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price.toString(),
      description: p.description,
      brand: p.specs.Brand || '',
      model: p.specs.Model || '',
      color: p.specs.Color || '',
      warranty: p.specs.Warranty || '',
      features: Array.isArray(p.features) ? p.features.join(', ') : '',
      images: p.images || []
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert('Please select at least one image.');
      return;
    }
    setIsSaving(true);
    
    const productPayload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      description: formData.description,
      images: formData.images,
      features: formData.features.split(',').map(s => s.trim()).filter(Boolean),
      specs: {
        Brand: formData.brand,
        Model: formData.model,
        Color: formData.color,
        Warranty: formData.warranty
      }
    };

    try {
      if (editingProduct) await updateProduct(editingProduct.id, productPayload);
      else await addProduct(productPayload);
      setIsModalOpen(false);
    } catch (err) {
      alert('Error saving product');
    } finally {
      setIsSaving(false);
    }
  };

  const salesData = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(todayStart);
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);

    let revToday = 0;
    let revYesterday = 0;
    let revThisMonth = 0;
    let revLastMonth = 0;
    let revTotal = 0;

    const categoryRevenue: Record<string, number> = {};

    orders.forEach(o => {
      const orderDate = new Date(o.created_at);
      const amount = o.total_amount || 0;
      revTotal += amount;

      if (orderDate >= todayStart) revToday += amount;
      else if (orderDate >= yesterdayStart && orderDate < yesterdayEnd) revYesterday += amount;

      if (orderDate >= thisMonthStart) revThisMonth += amount;
      else if (orderDate >= lastMonthStart && orderDate < lastMonthEnd) revLastMonth += amount;

      const orderItems = o.product_names?.split(',').map(s => s.trim()) || [];
      orderItems.forEach(itemName => {
        const matchedProduct = products.find(p => itemName.includes(p.name) || p.name.includes(itemName));
        if (matchedProduct) {
          categoryRevenue[matchedProduct.category] = (categoryRevenue[matchedProduct.category] || 0) + (amount / orderItems.length);
        } else {
          categoryRevenue['Uncategorized'] = (categoryRevenue['Uncategorized'] || 0) + (amount / orderItems.length);
        }
      });
    });

    return {
      revToday,
      revYesterday,
      revThisMonth,
      revLastMonth,
      revTotal,
      orderCount: orders.length,
      categoryRevenue: Object.entries(categoryRevenue).sort((a, b) => b[1] - a[1])
    };
  }, [orders, products]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isGeneratingPDF && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-white">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6"></div>
          <p className="font-black uppercase tracking-[0.5em] text-xs">Generating Manifest</p>
        </div>
      )}
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col sticky top-0 h-screen">
        <div className="p-8 font-black text-xl tracking-tighter">MAZZÉ ADMIN</div>
        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'products', label: 'Products' },
            { id: 'sales', label: 'Sales' },
            { id: 'orders', label: 'Orders' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as Tab)} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-gray-400 hover:bg-gray-50'}`}>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-8 border-t">
          <p className="text-[8px] font-black uppercase tracking-widest text-gray-300 mb-4">Retention: 6 Months</p>
          <button onClick={() => navigate('/')} className="w-full text-xs font-bold text-red-500 uppercase hover:text-red-700 transition-colors">Exit Portal</button>
        </div>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tight">{activeTab}</h1>
          {activeTab === 'products' && <button onClick={openAddModal} className="bg-black text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest">New Asset</button>}
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Live Product Feed" value={products.length} />
              <StatCard label="Acquisitions (Last 6M)" value={orders.length} />
              <StatCard label="6-Month Value" value={`৳${salesData.revTotal.toLocaleString()}`} />
            </div>
            
            <section className="bg-white p-10 rounded-[2.5rem] border shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Recent Activity</h3>
               <div className="space-y-4">
                 {orders.slice(0, 5).map(o => (
                   <div key={o.id} className="flex justify-between items-center py-4 border-b last:border-0 border-gray-50">
                     <div>
                       <p className="font-bold text-sm">{o.first_name} {o.last_name}</p>
                       <p className="text-[10px] text-gray-400 uppercase font-black">{new Date(o.created_at).toLocaleDateString()}</p>
                     </div>
                     <p className="font-black text-sm">৳{(o.total_amount || 0).toLocaleString()}</p>
                   </div>
                 ))}
                 {orders.length === 0 && <p className="text-center py-8 text-gray-300 italic text-sm">No activity recorded.</p>}
               </div>
            </section>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Revenue Matrix</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard label="Today" value={`৳${salesData.revToday.toLocaleString()}`} accent />
                <StatCard label="Yesterday" value={`৳${salesData.revYesterday.toLocaleString()}`} />
                <StatCard label="This Month" value={`৳${salesData.revThisMonth.toLocaleString()}`} accent />
                <StatCard label="Previous Month" value={`৳${salesData.revLastMonth.toLocaleString()}`} />
              </div>
            </section>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <section className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Revenue by Category</h3>
                <div className="space-y-6">
                  {salesData.categoryRevenue.map(([cat, rev]) => (
                    <div key={cat} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold tracking-tight">{cat}</span>
                        <span className="font-black text-sm">৳{rev.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-black transition-all duration-1000" 
                          style={{ width: `${salesData.revTotal > 0 ? (rev / salesData.revTotal) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  {salesData.categoryRevenue.length === 0 && (
                    <p className="text-center py-12 text-gray-400 italic text-sm">No categorical data available.</p>
                  )}
                </div>
              </section>

              <section className="bg-black text-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/10 flex flex-col justify-center items-center text-center">
                 <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mb-6">
                   <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Retention Cycle Value</h4>
                 <p className="text-5xl font-black tracking-tighter">৳{salesData.revTotal.toLocaleString()}</p>
                 <p className="mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">6-Month Auto-Pruning Active</p>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-[2rem] border overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr className="text-[10px] font-black uppercase text-gray-400">
                  <th className="px-8 py-6">Product</th>
                  <th className="px-8 py-6">Category</th>
                  <th className="px-8 py-6">Price</th>
                  <th className="px-8 py-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6 font-bold text-sm">{p.name}</td>
                    <td className="px-8 py-6 text-xs text-gray-400 uppercase font-black">{p.category}</td>
                    <td className="px-8 py-6 font-black text-sm">৳{p.price.toLocaleString()}</td>
                    <td className="px-8 py-6 flex justify-center gap-2">
                      <button onClick={() => openEditModal(p)} className="px-4 py-2 bg-gray-50 rounded-lg text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all">Edit</button>
                      <button onClick={async () => { if(confirm('Are you sure you want to delete this product entirely from the website?')) { try { await deleteProduct(p.id); } catch (e) { /* Error handled in context */ } } }} className="px-4 py-2 bg-red-50 text-red-500 rounded-lg text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-[2rem] border overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr className="text-[10px] font-black uppercase text-gray-400">
                  <th className="px-8 py-6">Order ID</th>
                  <th className="px-8 py-6">Customer</th>
                  <th className="px-8 py-6">Amount</th>
                  <th className="px-8 py-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6 text-xs font-bold">{o.id}</td>
                    <td className="px-8 py-6 font-bold text-sm">{o.first_name} {o.last_name}</td>
                    <td className="px-8 py-6 font-black text-sm">৳{(o.total_amount || 0).toLocaleString()}</td>
                    <td className="px-8 py-6 flex justify-center gap-2">
                      <button onClick={() => handleDownloadInvoice(o)} className="p-3 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all" title="Download Invoice">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </button>
                      <button onClick={() => deleteOrder(o.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all" title="Delete Order">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-gray-400 italic text-sm">No active orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            <header className="p-8 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-black uppercase">Catalog Registry</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white rounded-full border shadow-sm hover:scale-110 transition-transform">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </header>
            <form onSubmit={handleSaveProduct} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Product Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none" placeholder="Asset Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Price (৳)</label>
                  <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none" placeholder="Price (৳)" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Category</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Category})} className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none">
                  {['Earbuds', 'Headphones', 'Smart Watch', 'Speakers', 'Watches', 'Mobile Phones', 'Accessories', 'Gaming Consoles', 'Controllers', 'Camera'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Asset Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl text-sm h-32 border-none" placeholder="Description" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Brand</label>
                  <input value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl text-sm border-none" placeholder="Brand" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Model</label>
                  <input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl text-sm border-none" placeholder="Model" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Color</label>
                  <input value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl text-sm border-none" placeholder="Color" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Warranty Policy</label>
                  <input value={formData.warranty} onChange={e => setFormData({...formData, warranty: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl text-sm border-none font-bold" placeholder="e.g. 12 Months Studio Warranty" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Asset Visuals</label>
                <div className="flex flex-wrap gap-4 mb-4">
                  {formData.images.map((img, i) => (
                    <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border">
                      <img src={img} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black/80 text-white p-1 rounded-full">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                  <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" /></svg>
                    <span className="text-[8px] font-black uppercase text-gray-300 mt-2">Upload</span>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Key Features (Comma separated)</label>
                <input value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl text-sm border-none" placeholder="ANC, Bluetooth 5.4, 40h Battery" />
              </div>

              <button disabled={isSaving} type="submit" className="w-full bg-black text-white py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl shadow-black/10 active:scale-95 transition-all">
                {isSaving ? 'Synchronizing Archive...' : 'Confirm Entry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const StatCard = ({ label, value, accent }: { label: string, value: any, accent?: boolean }) => (
  <div className={`bg-white p-10 rounded-[2.5rem] border shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 ${accent ? 'ring-2 ring-black/5 bg-gradient-to-br from-white to-gray-50' : ''}`}>
    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">{label}</h4>
    <p className={`text-3xl font-bold tracking-tighter ${accent ? 'text-black' : 'text-black/80'}`}>{value}</p>
  </div>
);
