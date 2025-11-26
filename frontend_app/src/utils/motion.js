import { useEffect, useState, useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * usePrefersReducedMotion returns a boolean indicating whether the user prefers reduced motion.
 */
export function usePrefersReducedMotion() {
  const getPref = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [prefersReduced, setPrefersReduced] = useState(getPref);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setPrefersReduced(mediaQuery.matches);
    handler();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      // Safari
      mediaQuery.addListener(handler);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  return prefersReduced;
}

/**
 * PUBLIC_INTERFACE
 * smoothScrollToId scrolls to the given hash/element id with smooth behavior unless reduced motion is preferred.
 */
export function smoothScrollToId(id, prefersReducedMotion = false) {
  const el = document.getElementById(id?.replace(/^#/, ''));
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 72; // account for fixed navbar
  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  });
}

/**
 * PUBLIC_INTERFACE
 * motionSafe returns a string of Tailwind classes that should apply only when motion is not reduced.
 * It prepends 'motion-safe:' to each provided class token.
 */
export function motionSafe(...tokens) {
  return tokens
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => `motion-safe:${t}`)
    .join(' ');
}
