
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerCategories = [
    'Earbuds',
    'Headphones',
    'Smart Watch',
    'Speakers',
    'Watches',
    'Mobile Phones',
    'Accessories',
    'Gaming Consoles'
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <span className="text-3xl font-black tracking-tighter uppercase block">MAZZÉ STUDIO</span>
            </div>
            <div className="space-y-3 mb-8">
              <p className="text-white font-bold text-lg tracking-tight">
                Smart gadgets. Premium design. Trusted performance.
              </p>
              <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
                We bring you carefully selected tech and accessories that combine modern design, reliable quality, and everyday performance.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <a 
                href="https://www.facebook.com/p/Friendly-Shop-ltd-100089963753546/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em]"
              >
                Facebook
              </a>
              <a 
                href="https://www.instagram.com/mazzestudio.fsl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em]"
              >
                Instagram
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Explore</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-y-4 gap-x-8 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-white transition-colors font-bold text-white/90">All Products</Link></li>
              {footerCategories.map((cat) => (
                <li key={cat}>
                  <Link to={`/shop?category=${cat}`} className="hover:text-white transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/tracking" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>&copy; 2024 Mazzé Studio Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
