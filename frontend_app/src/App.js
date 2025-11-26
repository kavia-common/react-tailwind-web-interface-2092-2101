import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

/**
 * PUBLIC_INTERFACE
 * App is the main layout wrapper composing Navbar, Hero, and Footer.
 * It also manages dark mode using Tailwind's class strategy by toggling
 * the 'dark' class on the document.documentElement.
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
    setIsDark(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300 dark:bg-neutral-900 dark:text-neutral-100">
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <main role="main" className="pt-16">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default App;
