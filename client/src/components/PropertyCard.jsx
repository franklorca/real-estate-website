// client/src/components/PropertyCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { generateSmartSlug } from "../utils/slugify";

const BookmarkIcon = ({ isSaved }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isSaved ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
    className={`w-6 h-6 transition-all duration-300 ${isSaved ? "text-brand-accent" : "text-white"}`}
  >
    <path strokeLinecap="square" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>
);

const PropertyCard = ({ property, onUnsave, isLarge = false }) => {
  const { user, savedPropertyIds, saveProperty, unsaveProperty } = useAuth();

  const isSaved = savedPropertyIds instanceof Set && savedPropertyIds.has(property.id);

  const handleSaveToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  return (
    <motion.div
      className="group flex flex-col w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="relative overflow-hidden bg-brand-bg w-full h-[350px] sm:h-[450px] md:h-[500px]">
        <Link
          to={`/properties/${generateSmartSlug(property.id, property.title)}`}
          className="block w-full h-full"
        >
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
          />
        </Link>

        {user && (
          <button
            onClick={handleSaveToggle}
            className="absolute top-4 right-4 z-10 transition-transform transform hover:scale-110"
            aria-label="Save property"
          >
            <BookmarkIcon isSaved={isSaved} />
          </button>
        )}

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-dark px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
          {property.listing_type === "Vacation Rental" ? "Stay" : "Sale"}
        </div>
      </div>

      <div className="pt-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/properties/${generateSmartSlug(property.id, property.title)}`} className="block w-2/3">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-brand-dark leading-tight group-hover:text-brand-accent transition-colors duration-300">
              {property.title}
            </h3>
          </Link>
          <span className="font-sans text-lg sm:text-xl font-medium text-brand-dark tracking-tight w-1/3 text-right">
            {formattedPrice}
          </span>
        </div>
        
        <p className="font-sans text-brand-light text-sm uppercase tracking-widest mb-6">
          {property.city}
        </p>

        <div className="mt-auto pt-4 border-t border-brand-divider/30 flex justify-between items-center font-sans text-[11px] text-brand-dark uppercase tracking-[0.15em] font-semibold">
          <div className="flex gap-4">
            <span>{property.bedrooms} Beds</span>
            <span className="text-brand-divider">|</span>
            <span>{property.bathrooms} Baths</span>
          </div>
          {property.status && (
            <span className={property.status === "Sold" ? "text-red-800" : "text-brand-accent"}>
              {property.status}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
