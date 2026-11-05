import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import InstagramSection from './components/InstagramSection';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query) {
      // Scroll to the product grid when searching
      const el = document.getElementById('watches');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar
        onSearch={handleSearch}
      />
      <Hero />
      <ProductGrid searchQuery={searchQuery} />
      <InstagramSection />
      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <WhatsAppFloating />
    </div>
  );
}
