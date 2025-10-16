// client/src/components/FeaturedListings.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";
import PropertyCard from "./PropertyCard";

const FeaturedListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await api.get("/api/properties");
        setProperties(response.data.slice(0, 3));
      } catch (err) {
        setError("Unable to load featured listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProperties();
  }, []);

  const renderContent = () => {
    if (loading)
      return <p className="text-center text-brand-light">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    return (
      // Mobile-first grid: 1 column on mobile, 2 on medium, 3 on large.
      // Generous gaps for a spacious feel.
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    );
  };

  return (
    // Section shares the same soft background as ValueProposition
    <div className="bg-brand-bg-light py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-accent">
            Our Collection
          </h2>
          <p className="mt-2 font-serif text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            Featured Exclusive Listings
          </p>
        </div>
        <div className="mt-20">{renderContent()}</div>
      </div>
    </div>
  );
};

export default FeaturedListings;
