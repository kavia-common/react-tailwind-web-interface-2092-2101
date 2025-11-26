import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { EnvBadge } from './utils/env';
import { CartProvider } from './state/CartContext';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Hero from './components/Hero';

/**
 * PUBLIC_INTERFACE
 * App provides routing and cart state for the ecommerce demo while preserving
 * dark mode and the Ocean Professional theme.
 */
function App() {
  const [isDark, setIsDark] = useState(false);

  // Apply or remove the 'dark' class on the root html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // PUBLIC_INTERFACE
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-background text-text transition-colors duration-300">
          <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
          <main role="main" className="pt-16">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <div className="mt-10">
                      <Catalog />
                    </div>
                  </>
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
          {/* Optional environment badge (visible when 'showEnvBadge' feature flag is enabled) */}
          <EnvBadge />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
