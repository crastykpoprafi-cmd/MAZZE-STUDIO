
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../constants';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

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
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSuggestionClick = (id: string) => {
    navigate(`/product/${id}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const menuCategories = [
    { 
      name: 'Earbuds', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 11a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3v-2Z" />
          <path d="M14 11a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3v-2Z" />
          <path d="M10 16v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2" />
        </g>
      )
    },
    { 
      name: 'Headphones', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 14v-2a7 7 0 0 1 14 0v2" />
          <rect x="4" y="14" width="3" height="5" rx="1" />
          <rect x="17" y="14" width="3" height="5" rx="1" />
          <path d="M7 16.5h10" strokeDasharray="1 2" />
        </g>
      )
    },
    { 
      name: 'Smart Watch', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="7" width="10" height="10" rx="2.5" />
          <path d="M9 7V4h6v3M9 17v3h6v-3" />
          <circle cx="12" cy="12" r="2" strokeWidth="1" />
          <path d="M12 11v1h1" strokeWidth="1" />
        </g>
      )
    },
    { 
      name: 'Speakers', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <circle cx="12" cy="7" r="2" />
          <circle cx="12" cy="15" r="3.5" />
          <circle cx="12" cy="15" r="1.5" strokeWidth="0.8" />
        </g>
      )
    },
    { 
      name: 'Watches', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="7" />
          <path d="M12 9v3l2 2" />
          <path d="M10 5V2h4v3M10 19v3h4v-3" />
        </g>
      )
    },
    { 
      name: 'Mobile Phones', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="2" width="10" height="20" rx="3" />
          <path d="M11 4h2" />
          <circle cx="12" cy="19" r="1" />
        </g>
      )
    },
    { 
      name: 'Accessories', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20" strokeDasharray="2 2" />
          <rect x="8" y="8" width="8" height="8" rx="2" />
          <path d="M10 12h4M12 10v4" />
        </g>
      )
    },
    { 
      name: 'Gaming Consoles', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="5" width="12" height="14" rx="2" />
          <rect x="8" y="7" width="8" height="1" rx="0.5" fill="currentColor" />
          <path d="M9 16h6" />
        </g>
      )
    },
    { 
      name: 'Controllers', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8h12a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z" />
          <circle cx="7" cy="13" r="1.5" />
          <path d="M16 12h2M17 11v2" />
        </g>
      )
    },
    { 
      name: 'Camera', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <path d="M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <circle cx="12" cy="13" r="3.5" />
          <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
        </g>
      )
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={toggleMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                aria-label="Toggle Menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center gap-1.5 px-0.5">
                  <span className={`h-0.5 bg-black rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 w-5' : 'w-5'}`}></span>
                  <span className={`h-0.5 bg-black rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                  <span className={`h-0.5 bg-black rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 w-5' : 'w-3'}`}></span>
                </div>
              </button>

              <button 
                onClick={toggleSearch}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <div className="hidden lg:flex ml-4 space-x-8 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">
                <Link to="/shop" className="hover:text-black transition-colors">Collection</Link>
                <Link to="/tracking" className="hover:text-black transition-colors">Track Your Orders</Link>
              </div>
            </div>

            <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center group">
              <span className="text-2xl font-black tracking-tighter text-black transition-transform group-hover:scale-105 whitespace-nowrap">MAZZÉ STUDIO</span>
            </Link>

            <div className="flex items-center space-x-1 sm:space-x-3">
              <Link to="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Compare Mode">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </Link>

              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" aria-label="Cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="absolute top-0 left-0 w-full bg-white z-[70] shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center gap-4 h-14">
                <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Search for precision tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-2xl focus:ring-0 placeholder-gray-200 font-bold tracking-tight"
                  />
                </form>
                <button 
                  onClick={toggleSearch}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Real-time Suggestions Dropdown in Navbar */}
              {searchQuery.trim() !== '' && (
                <div className="mt-4 border-t border-gray-50 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-w-xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Quick Results</p>
                    <div className="grid grid-cols-1 gap-2">
                      {suggestions.length > 0 ? (
                        suggestions.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSuggestionClick(item.id)}
                            className="w-full text-left p-3 hover:bg-gray-50 flex items-center gap-4 transition-all rounded-2xl group border border-transparent hover:border-gray-100"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-50">
                              <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-black group-hover:translate-x-1 transition-transform">{item.name}</p>
                              <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-black">{item.category}</p>
                            </div>
                            <p className="text-xs font-bold tracking-tighter">৳{item.price.toLocaleString()}</p>
                          </button>
                        ))
                      ) : (
                        <div className="p-8 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-100">
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest italic">No matches found in the studio</p>
                        </div>
                      )}
                    </div>
                    {suggestions.length > 0 && (
                      <button 
                        onClick={handleSearchSubmit}
                        className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-black hover:translate-x-2 transition-transform flex items-center gap-2"
                      >
                        View all results
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500"
            onClick={toggleMenu}
          ></div>
          
          <div className="relative w-[400px] max-w-[90vw] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-500 overflow-y-auto">
            <div className="p-8 flex justify-between items-center border-b border-gray-50">
              <span className="text-2xl font-black tracking-tighter">MAZZÉ</span>
              <button onClick={toggleMenu} className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-8 space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-300">Navigation</p>
                <div className="grid grid-cols-1 gap-4">
                   <Link onClick={toggleMenu} to="/shop" className="text-4xl font-bold tracking-tighter hover:pl-2 transition-all block">Collection</Link>
                   <Link onClick={toggleMenu} to="/tracking" className="text-2xl font-bold tracking-tighter text-gray-400 hover:text-black transition-all block">Track Your Orders</Link>
                   <Link onClick={toggleMenu} to="/contact" className="text-2xl font-bold tracking-tighter text-gray-400 hover:text-black transition-all block">Contact us</Link>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-300">Taxonomy of Gear</p>
                <div className="grid grid-cols-2 gap-4">
                  {menuCategories.map((cat) => (
                    <Link 
                      key={cat.name} 
                      onClick={toggleMenu} 
                      to={`/shop?category=${cat.name}`}
                      className="flex items-center gap-4 p-5 bg-gray-50/50 hover:bg-gray-100 rounded-[2rem] border border-gray-100/50 transition-all group overflow-hidden"
                    >
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-black group-hover:scale-110 group-hover:shadow-md transition-all duration-500 shrink-0 border border-gray-50">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-6 w-6" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          {cat.icon}
                        </svg>
                      </div>
                      <span className="text-sm font-bold tracking-tight text-black truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            <div className="mt-auto p-8 pt-6 border-t border-gray-50 bg-gray-50/30">
              <Link 
                onClick={toggleMenu}
                to="/account" 
                className="w-full bg-black text-white py-5 rounded-[2rem] flex items-center justify-center font-black text-xs uppercase tracking-[0.3em] gap-3 hover:opacity-90 transition-all shadow-xl shadow-black/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Compare Mode
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
