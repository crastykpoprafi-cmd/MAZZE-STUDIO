
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

type SortOption = 'Default' | 'Price: Low to High' | 'Price: High to Low';

const Shop: React.FC = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('Default');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  
  const selectedCategory = searchParams.get('category') || 'All';

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'Price: Low to High') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, search, products, sortBy]);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search, products]);

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

  const categories = ['All', 'Earbuds', 'Headphones', 'Smart Watch', 'Speakers', 'Watches', 'Mobile Phones', 'Accessories', 'Gaming Consoles', 'Controllers', 'Camera'];
  const sortOptions: SortOption[] = ['Default', 'Price: Low to High', 'Price: High to Low'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Shop the Collection</h1>
        <p className="text-gray-500 max-w-2xl">Browse our curated selection of high-performance tools and accessories designed for modern workflows.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-64 space-y-12 shrink-0">
          {/* Search Section */}
          <div className="relative" ref={suggestionRef}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Search</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Find a product..." 
                value={search} 
                onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }} 
                onFocus={() => setShowSuggestions(true)} 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-0 focus:border-black transition-all font-medium" 
              />
              {showSuggestions && search.trim() !== '' && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in duration-200">
                  <div className="py-2">
                    {suggestions.length > 0 ? suggestions.map((item) => (
                      <button key={item.id} onClick={() => handleSuggestionClick(item.name)} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                        <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden shrink-0"><img src={item.images[0]} alt="" className="w-full h-full object-cover" /></div>
                        <div>
                          <p className="text-xs font-bold text-black">{item.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.category}</p>
                        </div>
                      </button>
                    )) : <div className="px-4 py-6 text-center"><p className="text-xs text-gray-400 font-medium italic">No results found</p></div>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sort Section */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Sort By</h3>
            <div className="space-y-4">
              {sortOptions.map(option => (
                <button 
                  key={option} 
                  onClick={() => setSortBy(option)} 
                  className={`block text-sm transition-all duration-300 ${sortBy === option ? 'font-bold text-black border-l-2 border-black pl-3' : 'text-gray-400 hover:text-black hover:pl-2'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Category Section */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Category</h3>
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
          <div className="flex justify-between items-center mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-gray-300">
              Showing {filteredProducts.length} Results
            </p>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No matches found in the studio collection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
