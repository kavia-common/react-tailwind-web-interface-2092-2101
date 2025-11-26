import React from "react";

/**
 * PUBLIC_INTERFACE
 * Footer with muted text and top border on a surface background.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <div>© {year} Ocean UI. All rights reserved.</div>
        <div>
          <a href="#privacy">Privacy</a>
          {" · "}
          <a href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}
