// client/src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    // The main wrapper for the entire page layout
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        {/* The Outlet will render our page components like HomePage */}
        <Outlet />
      </main>
      {/* The Footer is now outside the main content area for better layout control */}
      <Footer />
    </div>
  );
};

export default Layout;
