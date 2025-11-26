import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Footer displays site links, social icons, and copyright information
 * with accessible labels and focus-visible styles.
 */
export default function Footer() {
  return (
    <footer className="bg-surface border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary text-primaryForeground grid place-items-center shadow-soft">
                <span className="sr-only">Ocean Pro</span>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <title>Ocean Pro Logo</title>
                  <path d="M12 3c4.97 0 9 4.03 9 9 0 1.74-.5 3.36-1.36 4.73a1 1 0 0 1-1.68-1.06A6.98 6.98 0 0 0 19 12a7 7 0 1 0-7 7 6.98 6.98 0 0 0 3.67-1.04 1 1 0 1 1 1.06 1.68A8.96 8.96 0 0 1 12 21C7.03 21 3 16.97 3 12S7.03 3 12 3z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-base font-semibold text-text">Ocean Pro</span>
            </div>
            <p className="mt-3 text-sm text-textMuted">
              A professional React + Tailwind starter with an ocean-blue palette and modern UX.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">Product</p>
            <ul className="mt-3 space-y-2">
              <li><a className="text-sm text-textMuted hover:text-primary focus-ring-primary rounded underline-offset-4 hover:underline transition-colors" href="#features">Features</a></li>
              <li><a className="text-sm text-textMuted hover:text-primary focus-ring-primary rounded underline-offset-4 hover:underline transition-colors" href="#pricing">Pricing</a></li>
              <li><a className="text-sm text-textMuted hover:text-accent focus-ring-accent rounded underline-offset-4 hover:underline transition-colors" href="#updates">Updates</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">Company</p>
            <ul className="mt-3 space-y-2">
              <li><a className="text-sm text-textMuted hover:text-primary focus-ring-primary rounded underline-offset-4 hover:underline transition-colors" href="#about">About</a></li>
              <li><a className="text-sm text-textMuted hover:text-primary focus-ring-primary rounded underline-offset-4 hover:underline transition-colors" href="#careers">Careers</a></li>
              <li><a className="text-sm text-textMuted hover:text-primary focus-ring-primary rounded underline-offset-4 hover:underline transition-colors" href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">Resources</p>
            <ul className="mt-3 space-y-2">
              <li><a className="text-sm text-textMuted hover:text-primary focus-ring-primary rounded underline-offset-4 hover:underline transition-colors" href="#docs">Docs</a></li>
              <li><a className="text-sm text-textMuted hover:text-primary focus-ring-primary rounded underline-offset-4 hover:underline transition-colors" href="#blog">Blog</a></li>
              <li><a className="text-sm text-textMuted hover:text-primary focus-ring-primary rounded underline-offset-4 hover:underline transition-colors" href="#support">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-black/5 dark:border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-textMuted">
            © {new Date().getFullYear()} Ocean Pro. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://twitter.com" aria-label="Twitter" className="rounded p-2 text-textMuted hover:text-primary focus-ring-primary transition-colors" target="_blank" rel="noreferrer">
              <TwitterIcon />
            </a>
            <a href="https://github.com" aria-label="GitHub" className="rounded p-2 text-textMuted hover:text-accent focus-ring-accent transition-colors" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="rounded p-2 text-textMuted hover:text-accent focus-ring-accent transition-colors" target="_blank" rel="noreferrer">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TwitterIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <title>Twitter</title>
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.87-2.37 8.59 8.59 0 01-2.72 1.04 4.27 4.27 0 00-7.27 3.9A12.12 12.12 0 013 5.15a4.27 4.27 0 001.32 5.69 4.23 4.23 0 01-1.94-.53v.05a4.27 4.27 0 003.43 4.18 4.3 4.3 0 01-1.93.07 4.27 4.27 0 003.98 2.96A8.57 8.57 0 012 19.54a12.09 12.09 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.71 8.71 0 0024 5.5a8.51 8.51 0 01-2.54.7z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <title>GitHub</title>
      <path d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.57v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.76.08-.75.08-.75 1.21.09 1.85 1.24 1.85 1.24 1.08 1.85 2.84 1.32 3.53 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.57A12 12 0 0012 .5z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <title>LinkedIn</title>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.77 2.65 4.77 6.1V24h-4v-7.6c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 4v7.7h-4V8z"/>
    </svg>
  );
}
