// client/src/components/FeaturedListings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard'; // We still need this component

const FeaturedListings = () => {
  // Set up state for properties, loading, and errors
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Define the async function to fetch data
    const fetchFeaturedProperties = async () => {
      try {
        // Fetch all properties from our API
        const response = await axios.get('http://localhost:5000/api/properties');
        
        // We only want to show the first 3 as "featured", so we slice the array
        setProperties(response.data.slice(0, 3));

      } catch (err) {
        console.error("Error fetching featured properties:", err);
        setError('Unable to load featured listings at this time.');
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    fetchFeaturedProperties();
  }, []); // The empty array ensures this effect runs only once on component mount

  // Helper function to render the content based on state
  const renderContent = () => {
    if (loading) {
      // You can replace this with a more sophisticated spinner component later
      return <p className="text-center text-gray-500">Loading featured listings...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }
    
    // If data is loaded and there's no error, render the grid
    return (
      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Exclusive Listings
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A curated selection of our finest properties, available only to members.
          </p>
        </div>
        {/* Render the content using our helper function */}
        {renderContent()}
      </div>
    </div>
  );
};

export default FeaturedListings;