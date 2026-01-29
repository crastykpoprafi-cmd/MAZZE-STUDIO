
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  
  const selectedCategory = searchParams.get('category') || 'All';

  // Filter products for the main grid
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  // Generate real-time suggestions based on current search input
  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5); // Limit to top 5 matches
  }, [search]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (name: string) => {
    setSearch(name);
    setShowSuggestions(false);
  };

  const categories = [
    'All', 
    'Earbuds',
    'Headphones', 
    'Smart Watch', 
    'Speakers', 
    'Watches', 
    'Mobile Phones', 
    'Accessories', 
    'Gaming Consoles', 
    'Controllers', 
    'Camera'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Shop the Collection</h1>
        <p className="text-gray-500 max-w-2xl">Browse our curated selection of high-performance tools and accessories designed for modern workflows.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-10 shrink-0">
          <div className="relative" ref={suggestionRef}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Search</h3>
            <div className="relative">
              <input 
                type="text"
                placeholder="Find a product..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-0 focus:border-black transition-all"
              />
              
              {/* Suggestion Dropdown */}
              {showSuggestions && search.trim() !== '' && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-2">
                    {suggestions.length > 0 ? (
                      suggestions.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSuggestionClick(item.name)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        >
                          <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden shrink-0">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-black">{item.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.category}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <p className="text-xs text-gray-400 font-medium italic">No results found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Category</h3>
            <div className="space-y-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                  className={`block text-sm transition-all duration-300 ${selectedCategory === cat ? 'font-bold text-black border-l-2 border-black pl-3' : 'text-gray-400 hover:text-black hover:pl-2'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <p className="text-gray-500 font-medium">No items found matching your selection.</p>
              <button 
                onClick={() => {setSearch(''); setSearchParams({});}} 
                className="mt-4 text-black font-bold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
