// client/src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const isHomePage = location.pathname === "/";
  const navClasses = isHomePage
    ? "absolute bg-transparent text-white"
    : "relative bg-gray-900 text-white";

  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;

  return (
    <header className={`${navClasses} top-0 left-0 w-full z-50 p-4 md:p-6`}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Luminous Heaven
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/listings?listing_type=For+Sale"
            className="hover:underline"
          >
            Homes for Sale
          </Link>
          <Link
            to="/listings?listing_type=Vacation+Rental"
            className="hover:underline"
          >
            Exclusive Stays
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="font-semibold hover:underline">
                Dashboard
              </Link>
              <button onClick={logOut} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link
                to="/pricing"
                className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors"
              >
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="flex flex-col h-12 w-12 justify-center items-center group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`${genericHamburgerLine} ${
                isOpen ? "rotate-45 translate-y-3" : ""
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`${genericHamburgerLine} ${
                isOpen ? "-rotate-45 -translate-y-3" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-black bg-opacity-50 rounded-lg p-4">
          <Link
            to="/listings?listing_type=For+Sale"
            className="block py-2 text-center hover:bg-gray-700 rounded"
          >
            Homes for Sale
          </Link>
          <Link
            to="/listings?listing_type=Vacation+Rental"
            className="block py-2 text-center hover:bg-gray-700 rounded"
          >
            Exclusive Stays
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block py-2 text-center hover:bg-gray-700 rounded"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logOut();
                  setIsOpen(false);
                }}
                className="w-full py-2 text-center hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 text-center hover:bg-gray-700 rounded"
              >
                Login
              </Link>
              <Link
                to="/pricing"
                className="block mt-2 py-2 text-center bg-indigo-600 rounded"
              >
                Join Now
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
