import React, { useEffect, useState, useCallback } from 'react';
import { usePrefersReducedMotion, smoothScrollToId, motionSafe } from '../utils/motion';

/**
 * PUBLIC_INTERFACE
 * Navbar renders a sticky, translucent top navigation with brand, links, CTA,
 * and a mobile hamburger menu. Includes dark mode toggle control passed via props.
 */
export default function Navbar({ isDark = false, onToggleTheme = () => {} }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleToggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  // Change navbar background subtly on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth in-page scrolling
  const onAnchorClick = useCallback(
    (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollToId(href, prefersReducedMotion);
        setOpen(false);
      }
    },
    [prefersReducedMotion]
  );

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b transition-colors',
        scrolled
          ? 'backdrop-blur bg-white/70 shadow-sm dark:bg-gray-900/60 border-black/5 dark:border-white/10'
          : 'backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/50 dark:bg-neutral-900/50 border-transparent'
      ].join(' ')}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a href="#home" onClick={onAnchorClick} className="flex items-center gap-2 group">
            <div
              className={[
                'h-8 w-8 rounded-lg bg-primary text-white grid place-items-center shadow-soft',
                motionSafe('transition-transform group-hover:scale-105')
              ].join(' ')}
            >
              <span className="sr-only">Ocean Pro</span>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <title>Ocean Pro Logo</title>
                <path d="M12 3c4.97 0 9 4.03 9 9 0 1.74-.5 3.36-1.36 4.73a1 1 0 0 1-1.68-1.06A6.98 6.98 0 0 0 19 12a7 7 0 1 0-7 7 6.98 6.98 0 0 0 3.67-1.04 1 1 0 1 1 1.06 1.68A8.96 8.96 0 0 1 12 21C7.03 21 3 16.97 3 12S7.03 3 12 3z" fill="currentColor"/>
              </svg>
            </div>
            <span className="text-base font-semibold text-text/90 dark:text-white tracking-tight group-hover:text-text dark:group-hover:text-white transition-colors">
              Ocean Pro
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <a href="#home" onClick={onAnchorClick} className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded">
                Home
              </a>
              <a href="#features" onClick={onAnchorClick} className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded">
                Features
              </a>
              <a href="#pricing" onClick={onAnchorClick} className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded">
                Pricing
              </a>
              <a href="#contact" onClick={onAnchorClick} className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded">
                Contact
              </a>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onToggleTheme}
                className={[
                  'inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200',
                  'hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                  motionSafe('transition-colors')
                ].join(' ')}
                aria-label={`Activate ${isDark ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <>
                    <SunIcon />
                    Light
                  </>
                ) : (
                  <>
                    <MoonIcon />
                    Dark
                  </>
                )}
              </button>
              <a
                href="#get-started"
                onClick={onAnchorClick}
                className={[
                  'inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-soft',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
                  motionSafe('transition-transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg')
                ].join(' ')}
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label={`Activate ${isDark ? 'light' : 'dark'} mode`}
              title="Toggle theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Open main menu"
              aria-controls="primary-mobile-menu"
              aria-expanded={open}
              onClick={handleToggleMenu}
            >
              <HamburgerIcon open={open} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="primary-mobile-menu"
          className={[
            'md:hidden origin-top overflow-hidden',
            prefersReducedMotion ? '' : 'transition-all duration-200 ease-out',
            open ? 'max-h-64 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
          ].join(' ')}
        >
          <div className="py-2 space-y-1">
            <a href="#home" onClick={onAnchorClick} className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">Home</a>
            <a href="#features" onClick={onAnchorClick} className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">Features</a>
            <a href="#pricing" onClick={onAnchorClick} className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">Pricing</a>
            <a href="#contact" onClick={onAnchorClick} className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">Contact</a>
            <a
              href="#get-started"
              onClick={onAnchorClick}
              className={[
                'mt-2 block text-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-soft',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
                motionSafe('transition-transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-lg')
              ].join(' ')}
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <title>Dark mode</title>
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <title>Light mode</title>
      <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9-10v2h3v-2h-3zm-1.95 7.16l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM13 1h-2v3h2V1zm-7.16 16.24l-1.79 1.8 1.41 1.41 1.8-1.79-1.42-1.42zM12 7a5 5 0 100 10 5 5 0 000-10z" />
    </svg>
  );
}

function HamburgerIcon({ open }) {
  return open ? (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <title>Close menu</title>
      <path d="M18.3 5.71L12 12l6.3 6.29-1.42 1.42L10.59 13.4 4.3 19.71 2.88 18.3 9.17 12 2.88 5.71 4.3 4.29 10.59 10.6l6.29-6.3 1.42 1.41z" />
    </svg>
  ) : (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <title>Open menu</title>
      <path d="M3 6h18v2H3V6zm0 10h18v2H3v-2zm0-5h18v2H3v-2z" />
    </svg>
  );
}
