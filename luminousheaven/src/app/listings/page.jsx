// luminousheaven/src/app/listings/page.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import api from "@/services/api";
import PropertyCard from "@/components/PropertyCard";
import FilterBar from "@/components/FilterBar";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import { fetchWithSWR } from "@/utils/cache";

export default function ListingsPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getFiltersFromQuery = useCallback(() => {
    const params = {};
    searchParams.forEach((val, key) => {
      params[key] = val;
    });
    return params;
  }, [searchParams]);

  const fetchProperties = useCallback(async (filters) => {
    setError("");
    const queryParams = new URLSearchParams(filters).toString();
    const cacheKey = `properties_list_${queryParams || "all"}`;

    try {
      await fetchWithSWR(
        cacheKey,
        async () => {
          const response = await api.get(`/api/properties?${queryParams}`);
          return Array.isArray(response.data) ? response.data : [];
        },
        {
          onCacheHit: (cachedData) => {
            if (Array.isArray(cachedData)) {
              setProperties(cachedData);
              setLoading(false);
            }
          },
          onSyncing: (syncState) => {
            setIsSyncing(syncState);
          },
          onFreshData: (freshData) => {
            if (Array.isArray(freshData)) {
              setProperties(freshData);
              setLoading(false);
            }
          },
          onError: (err) => {
            console.error("Could not fetch listings:", err);
            setError("Could not fetch listings. Please try again later.");
            setLoading(false);
          },
        },
        Array.isArray
      );
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties(getFiltersFromQuery());
  }, [getFiltersFromQuery, fetchProperties]);

  const handleFilterChange = (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    router.push(`${pathname}?${queryParams}`);
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
          : "Exclusive Rentals";
      subtitle = `Browse our curated collection of ${
        filters.listing_type === "For Sale" ? "homes" : "Rentals"
      }.`;
    }

    if (!loading && properties.length === 0) {
      subtitle =
        "No listings match your current criteria. Try adjusting your filters.";
    }

    return (
      <div className="text-center border-b border-brand-divider/30 pb-12 mb-16">
        <motion.h1
          key={title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl font-medium tracking-tight text-brand-dark sm:text-7xl"
        >
          {title}
        </motion.h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-brand-light font-sans tracking-wide flex items-center justify-center gap-2">
          <span>{subtitle}</span>
          {isSyncing && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 animate-pulse">
              Syncing fresh data...
            </span>
          )}
        </p>
      </div>
    );
  };

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={index % 4 === 0 ? "lg:col-span-2" : "col-span-1"}>
          <PropertyCardSkeleton />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-brand-bg min-h-screen">
      <SEO
        title="Properties & Rentals"
        description="Browse our curated collection of exclusive properties for sale and luxury vacation rentals."
      />
      <div className="max-w-[1400px] mx-auto py-24 px-6 lg:px-12">
        {renderHeader()}

        <div className="mb-16">
          <FilterBar
            onFilterChange={handleFilterChange}
            initialFilters={getFiltersFromQuery()}
          />
        </div>

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
            ) : Array.isArray(properties) && properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 lg:gap-x-12">
                {properties.map((property, index) => {
                  const isLarge = index % 4 === 0;
                  return (
                    <motion.div
                      key={property.id}
                      className={isLarge ? "lg:col-span-2" : "col-span-1"}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
                    >
                      <PropertyCard property={property} isLarge={isLarge} />
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-32 px-6 bg-brand-bg border border-brand-divider/30">
                <h3 className="font-serif text-3xl font-medium text-brand-dark mb-4">
                  No Properties Found
                </h3>
                <p className="font-sans text-brand-light uppercase tracking-widest text-sm">
                  Please try adjusting your filters or clearing them to see all listings.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
