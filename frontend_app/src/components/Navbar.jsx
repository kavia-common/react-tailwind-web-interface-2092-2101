import React, { useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Navbar component with brand, accessible mobile toggle, and optional environment badge.
 * - Uses Ocean Professional theme variables (see App.css)
 * - Reads REACT_APP_NODE_ENV and REACT_APP_FEATURE_FLAGS for a small environment badge
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Safe environment handling: default to "production" if undefined
  const nodeEnv = useMemo(() => {
    const env = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "production";
    return typeof env === "string" ? env.toLowerCase() : "production";
  }, []);

  const isNonProd = nodeEnv !== "production";
  const featureFlags = process.env.REACT_APP_FEATURE_FLAGS || "";

  const toggleMenu = () => setOpen((v) => !v);

  return (
    <header className="navbar" role="banner">
      <div className="container navbar-inner">
        <a href="/" className="brand">
          <span aria-hidden="true" className="brand-mark" />
          <span className="brand-name">Ocean UI</span>
          {isNonProd && (
            <span className="env-badge" title={`Environment: ${nodeEnv}${featureFlags ? ` | Flags: ${featureFlags}` : ""}`}>
              {nodeEnv}
            </span>
          )}
        </a>

        {/* Desktop actions */}
        <nav className="nav-actions" aria-label="Primary">
          <a className="nav-link" href="#features">Features</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <a className="nav-link" href="#docs">Docs</a>
          <a className="nav-link" href="#contact">Contact</a>
          <a className="btn btn-primary" href="#get-started">Get started</a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={open ? "true" : "false"}
          onClick={toggleMenu}
        >
          <span aria-hidden="true" className="nav-toggle-icon" />
        </button>
      </div>

      {/* Mobile menu panel */}
      <nav
        id="mobile-menu"
        className={`container nav-actions ${open ? "open" : ""}`}
        aria-label="Mobile primary"
      >
        <a className="nav-link" href="#features" onClick={() => setOpen(false)}>Features</a>
        <a className="nav-link" href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
        <a className="nav-link" href="#docs" onClick={() => setOpen(false)}>Docs</a>
        <a className="nav-link" href="#contact" onClick={() => setOpen(false)}>Contact</a>
        <a className="btn btn-primary" href="#get-started" onClick={() => setOpen(false)}>Get started</a>
      </nav>
    </header>
  );
}
