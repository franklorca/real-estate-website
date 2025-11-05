// client/src/components/PropertyCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

// --- NEW BOOKMARK ICON ---
const BookmarkIcon = ({ isSaved }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    // Fill the icon if saved, stroke it if not.
    fill={isSaved ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className={`w-6 h-6 transition-all duration-300 ${
      isSaved ? "text-brand-accent" : "text-white"
    }`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
    />
  </svg>
);

const PropertyCard = ({ property, onUnsave }) => {
  const { user, savedPropertyIds, saveProperty, unsaveProperty } = useAuth();

  // Ensure savedPropertyIds is always a Set to prevent errors
  const isSaved =
    savedPropertyIds instanceof Set && savedPropertyIds.has(property.id);

  const handleSaveToggle = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigation when clicking the button
    if (isSaved) {
      unsaveProperty(property.id);
      if (onUnsave) onUnsave(property.id);
    } else {
      saveProperty(property.id);
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(property.price);

  const getStatusClasses = (status) => {
    switch (status) {
      case "Under Offer":
        return "bg-yellow-100 text-yellow-800 ring-yellow-600/20";
      case "Sold":
        return "bg-red-100 text-red-800 ring-red-600/20";
      default:
        return "bg-green-100 text-green-800 ring-green-600/20";
    }
  };

  return (
    <motion.div
      className="bg-brand-bg-white rounded-lg shadow-sm border border-gray-200/80 overflow-hidden group transition-shadow duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative">
        <Link
          to={`/properties/${property.id}`}
          className="block h-64 w-full overflow-hidden"
        >
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </Link>

        {/* --- DEFINITIVE FIX: Bookmark button is ALWAYS VISIBLE for active members --- */}
        {user && user.membership_status === "active" && (
          <button
            onClick={handleSaveToggle}
            className="absolute top-3 right-3 bg-black/40 p-2 rounded-full transition-transform transform hover:scale-110 active:scale-95"
            aria-label="Save property"
          >
            <BookmarkIcon isSaved={isSaved} />
          </button>
        )}

        <div className="absolute top-3 left-3 bg-brand-dark/70 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
          {property.listing_type === "Vacation Rental" ? "Stay" : "For Sale"}
        </div>

        {property.status && (
          <div
            className={`absolute bottom-0 left-0 px-3 py-1 rounded-tr-lg text-xs font-semibold uppercase ring-1 ring-inset ${getStatusClasses(
              property.status
            )}`}
          >
            {property.status}
          </div>
        )}
      </div>

      <div className="p-6">
        <Link to={`/properties/${property.id}`} className="block">
          <h3 className="font-serif text-2xl font-semibold text-brand-dark mb-1 truncate group-hover:text-brand-accent transition-colors">
            {property.title}
          </h3>
        </Link>
        <p className="font-sans text-brand-light mb-4">{property.city}</p>

        <div className="flex justify-between items-center border-t border-gray-200/80 pt-4">
          <span className="font-sans text-xl font-bold text-brand-dark">
            {formattedPrice}
          </span>
          <div className="font-sans text-sm text-brand-light">
            <span>{property.bedrooms} Beds</span> ·{" "}
            <span>{property.bathrooms} Baths</span>
          </div>
        </div>

        {(!user || user.membership_status !== "active") && (
          <div className="mt-4">
            <Link
              to={user ? "/pricing" : "/signup"}
              className="block w-full text-center bg-brand-accent text-white py-2.5 rounded-md font-semibold hover:bg-brand-dark transition-colors"
            >
              {user ? "Upgrade to View More" : "Join to Unlock More"}
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyCard;
