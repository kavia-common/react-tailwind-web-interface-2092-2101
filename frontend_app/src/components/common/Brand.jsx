import React from "react";

/**
 * PUBLIC_INTERFACE
 * Brand mark and name. Uses the same classes as Navbar brand.
 */
export default function Brand({ name = "Ocean UI" }) {
  return (
    <span className="brand">
      <span aria-hidden="true" className="brand-mark" />
      <span className="brand-name">{name}</span>
    </span>
  );
}
