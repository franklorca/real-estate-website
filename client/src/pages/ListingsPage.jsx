// client/src/pages/ListingsPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar"; // <-- Import the new component

const ListingsPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  // A memoized function to fetch properties. It will be recreated only if the URL params change.
  const fetchProperties = useCallback(async (filters) => {
    try {
      setLoading(true);
      setError("");
      // Convert the filters object into a URL query string (e.g., "?city=Malibu&minPrice=1000000")
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/api/properties?${queryParams}`);
      setProperties(response.data);
    } catch (err) {
      setError("Could not fetch listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch when the component first mounts
  useEffect(() => {
    // Parse the query string (e.g., "?listing_type=For+Sale") into an object
    const initialFilters = Object.fromEntries(
      new URLSearchParams(location.search)
    );
    fetchProperties(initialFilters);
  }, [fetchProperties, location.search]);

  // This function will be passed down to the FilterBar
  const handleFilterChange = (filters) => {
    fetchProperties(filters);
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center">Loading listings...</div>;
    }
    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }
    if (properties.length === 0) {
      return (
        <div className="text-center">No properties match your criteria.</div>
      );
    }
    return (
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          All Exclusive Listings
        </h1>
        {/* Add the FilterBar here */}
        <FilterBar onFilterChange={handleFilterChange} />
        {renderContent()}
      </div>
    </div>
  );
};

export default ListingsPage;
