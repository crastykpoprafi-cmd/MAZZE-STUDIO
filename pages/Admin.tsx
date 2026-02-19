
import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, 
  Plus, Edit, Trash2, CheckCircle, Clock, Truck, MoreHorizontal, Sparkles
} from 'lucide-react';
import { useApp } from '../store';
import { generateProductDescription } from '../services/geminiService';

const AdminDashboard: React.FC = () => {
  const { isAdmin, orders, products, setProducts, updateOrderStatus, deliveryFees, updateDeliveryFees } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [generating, setGenerating] = useState(false);

  if (!isAdmin) return <Navigate to="/" />;

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    return { totalRevenue, totalOrders: orders.length, pendingOrders, deliveredOrders };
  }, [orders]);

  const chartData = useMemo(() => {
    return orders.slice(0, 7).map(o => ({
      name: o.id.slice(-4),
      total: o.total
    })).reverse();
  }, [orders]);

  const handleSmartGenerate = async () => {
      if (!editingProduct?.name || !editingProduct?.category) {
          alert("Please enter product name and category first.");
          return;
      }
      setGenerating(true);
      const desc = await generateProductDescription(editingProduct.name, editingProduct.category);
      setEditingProduct({...editingProduct, description: desc});
      setGenerating(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct.id === 'new') {
        setProducts([...products, { ...editingProduct, id: Math.random().toString(36).substr(2, 9) }]);
    } else {
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    }
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#050505]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/5 p-6 space-y-8 bg-black">
        <div className="text-xl font-bold tracking-tighter">STUDIO<span className="font-light">CORE</span></div>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <Package size={18} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <ShoppingBag size={18} /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl space-y-2">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Revenue</div>
                  <div className="text-2xl font-bold">৳{stats.totalRevenue.toLocaleString()}</div>
               </div>
               <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl space-y-2">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Orders</div>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
               </div>
               <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl space-y-2 text-yellow-500">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Pending</div>
                  <div className="text-2xl font-bold">{stats.pendingOrders}</div>
               </div>
               <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl space-y-2 text-green-500">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Delivered</div>
                  <div className="text-2xl font-bold">{stats.deliveredOrders}</div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl h-[400px]">
                  <h3 className="font-bold mb-6 flex items-center gap-2"><Clock size={18}/> Recent Sales</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={chartData}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                       <XAxis dataKey="name" stroke="#555" />
                       <YAxis stroke="#555" />
                       <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
                       <Bar dataKey="total" fill="#fff" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl h-[400px]">
                  <h3 className="font-bold mb-6">Fulfillment Trend</h3>
                   <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={chartData}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                       <XAxis dataKey="name" stroke="#555" />
                       <YAxis stroke="#555" />
                       <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
                       <Line type="monotone" dataKey="total" stroke="#fff" strokeWidth={2} dot={{fill: '#fff'}} />
                    </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Products</h2>
              <button 
                onClick={() => setEditingProduct({ id: 'new', name: '', category: 'Watch', price: 0, image: '', description: '', specifications: [], stock: 0 })}
                className="bg-white text-black px-6 py-2 rounded-lg font-bold flex items-center gap-2"
              >
                <Plus size={18} /> Add Product
              </button>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
               <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {products.map(p => (
                       <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                             <div className="w-10 h-10 bg-black rounded overflow-hidden">
                               <img src={p.image} className="w-full h-full object-cover" />
                             </div>
                             <span className="font-medium">{p.name}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{p.category}</td>
                          <td className="px-6 py-4 font-bold">৳{p.price.toLocaleString()}</td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold ${p.stock < 5 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                               {p.stock} Units
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex gap-2">
                                <button onClick={() => setEditingProduct(p)} className="p-2 hover:text-white transition-colors text-gray-500"><Edit size={16}/></button>
                                <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="p-2 hover:text-red-500 transition-colors text-gray-500"><Trash2 size={16}/></button>
                             </div>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Orders</h2>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
               <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Items</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {orders.map(o => (
                       <tr key={o.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-mono text-gray-400">{o.id}</td>
                          <td className="px-6 py-4">
                             <div className="font-medium">{o.customerName}</div>
                             <div className="text-xs text-gray-600">{o.phone}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{o.items.length} items</td>
                          <td className="px-6 py-4 font-bold">৳{o.total.toLocaleString()}</td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                               o.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                               o.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                             }`}>
                               {o.status}
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <select 
                              value={o.status} 
                              onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                              className="bg-black border border-white/10 rounded px-2 py-1 text-xs outline-none focus:border-white/30"
                             >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                             </select>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
           <div className="max-w-2xl space-y-12">
              <section className="space-y-6">
                <h3 className="text-xl font-bold">Delivery Charges</h3>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Inside Dhaka (TK)</label>
                      <input 
                        type="number" 
                        value={deliveryFees.dhaka}
                        onChange={(e) => updateDeliveryFees(parseInt(e.target.value), deliveryFees.outside)}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/30"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Outside Dhaka (TK)</label>
                      <input 
                        type="number" 
                        value={deliveryFees.outside}
                        onChange={(e) => updateDeliveryFees(deliveryFees.dhaka, parseInt(e.target.value))}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/30"
                      />
                   </div>
                </div>
              </section>
           </div>
        )}
      </main>

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6">
           <div className="bg-[#111] border border-white/10 p-8 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
             <h3 className="text-2xl font-bold mb-8">{editingProduct.id === 'new' ? 'Add New Product' : 'Edit Product'}</h3>
             <form onSubmit={handleSaveProduct} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                      <input 
                        value={editingProduct.name}
                        onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-lg p-3" 
                        required
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                      <select 
                        value={editingProduct.category}
                        onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-lg p-3"
                      >
                         <option value="Watch">Watch</option>
                         <option value="Watch Straps">Watch Straps</option>
                         <option value="Earbuds">Earbuds</option>
                         <option value="Model">Model</option>
                         <option value="Accessories">Accessories</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Price (TK)</label>
                      <input 
                        type="number"
                        value={editingProduct.price}
                        onChange={e => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})}
                        className="w-full bg-black border border-white/10 rounded-lg p-3" 
                        required
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Stock Units</label>
                      <input 
                        type="number"
                        value={editingProduct.stock}
                        onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                        className="w-full bg-black border border-white/10 rounded-lg p-3" 
                        required
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                      <button 
                        type="button" 
                        onClick={handleSmartGenerate}
                        disabled={generating}
                        className="text-xs text-blue-400 flex items-center gap-1 hover:underline"
                      >
                         <Sparkles size={12}/> {generating ? "Generating..." : "Smart Generate"}
                      </button>
                   </div>
                   <textarea 
                    value={editingProduct.description}
                    onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg p-3 h-32"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                   <input 
                    value={editingProduct.image}
                    onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg p-3" 
                   />
                </div>
                <div className="flex gap-4 pt-6">
                   <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 py-3 border border-white/10 rounded-xl">Cancel</button>
                   <button type="submit" className="flex-1 py-3 bg-white text-black font-bold rounded-xl">Save Product</button>
                </div>
             </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
