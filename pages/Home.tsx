
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Star } from 'lucide-react';
import { useApp } from '../store';

const Home: React.FC = () => {
  const { products } = useApp();
  const featured = products.filter(p => p.isTrending).slice(0, 3);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
           <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-50" 
            alt="Hero" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
          <span className="text-xs font-bold tracking-[0.4em] uppercase mb-6 text-white/60 animate-pulse">Collection 2024</span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl">
             DEFINING <br /> THE <span className="font-light italic">FUTURE</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-xl font-light">
            Luxury electronics and bespoke accessories crafted for those who define the new standard of minimalism.
          </p>
          <div className="flex gap-4">
             <Link to="/shop" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center">
                Shop Collection <ArrowRight size={18} className="ml-2" />
             </Link>
             <Link to="/about" className="px-10 py-4 rounded-full font-bold border border-white/20 hover:bg-white/5 transition-colors">
                The Studio
             </Link>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Series</h2>
            <p className="text-gray-500 font-light">Explore our most coveted releases.</p>
          </div>
          <Link to="/shop" className="text-sm font-semibold flex items-center hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/5 aspect-[4/5] flex flex-col justify-end p-8">
              <img 
                src={product.image} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                alt={product.name}
              />
              <div className="relative z-10 space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">{product.category}</span>
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="text-xl font-light">৳{product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="bg-[#050505] py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
             <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
               Built for the <span className="font-light">Detail-Obsessed.</span>
             </h2>
             <p className="text-gray-400 text-lg font-light leading-relaxed">
               At Mazze Studio, we believe that true luxury isn't about excess—it's about refinement. 
               Every product in our collection undergoes rigorous quality control to ensure it 
               meets our standards of "Perfect Simplicity".
             </p>
             <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-3xl font-bold">24k+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Happy Clients</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">99.8%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Fulfillment</div>
                </div>
             </div>
           </div>
           <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1510511459019-5dee9954889c?q=80&w=1000&auto=format&fit=crop" className="w-full grayscale hover:grayscale-0 transition-all duration-1000" />
           </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">New Arrivals</h2>
            <p className="text-gray-500 max-w-lg mx-auto font-light">The latest additions to our curated catalog, directly from the studio.</p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map(product => (
              <div key={product.id} className="group cursor-pointer">
                <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden rounded-2xl bg-[#0a0a0a] mb-4">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.stock < 5 && (
                    <span className="absolute top-4 left-4 bg-red-600 text-[10px] font-bold uppercase px-2 py-1 rounded">Low Stock</span>
                  )}
                </Link>
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-200 group-hover:text-white">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="font-bold">৳{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
         </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-[#111] rounded-[3rem] p-12 md:p-20 text-center border border-white/5">
          <h2 className="text-4xl font-bold mb-6">Join the Inner Circle</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto font-light">Receive early notifications on product drops and member-only events.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
             <input type="email" placeholder="Enter your email" className="flex-1 bg-black border border-white/10 rounded-full px-8 py-4 focus:outline-none focus:border-white/30" />
             <button className="bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-gray-200 transition-colors">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
