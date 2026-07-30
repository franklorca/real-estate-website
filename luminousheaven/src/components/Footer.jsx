// luminousheaven/src/components/Footer.jsx
"use client";

import React from "react";
import Link from "next/link";

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-brand-light hover:text-white transition-colors duration-300 font-sans tracking-wide text-sm uppercase"
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-serif italic text-xl text-brand-champagne mb-6">
              Explore
            </h4>
            <ul className="space-y-4 flex flex-col">
              <FooterLink href="/listings?listing_type=For+Sale">
                Properties
              </FooterLink>
              <FooterLink href="/listings?listing_type=Vacation+Rental">
                Residences
              </FooterLink>
              <FooterLink href="/blog">Journal</FooterLink>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-serif italic text-xl text-brand-champagne mb-6">
              The Club
            </h4>
            <ul className="space-y-4 flex flex-col">
              <FooterLink href="/listings">Collection</FooterLink>
              <FooterLink href="/login">Member Portal</FooterLink>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2 flex flex-col md:items-end justify-between">
            <div className="max-w-xs md:text-right">
              <p className="font-sans text-brand-light text-sm leading-relaxed">
                An exclusive collection of extraordinary properties and curated
                lifestyle experiences for the discerning few.
              </p>
            </div>
            <div className="mt-8 md:mt-0 flex gap-6">
              <a
                href="#"
                className="text-brand-light hover:text-white transition-colors text-sm uppercase tracking-widest"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-brand-light hover:text-white transition-colors text-sm uppercase tracking-widest"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 pb-4 flex flex-col items-center">
          <h2 className="font-serif text-[12vw] leading-none font-medium tracking-tight text-white/90 w-full text-center whitespace-nowrap overflow-hidden">
            LUMINOUS HEAVEN
          </h2>

          <div className="w-full flex justify-between items-center mt-8 text-xs text-brand-light uppercase tracking-widest font-sans">
            <p>&copy; {new Date().getFullYear()} All rights reserved</p>
            <Link
              href="/admin/login"
              className="hover:text-white transition-colors"
            >
              Agent Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
