// client/src/components/PropertyCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// A simple Heart Icon SVG component
const HeartIcon = ({ isSaved }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${isSaved ? 'text-red-500' : 'text-gray-400'}`}>
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.344-.688 15.182 15.182 0 01-1.443-1.043c-.427-.379-1.03-1.01-1.58-1.748C6.182 15.936 5.2 14.39 4.5 12.842c-.37-.771-.634-1.632-.8-2.529C3.454 9.172 3.225 8.12 3.225 7.054c0-1.62.383-3.09 1.125-4.267C5.093 1.61 6.273.825 7.725.825c.995 0 1.912.333 2.657.981.745.648 1.293 1.543 1.618 2.585.325-1.042.873-1.937 1.618-2.585.745-.648 1.662-.981 2.657-.981 1.452 0 2.633.785 3.375 1.962.742 1.178 1.125 2.648 1.125 4.267 0 1.066-.229 2.118-.499 3.029-.166.897-.43 1.758-.8 2.529-.7 1.548-1.682 3.094-2.784 4.384-.55.738-1.153 1.37-1.58 1.748a15.182 15.182 0 01-1.443 1.043 15.247 15.247 0 01-1.344.688l-.022.012-.007.003z" />
  </svg>
);

const PropertyCard = ({ property, onUnsave }) => {
  // Get everything we need from the Auth Context
  const { user, savedPropertyIds, saveProperty, unsaveProperty } = useAuth();
  
  const isSaved = savedPropertyIds.has(property.id);

  const handleSaveToggle = (e) => {
    e.stopPropagation(); // Prevent card click-through
    if (isSaved) {
      unsaveProperty(property.id);
      if (onUnsave) onUnsave(property.id); // Notify parent (for dashboard)
    } else {
      saveProperty(property.id);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(property.price);

  return (
    <motion.div className="bg-white rounded-lg shadow-lg overflow-hidden" whileHover={{ y: -8, scale: 1.02, shadow: 'xl' }} transition={{ type: 'spring', stiffness: 300 }}>
      <div className="relative">
        <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm font-bold">EXCLUSIVE</div>
        {user && (
          <button onClick={handleSaveToggle} className="absolute top-2 left-2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
            <HeartIcon isSaved={isSaved} />
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{property.title}</h3>
        <p className="text-gray-600 mb-4">{property.city}</p>
        <div className="flex justify-between items-center">
          {user ? (
            <span className="text-lg font-semibold text-gray-900">{formattedPrice}</span>
          ) : (
            <span className="text-lg font-semibold text-gray-900 blur-sm select-none">$8,888,888</span>
          )}
          <div className="text-sm text-gray-500">
            <span>{property.bedrooms} Beds</span> &middot; <span>{property.bathrooms} Baths</span>
          </div>
        </div>
        {!user && (
          <div className="mt-4">
            <Link to="/signup" className="block w-full text-center bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300">
              Join to Unlock Details
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyCard;