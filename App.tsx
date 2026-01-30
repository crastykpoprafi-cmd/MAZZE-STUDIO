
import React, { Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import WhatsAppButton from './components/WhatsAppButton';
import AdminButton from './components/AdminButton';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Tracking from './pages/Tracking';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
              <Navbar />
              <main className="flex-grow">
                <Suspense fallback={<div className="h-screen flex items-center justify-center font-bold tracking-widest text-[10px]">DECRYPTING STUDIO ASSETS...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/tracking" element={<Tracking />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <WhatsAppButton />
              <AdminButton />
              <AIChat />
            </div>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
