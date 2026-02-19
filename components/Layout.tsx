
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, Heart, ChevronRight, Lock } from 'lucide-react';
import { useApp } from '../store';
import { ADMIN_PIN } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, user, isAdmin, setIsAdmin } = useApp();
  const navigate = useNavigate();

  const handleAdminAuth = () => {
    if (pinInput === ADMIN_PIN) {
      setIsAdmin(true);
      setShowAdminPin(false);
      setPinInput('');
      navigate('/admin');
    } else {
      alert('Invalid PIN');
    }
  };

  const categories = ['Watch', 'Watch Straps', 'Earbuds', 'Model', 'Accessories'];

  return (
    <nav className="fixed w-full z-50 apple-blur border-b border-white/10 top-0">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Hamburger */}
        <div className="flex items-center gap-6">
          <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-white hover:text-gray-400 transition-colors">
            <Menu size={20} />
          </button>
          
          <Link to="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            MAZZE<span className="font-light">STUDIO</span>
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-xs font-medium tracking-widest uppercase text-gray-400">
           {categories.map(cat => (
             <Link key={cat} to={`/shop?category=${cat}`} className="hover:text-white transition-colors">
                {cat}
             </Link>
           ))}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5">
          <div className="relative group hidden sm:block">
            <Search size={18} className="text-gray-400 group-hover:text-white transition-colors cursor-pointer" />
          </div>
          <Link to="/cart" className="relative text-white hover:text-gray-400 transition-colors">
            <ShoppingCart size={20} strokeWidth={1.5} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>
          <Link to={user ? "/dashboard" : "/login"} className="text-white hover:text-gray-400 transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Side Hamburger Menu */}
      <div className={`fixed inset-0 z-[60] bg-black/95 transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
             <span className="text-2xl font-bold">MAZZE</span>
             <button onClick={() => setIsOpen(false)} className="p-2 border border-white/10 rounded-full">
                <X size={24} />
             </button>
          </div>

          <div className="flex-1 space-y-6">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest border-b border-white/10 pb-2">Categories</p>
            {categories.map(cat => (
              <Link key={cat} to={`/shop?category=${cat}`} onClick={() => setIsOpen(false)} className="block text-3xl font-light hover:translate-x-2 transition-transform">
                {cat}
              </Link>
            ))}
            
            <div className="pt-10 space-y-4">
              <Link to="/track" onClick={() => setIsOpen(false)} className="flex items-center text-gray-400 hover:text-white transition-colors">
                Track Order <ChevronRight size={16} className="ml-2" />
              </Link>
              <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center text-gray-400 hover:text-white transition-colors">
                Wishlist <ChevronRight size={16} className="ml-2" />
              </Link>
              <button 
                onClick={() => { setIsOpen(false); setShowAdminPin(true); }}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                Admin Panel <Lock size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin PIN Dialog */}
      {showAdminPin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-6">
           <div className="bg-[#111] border border-white/10 p-8 rounded-2xl w-full max-w-sm">
             <h3 className="text-xl font-bold mb-4 text-center">Admin Access</h3>
             <p className="text-gray-500 text-sm text-center mb-6">Enter the 4-digit PIN to access administrative features.</p>
             <input 
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-lg p-4 text-center text-2xl tracking-[1em] focus:border-white outline-none mb-6"
              placeholder="****"
             />
             <div className="flex gap-4">
                <button onClick={() => setShowAdminPin(false)} className="flex-1 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleAdminAuth} className="flex-1 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">Verify</button>
             </div>
           </div>
        </div>
      )}
    </nav>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-black border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h4 className="text-xl font-bold">MAZZE STUDIO</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Curating the finest essential gear for the modern digital nomad. 
              Luxury meets functionality in every piece.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Shop</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/shop?category=Watch">Watches</Link></li>
              <li><Link to="/shop?category=Earbuds">Audio</Link></li>
              <li><Link to="/shop?category=Model">Models</Link></li>
              <li><Link to="/shop?category=Accessories">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Company</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Stay Connected</h5>
            <p className="text-gray-500 text-sm mb-4">Subscribe for exclusive early access to drops.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/30" />
              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} MAZZE STUDIO. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
