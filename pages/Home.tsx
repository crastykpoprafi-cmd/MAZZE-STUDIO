
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const homeCategories = [
    { 
      name: 'Earbuds', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="12" r="3" />
          <circle cx="16" cy="12" r="3" />
          <path d="M8 15v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3" />
        </g>
      ),
      path: 'Earbuds'
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
      ),
      path: 'Headphones'
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
      ),
      path: 'Smart Watch'
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
      ),
      path: 'Speakers'
    },
    { 
      name: 'Watches', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="7" />
          <path d="M12 9v3l2 2" />
          <path d="M10 5V2h4v3M10 19v3h4v-3" />
        </g>
      ),
      path: 'Watches'
    },
    { 
      name: 'Mobile Phones', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="2" width="10" height="20" rx="3" />
          <path d="M11 4h2" />
          <circle cx="12" cy="19" r="1" />
        </g>
      ),
      path: 'Mobile Phones'
    },
    { 
      name: 'Accessories', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20" strokeDasharray="2 2" />
          <rect x="8" y="8" width="8" height="8" rx="2" />
          <path d="M10 12h4M12 10v4" />
        </g>
      ),
      path: 'Accessories'
    },
    { 
      name: 'Gaming Consoles', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="5" width="12" height="14" rx="2" />
          <rect x="8" y="7" width="8" height="1" rx="0.5" fill="currentColor" />
          <path d="M9 16h6" />
        </g>
      ),
      path: 'Gaming Consoles'
    },
    { 
      name: 'Controllers', 
      icon: (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8h12a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z" />
          <circle cx="7" cy="13" r="1.5" />
          <path d="M16 12h2M17 11v2" />
        </g>
      ),
      path: 'Controllers'
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
      ),
      path: 'Camera'
    },
  ];

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section with High-Tech Video Background */}
      <section className="relative h-[95vh] bg-black flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-black/50 z-10"></div>
           <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-70"
            poster="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=2000"
           >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-person-putting-on-headphones-40016-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
           </video>
        </div>
        
        <div className="relative z-20 max-w-6xl mx-auto px-6">
          <div className="mb-10 flex justify-center animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/90 border border-white/30 px-8 py-3 rounded-full backdrop-blur-xl bg-white/5">
              Studio Precision Series
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-10 leading-[0.95] animate-in fade-in zoom-in-95 duration-1000 uppercase">
            Experience the <br /> <span className="text-white/40">Future of Sound.</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Discover our curated collection of premium audio devices, smartwatches, and accessories designed for perfection.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Link to="/shop" className="w-full sm:w-auto bg-white text-black px-20 py-6 rounded-full font-black text-xs tracking-[0.4em] hover:bg-gray-200 transition-all active:scale-95 uppercase shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
              SHOP
            </Link>
            <Link to="/contact" className="w-full sm:w-auto border-2 border-white/20 text-white px-16 py-6 rounded-full font-black text-xs tracking-[0.4em] hover:bg-white/10 transition-all active:scale-95 uppercase backdrop-blur-md">
              Consultation
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-40">
           <div className="w-[1px] h-12 bg-white/50"></div>
           <span className="text-[9px] font-black text-white uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-20 text-center">
            <div className="inline-block mb-4">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">Taxonomy of Tools</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Browse by Category</h2>
            <p className="text-gray-500 mt-6 max-w-xl mx-auto text-lg">Select your discipline to find precisely engineered gear tailored for your workflow.</p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {homeCategories.map((cat, i) => (
              <Link 
                key={cat.name} 
                to={`/shop?category=${cat.path}`}
                className="group relative flex flex-col items-center justify-center p-10 bg-gray-50/50 rounded-[3rem] border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-gray-400 group-hover:text-black group-hover:scale-110 group-hover:shadow-md transition-all duration-500 mb-6 border border-gray-100">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    {cat.icon}
                  </svg>
                </div>
                <h3 className="text-base font-bold tracking-tight text-gray-400 group-hover:text-black transition-colors">{cat.name}</h3>
                
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link to="/shop" className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:gap-6 transition-all duration-300">
              View the complete portfolio
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="py-40 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-8 block">The Studio Creed</span>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10 leading-[1.1]">
            Your destination for <br className="hidden md:block" /> modern tech & gadgets.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            From earbuds to smart accessories, Mazzé Studio delivers quality products with style, performance, and value you can trust.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold tracking-tighter mb-1">24</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Global Labs</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tighter mb-1">100%</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Solar Powered</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tighter mb-1">0.01</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Micron Precision</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tighter mb-1">Studio</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Certified Tools</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
