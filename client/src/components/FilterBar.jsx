// client/src/components/FilterBar.jsx
import React, { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    city: "",
    listing_type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = () => {
    // Pass a clean version of the filters, removing any empty values
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );
    onFilterChange(activeFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      city: "",
      listing_type: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
    };
    setFilters(clearedFilters);
    onFilterChange({}); // Notify parent to fetch all properties
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City / Location
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={filters.city}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="e.g., Malibu"
          />
        </div>
        <div>
          <label
            htmlFor="listing_type"
            className="block text-sm font-medium text-gray-700"
          >
            Listing Type
          </label>
          <select
            name="listing_type"
            id="listing_type"
            value={filters.listing_type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">All Types</option>
            <option value="For Sale">For Sale</option>
            <option value="Vacation Rental">Vacation Rental</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Min Price
          </label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Any"
          />
        </div>
        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Max Price
          </label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Any"
          />
        </div>
        <div>
          <label
            htmlFor="bedrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Min Beds
          </label>
          <select
            name="bedrooms"
            id="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Clear
        </button>
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
