// client/src/components/FeaturedListings.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import PropertyCard from "./PropertyCard";
import { generateSmartSlug } from "../utils/slugify";
import { motion } from "framer-motion";

import { fetchWithSWR } from "../utils/cache";

const FeaturedListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        await fetchWithSWR(
          "featured_properties",
          async () => {
            const response = await api.get("/api/properties");
            return response.data.slice(0, 3);
          },
          {
            onCacheHit: (cached) => {
              setProperties(cached);
              setLoading(false);
            },
            onFreshData: (fresh) => {
              setProperties(fresh);
              setLoading(false);
            },
            onError: (err) => {
              console.error("Featured listings error:", err);
              if (properties.length === 0) {
                setError("Unable to load featured listings.");
              }
              setLoading(false);
            },
          }
        );
      } catch (err) {
        setLoading(false);
      }
    };
    fetchFeaturedProperties();
  }, [properties.length]);

  const renderContent = () => {
    if (loading) return <p className="text-center text-brand-light">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (properties.length === 0) return null;

    const [heroProperty, ...secondaryProperties] = properties;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Massive Hero Property */}
        {heroProperty && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-8 group relative overflow-hidden bg-brand-dark cursor-pointer"
          >
            <Link to={`/properties/${generateSmartSlug(heroProperty.id, heroProperty.title)}`} className="block w-full h-[50vh] sm:h-[600px] lg:h-full lg:min-h-[800px] overflow-hidden">
              <img 
                src={heroProperty.image} 
                alt={heroProperty.title} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full">
                <p className="text-brand-champagne font-sans text-xs sm:text-sm uppercase tracking-widest mb-3 font-semibold">Featured Masterpiece</p>
                <h3 className="text-white font-serif text-3xl sm:text-5xl font-medium tracking-wide mb-2">
                  {heroProperty.title}
                </h3>
                <div className="flex items-center text-gray-300 font-sans text-sm tracking-wider uppercase mt-4">
                  <span>{heroProperty.city}</span>
                  <span className="mx-3 text-brand-accent">•</span>
                  <span>{heroProperty.bedrooms} BEDS</span>
                  <span className="mx-3 text-brand-accent">•</span>
                  <span>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(heroProperty.price)}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Staggered Secondary Properties */}
        <div className="lg:col-span-4 flex flex-col gap-8 lg:gap-16 lg:mt-32">
          {secondaryProperties.map((property, idx) => (
            <motion.div 
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 * (idx + 1), ease: [0.25, 1, 0.5, 1] }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-brand-bg py-32 sm:py-48 border-t border-brand-divider/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-brand-accent font-sans text-[11px] uppercase tracking-[0.2em] font-bold mb-4">
              Curated Collection
            </h2>
            <p className="font-serif text-5xl sm:text-7xl font-medium tracking-tight text-brand-dark leading-none">
              Featured Residences
            </p>
          </div>
          {!loading && !error && properties.length > 0 && (
            <Link
              to="/listings"
              className="group flex items-center font-sans text-[12px] uppercase tracking-[0.15em] font-bold text-brand-dark hover:text-brand-accent transition-colors"
            >
              View Entire Collection 
              <span className="ml-3 block h-[1px] w-12 bg-brand-dark group-hover:bg-brand-accent transition-colors"></span>
            </Link>
          )}
        </div>
        
        {renderContent()}
        
      </div>
    </div>
  );
};

export default FeaturedListings;
