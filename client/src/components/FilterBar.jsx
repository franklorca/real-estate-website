// client/src/components/FilterBar.jsx
import React, { useState, useEffect } from "react";

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
      clipRule="evenodd"
    />
  </svg>
);

const FilterBar = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [isOpen, setIsOpen] = useState(false);

  // --- FIX #1: Sync state with URL ---
  // This ensures that if the user clicks "back", the filter inputs update correctly.
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // --- FIX #2: Use form onSubmit for better accessibility ---
  const handleApplyFilters = (e) => {
    e.preventDefault(); // Prevent default form submission
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== "" && value !== null
      )
    );
    onFilterChange(activeFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      city: "",
      listing_type: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
    });
    onFilterChange({});
    setIsOpen(false);
  };

  const inputStyles =
    "mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent transition";

  const filterForm = (
    <form
      onSubmit={handleApplyFilters}
      className="bg-brand-bg-white p-6 rounded-lg shadow-sm border border-gray-200/80"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
        {/* --- FIX #3: Improved Layout --- */}
        <div className="lg:col-span-2">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-brand-dark"
          >
            Location
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={filters.city || ""}
            onChange={handleChange}
            className={inputStyles}
            placeholder="e.g., Malibu"
          />
        </div>

        <div>
          <label
            htmlFor="listing_type"
            className="block text-sm font-medium text-brand-dark"
          >
            Type
          </label>
          <select
            name="listing_type"
            id="listing_type"
            value={filters.listing_type || ""}
            onChange={handleChange}
            className={inputStyles}
          >
            <option value="">All</option>
            <option value="For Sale">For Sale</option>
            <option value="Vacation Rental">Stay</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-brand-dark"
          >
            Min Price
          </label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            value={filters.minPrice || ""}
            onChange={handleChange}
            className={inputStyles}
            placeholder="Any"
          />
        </div>

        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-brand-dark"
          >
            Max Price
          </label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            value={filters.maxPrice || ""}
            onChange={handleChange}
            className={inputStyles}
            placeholder="Any"
          />
        </div>

        <div>
          <label
            htmlFor="bedrooms"
            className="block text-sm font-medium text-brand-dark"
          >
            Min Beds
          </label>
          <select
            name="bedrooms"
            id="bedrooms"
            value={filters.bedrooms || ""}
            onChange={handleChange}
            className={inputStyles}
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
      <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
        <button
          type="button"
          onClick={handleClearFilters}
          className="px-4 py-2 text-sm font-medium text-brand-light bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:bg-brand-dark transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );

  return (
    <div className="mb-10">
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-brand-dark bg-brand-bg-white hover:bg-gray-50 transition-colors"
        >
          <FilterIcon />
          {isOpen ? "Close Filters" : "Show Filters"}
        </button>
      </div>
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {filterForm}
      </div>
      <div className="hidden lg:block">{filterForm}</div>
    </div>
  );
};

export default FilterBar;
