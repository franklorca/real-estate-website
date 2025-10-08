// client/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const navigation = {
    main: [
      { name: 'Listings', href: '#' },
      { name: 'About Us', href: '#' },
      { name: 'Membership', href: '#' },
    ],
    social: [
      // For simplicity, using basic text placeholders for icons.
      // In a real app, you would use SVG icons.
      { name: 'Instagram', href: '#' },
      { name: 'LinkedIn', href: '#' },
      { name: 'Facebook', href: '#' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a href={item.href} className="text-base text-gray-400 hover:text-white">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
           {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
              <span className="sr-only">{item.name}</span>
               {/* This is a simple placeholder. You can replace with real SVG icons later */}
              <div className="h-6 w-6 border rounded-full flex items-center justify-center text-xs">
                {item.name.substring(0,2)}
              </div>
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-500">
          &copy; {new Date().getFullYear()} Luminous Heaven. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;