import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Hero displays a visually prominent section with gradient background,
 * strong headline, supporting text, and primary/secondary call-to-action buttons.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-ocean-hero dark:bg-gradient-to-br dark:from-blue-900/40 dark:to-neutral-900"
    >
      {/* Decorative blob */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">
              Ocean Professional
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl dark:text-white">
              Build modern web UIs with clarity and confidence
            </h1>
            <p className="mt-4 text-base text-neutral-600 sm:text-lg dark:text-neutral-300">
              A clean, accessible React + Tailwind starter with an ocean-blue palette, amber accents,
              and thoughtful details. Ship faster with a professional foundation.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#get-started"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-primary text-primary px-6 py-3 text-sm font-semibold bg-white/70 backdrop-blur hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:bg-neutral-900/50 dark:hover:bg-neutral-900"
              >
                View Features
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/5 bg-white shadow-soft dark:bg-neutral-900 dark:border-white/10">
              {/* Placeholder illustration */}
              <div className="grid h-full place-items-center">
                <svg
                  className="h-24 w-24 text-primary/60"
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
  );
}
