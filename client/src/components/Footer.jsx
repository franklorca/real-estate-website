// client/src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

// Simple SVG icons for social media links
const SocialIcon = ({ href, children }) => (
  <a href={href} className="text-gray-400 hover:text-white transition-colors">
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-brand-dark">
      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
        {/* --- Main Footer Content --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-3xl font-semibold text-white">
              Luminous Heaven
            </h3>
            <p className="mt-4 text-gray-400 max-w-xs">
              An exclusive club for discerning individuals seeking extraordinary
              properties and curated lifestyle experiences.
            </p>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="font-semibold text-gray-200 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/listings?listing_type=For+Sale"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Homes for Sale
                </Link>
              </li>
              <li>
                <Link
                  to="/listings?listing_type=Vacation+Rental"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Exclusive Stays
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-200 uppercase tracking-wider">
              Membership
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Join The Club
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Member Login
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Agent Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Sub-Footer --- */}
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Luminous Heaven. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <SocialIcon href="#">
              {" "}
              {/* Instagram */}
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.25-9.75a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
                  clipRule="evenodd"
                />
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              {" "}
              {/* X / Twitter */}
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
