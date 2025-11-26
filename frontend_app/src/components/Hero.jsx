import React from "react";

/**
 * PUBLIC_INTERFACE
 * Hero section with large headline, supporting text, and two CTAs.
 * - Subtle gradient background using CSS only (see .hero in App.css)
 */
export default function Hero() {
  return (
    <section className="hero" role="region" aria-label="Hero">
      <div className="container hero-inner">
        <span className="hero-eyebrow" aria-label="Tagline">
          Ocean Professional
        </span>
        <h1 className="hero-title">
          Build fast, look professional.
        </h1>
        <p className="hero-subtitle">
          A lightweight React starter with a clean, modern aesthetic and no UI framework overhead.
          Accessible, responsive, and easy to customize with CSS variables.
        </p>
        <div className="hero-cta" role="group" aria-label="Primary actions">
          <a className="btn btn-primary" href="#get-started">Get started</a>
          <a className="btn btn-secondary" href="#learn-more" aria-describedby="learn-more-desc">Learn more</a>
          <span id="learn-more-desc" className="visually-hidden">Opens details further down the page</span>
        </div>
      </div>
    </section>
  );
}
