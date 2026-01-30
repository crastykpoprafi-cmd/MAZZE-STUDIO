
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery, products]);

  const handleSuggestionClick = (id: string) => {
    navigate(`/product/${id}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const menuCategories = [
    { name: 'Earbuds', icon: 'M8 12h8' },
    { name: 'Headphones', icon: 'M12 1h1' },
    { name: 'Smart Watch', icon: 'M12 1h1' },
    { name: 'Speakers', icon: 'M12 1h1' },
    { name: 'Watches', icon: 'M12 1h1' },
    { name: 'Mobile Phones', icon: 'M12 1h1' },
    { name: 'Accessories', icon: 'M12 1h1' },
    { name: 'Gaming Consoles', icon: 'M12 1h1' },
    { name: 'Controllers', icon: 'M12 1h1' },
    { name: 'Camera', icon: 'M12 1h1' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            <div className="flex items-center gap-2">
              <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <div className="w-6 h-6 flex flex-col justify-center gap-1.5 px-0.5">
                  <span className={`h-0.5 bg-black rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 w-5' : 'w-5'}`}></span>
                  <span className={`h-0.5 bg-black rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                  <span className={`h-0.5 bg-black rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 w-5' : 'w-3'}`}></span>
                </div>
              </button>
              <button onClick={toggleSearch} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>

            <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-black text-2xl tracking-tighter">MAZZÉ STUDIO</Link>

            <div className="flex items-center space-x-2">
              <Link to="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </Link>
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {totalItems > 0 && <span className="absolute top-0 right-0 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black">{totalItems}</span>}
              </Link>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="absolute top-0 left-0 w-full bg-white z-[70] shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="max-w-7xl mx-auto px-8 py-6">
              <div className="flex items-center gap-4 h-14">
                <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
                  <input ref={searchInputRef} type="text" placeholder="Search studio..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent border-none text-2xl focus:ring-0 placeholder-gray-200 font-bold" />
                </form>
                <button onClick={toggleSearch} className="p-3 hover:bg-gray-100 rounded-full"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              {searchQuery.trim() !== '' && (
                <div className="mt-4 space-y-2">
                  {suggestions.map(item => (
                    <button key={item.id} onClick={() => handleSuggestionClick(item.id)} className="w-full text-left p-3 hover:bg-gray-50 flex items-center gap-4 rounded-xl">
                      <img src={item.images[0]} className="w-10 h-10 rounded-lg object-cover" />
                      <div><p className="text-sm font-bold">{item.name}</p><p className="text-[10px] text-gray-400 uppercase font-black">{item.category}</p></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={toggleMenu}></div>
          <div className="relative w-[400px] max-w-[90vw] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-500 overflow-y-auto">
            <div className="p-8 flex justify-between items-center border-b">
              <span className="text-2xl font-black tracking-tighter">MAZZÉ</span>
              <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-full"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <nav className="p-8 space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] uppercase font-black text-gray-300 tracking-widest">Navigation</p>
                <Link onClick={toggleMenu} to="/shop" className="text-4xl font-bold tracking-tighter block">Collection</Link>
                <Link onClick={toggleMenu} to="/tracking" className="text-4xl font-bold tracking-tighter block text-gray-300 hover:text-black">Tracking</Link>
                <Link onClick={toggleMenu} to="/contact" className="text-4xl font-bold tracking-tighter block text-gray-300 hover:text-black">Contact Us</Link>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase font-black text-gray-300 tracking-widest">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {menuCategories.map(cat => (
                    <Link key={cat.name} onClick={toggleMenu} to={`/shop?category=${cat.name}`} className="p-4 bg-gray-50 rounded-2xl font-bold text-sm hover:bg-black hover:text-white transition-all">{cat.name}</Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
