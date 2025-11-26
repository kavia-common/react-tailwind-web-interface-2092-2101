import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePrefersReducedMotion, smoothScrollToId, motionSafe } from '../utils/motion';

/**
 * PUBLIC_INTERFACE
 * Hero displays a visually prominent section with gradient background,
 * strong headline, supporting text, and primary/secondary call-to-action buttons.
 */
export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [entered, setEntered] = useState(false);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctasRef = useRef(null);

  useEffect(() => {
    // Simple entrance animation on mount
    if (prefersReducedMotion) return;
    // Delay slightly for a smoother experience
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, [prefersReducedMotion]);

  const onAnchorClick = useCallback(
    (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollToId(href, prefersReducedMotion);
      }
    },
    [prefersReducedMotion]
  );

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-ocean-gradient bg-brand-gradient"
      >
        {/* High-contrast overlay for readability on the gradient */}
        <div className="absolute inset-0 pointer-events-none bg-black/25" aria-hidden="true"></div>

        {/* Decorative blob aligned with new palette */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span
                className={[
                  'inline-flex items-center rounded-full bg-surface/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/30',
                  motionSafe('transition-opacity', entered ? 'opacity-100' : 'opacity-0')
                ].join(' ')}
              >
                Ocean Professional
              </span>
              <h1
                ref={headingRef}
                className={[
                  'mt-4 text-4xl font-extrabold tracking-tight text-surface sm:text-5xl lg:text-6xl',
                  motionSafe(
                    'transition-all duration-700',
                    entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  )
                ].join(' ')}
              >
                Build modern web UIs with clarity and confidence
              </h1>
              <p
                ref={subRef}
                className={[
                  'mt-4 text-base sm:text-lg text-surface/90',
                  motionSafe(
                    'transition-all duration-700 delay-100',
                    entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  )
                ].join(' ')}
              >
                A clean, accessible React + Tailwind starter with a blue–magenta brand gradient,
                and thoughtful details. Ship faster with a professional foundation.
              </p>

              <div
                ref={ctasRef}
                className={[
                  'mt-8 flex flex-col sm:flex-row gap-3',
                  motionSafe(
                    'transition-all duration-700 delay-200',
                    entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  )
                ].join(' ')}
              >
                <a
                  href="#get-started"
                  onClick={onAnchorClick}
                  className={[
                    'inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primaryForeground shadow-soft',
                    'focus-ring-primary',
                    motionSafe('transition-transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg')
                  ].join(' ')}
                >
                  Get Started
                </a>
                <a
                  href="#features"
                  onClick={onAnchorClick}
                  className={[
                    'inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-semibold bg-surface/85 text-accent border-accent backdrop-blur',
                    'hover:bg-surface focus-ring-accent',
                    motionSafe('transition-colors')
                  ].join(' ')}
                >
                  View Features
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                className={[
                  'aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-surface shadow-soft',
                  motionSafe(
                    'transition-all duration-700 delay-200',
                    entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  )
                ].join(' ')}
              >
                {/* Placeholder illustration */}
                <div className="grid h-full place-items-center">
                  <svg
                    className="h-24 w-24 text-primary/80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="img"
                    aria-label="Decorative ocean wave"
                  >
                    <title>Decorative ocean wave</title>
                    <path d="M4 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2v4c-2 0-3 2-5 2s-3-2-5-2-3 2-5 2v-4z" />
                    <path d="M4 8c2 0 3-2 5-2s3 2 5 2 3-2 5-2v4c-2 0-3 2-5 2s-3-2-5-2-3 2-5 2V8z" />
                  </svg>
                </div>
              </div>
              <div className="pointer-events-none absolute -left-10 -bottom-10 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal section stubs to enable in-page scrolling targets */}
      <section id="features" className="scroll-mt-24"></section>
      <section id="pricing" className="scroll-mt-24"></section>
      <section id="contact" className="scroll-mt-24"></section>
      <section id="get-started" className="scroll-mt-24"></section>
    </>
  );
}
