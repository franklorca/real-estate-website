// luminousheaven/src/components/Navbar.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isHomePage = pathname === "/";
  const navClasses = isHomePage
    ? "absolute bg-transparent text-white"
    : "sticky bg-white/90 backdrop-blur-md text-brand-dark border-b border-brand-divider/50 shadow-sm";

  const genericHamburgerLine = `h-[2px] w-6 my-1 rounded-full ${
    isHomePage ? "bg-white" : "bg-brand-dark"
  } transition ease transform duration-300`;

  return (
    <header className={`${navClasses} top-0 left-0 w-full z-50 p-4 md:p-6`}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="font-serif text-2xl md:text-3xl font-bold tracking-wider uppercase"
        >
          Luminous Heaven
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center font-sans text-[13px] uppercase tracking-[0.1em]">
          <Link
            href="/listings?listing_type=For+Sale"
            className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-brand-accent after:transition-all after:duration-300 hover:after:w-full"
          >
            Homes for Sale
          </Link>
          <Link
            href="/listings?listing_type=Vacation+Rental"
            className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-brand-accent after:transition-all after:duration-300 hover:after:w-full"
          >
            Rentals
          </Link>
          <Link
            href="/blog"
            className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-brand-accent after:transition-all after:duration-300 hover:after:w-full"
          >
            Journal
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="relative font-medium after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-brand-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                Dashboard
              </Link>
              <button
                onClick={logOut}
                className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-brand-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-brand-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`px-5 py-2 rounded-sm font-medium transition-colors duration-300 ${
                  isHomePage
                    ? "bg-white text-brand-dark hover:bg-brand-champagne"
                    : "bg-brand-accent text-white hover:bg-brand-accent-hover"
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Toggle Navigation Menu"
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
            href="/listings?listing_type=For+Sale"
            className="block py-2 text-center hover:bg-gray-700 rounded"
          >
            Homes for Sale
          </Link>
          <Link
            href="/listings?listing_type=Vacation+Rental"
            className="block py-2 text-center hover:bg-gray-700 rounded"
          >
            Rentals
          </Link>
          <Link
            href="/blog"
            className="block py-2 text-center hover:bg-gray-700 rounded"
          >
            Journal
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
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
                href="/login"
                className="block py-2 text-center hover:bg-gray-700 rounded"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block mt-2 py-2 text-center bg-indigo-600 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
