// client/src/pages/UserDashboardPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard'; // We will render the saved properties using our existing card component

const UserDashboardPage = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchSavedProperties = async () => {
      // Don't try to fetch if we don't have a token yet
      if (!token) {
        setLoading(false); // Stop loading if there's no token
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users/me/saved-properties', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch saved properties", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSavedProperties();
  }, [token]); // This effect depends on the token, so it runs when the user logs in

  /**
   * This function is called by a PropertyCard component when the user
   * clicks the 'unsave' button from within the dashboard. It updates
   * the local state to remove the card from view instantly.
   */
  const handleUnsaveFromDashboard = (propertyId) => {
    setSavedProperties(prevProperties =>
      prevProperties.filter(p => p.id !== propertyId)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-lg text-gray-600">This is your personal space to manage your real estate journey.</p>

        {/* Saved Properties Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Saved Properties</h2>
          {savedProperties.length > 0 ? (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {savedProperties.map(prop => (
                <PropertyCard 
                  key={prop.id} 
                  property={prop} 
                  onUnsave={handleUnsaveFromDashboard} // Pass the handler to the child component
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-6 bg-white rounded-lg shadow">
              <p className="text-gray-600">You haven't saved any properties yet. Start exploring the listings to find your perfect home!</p>
            </div>
          )}
        </div>
        
        {/* Subscription Management Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Subscription</h2>
          <div className="bg-white shadow rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-800">Email:</p>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Membership Status:</p>
                <p className="text-green-600 font-semibold">Active</p>
              </div>
            </div>
            <div className="mt-6 border-t pt-6">
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors">
                Manage Subscription & Billing
              </button>
              <p className="text-xs text-gray-500 mt-2">You will be redirected to our secure payment partner.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;