import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

/**
 * PUBLIC_INTERFACE
 * App entry: Renders sticky Navbar, main Hero section, and Footer with modern Ocean theme.
 */
function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main id="main" role="main">
        <Hero />
        {/* Additional sections can be added here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
