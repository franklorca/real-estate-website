// client/src/pages/ListingsPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";

const ListingsPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Corrected line
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const getFiltersFromQuery = useCallback(() => {
    return Object.fromEntries(new URLSearchParams(location.search));
  }, [location.search]);

  const fetchProperties = useCallback(async (filters) => {
    try {
      setLoading(true);
      setError("");
      const queryParams = new URLSearchParams(filters).toString();
      // Simulate a slightly longer load time to see the skeleton effect
      await new Promise((res) => setTimeout(res, 500));
      const response = await api.get(`/api/properties?${queryParams}`);
      setProperties(response.data);
    } catch (err) {
      setError("Could not fetch listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties(getFiltersFromQuery());
  }, [fetchProperties, getFiltersFromQuery]);

  const handleFilterChange = (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    navigate(`${location.pathname}?${queryParams}`, { replace: true });
  };

  const renderHeader = () => {
    const filters = getFiltersFromQuery();
    let title = "Our Exclusive Collection";
    let subtitle =
      "Discover a curated selection of premier properties and exclusive vacation stays.";

    if (filters.city) {
      title = `Properties in ${filters.city}`;
      subtitle = loading
        ? "Searching..."
        : `Showing ${properties.length} exclusive listings found in your selected location.`;
    } else if (filters.listing_type) {
      title =
        filters.listing_type === "For Sale"
          ? "Homes for Sale"
          : "Exclusive Stays";
      subtitle = `Browse our curated collection of ${
        filters.listing_type === "For Sale" ? "homes" : "stays"
      }.`;
    }

    if (!loading && properties.length === 0) {
      subtitle =
        "No listings match your current criteria. Try adjusting your filters.";
    }

    return (
      <div className="text-center border-b border-brand-divider pb-8 mb-8">
        <motion.h1
          key={title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl font-bold tracking-tight text-brand-dark sm:text-6xl"
        >
          {title}
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-light">
          {subtitle}
        </p>
      </div>
    );
  };

  const renderSkeleton = () => (
    <Masonry
      breakpointCols={{ default: 3, 1024: 2, 640: 1 }}
      className="flex w-auto -ml-8"
      columnClassName="pl-8 bg-clip-padding"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="mb-8">
          <PropertyCardSkeleton />
        </div>
      ))}
    </Masonry>
  );

  return (
    <div className="bg-brand-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        <FilterBar
          onFilterChange={handleFilterChange}
          initialFilters={getFiltersFromQuery()}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={loading ? "loading" : "content"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              renderSkeleton()
            ) : properties.length > 0 ? (
              <Masonry
                breakpointCols={{ default: 3, 1024: 2, 640: 1 }}
                className="flex w-auto -ml-8"
                columnClassName="pl-8 bg-clip-padding"
              >
                {properties.map((property) => (
                  <motion.div
                    key={property.id}
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </Masonry>
            ) : (
              <div className="text-center py-20 px-6 bg-brand-bg-white rounded-lg shadow-md border border-gray-200/80">
                <h3 className="font-serif text-2xl font-semibold text-brand-dark">
                  No Properties Found
                </h3>
                <p className="mt-2 text-brand-light">
                  Please try adjusting your filters or clearing them to see all
                  listings.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ListingsPage;
