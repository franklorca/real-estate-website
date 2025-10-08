// client/src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is a placeholder for the page content
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;