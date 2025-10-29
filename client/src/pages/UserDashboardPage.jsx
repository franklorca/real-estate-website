// client/src/pages/UserDashboardPage.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import PropertyCard from "../components/PropertyCard";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Simple SVG Icons for the profile card
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const StatusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const UserDashboardPage = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get("/api/users/me/saved-properties");
        setSavedProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch saved properties", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, [user]);

  const handleUnsaveFromDashboard = (propertyId) => {
    setSavedProperties((prevProperties) =>
      prevProperties.filter((p) => p.id !== propertyId)
    );
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-brand-bg-light">
        <p className="text-lg text-brand-light">Loading Member Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* --- Header --- */}
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-brand-dark">
            Member Dashboard
          </h1>
          <p className="mt-2 text-lg text-brand-light">
            Welcome back, {user?.name}.
          </p>
        </div>

        {/* --- Main Two-Column Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* --- Left Column: Profile & Stats --- */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-10 space-y-8">
              {/* Profile Card */}
              <div className="bg-brand-bg-white p-6 rounded-lg shadow-sm border border-gray-200/80">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent text-4xl font-serif">
                    {user.name.charAt(0)}
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold font-serif text-brand-dark">
                    {user.name}
                  </h2>
                  <p className="text-sm text-brand-light">
                    Luminous Heaven Member
                  </p>
                </div>
                <ul className="mt-6 space-y-3 text-sm border-t pt-4">
                  <li className="flex items-center">
                    <MailIcon />
                    <span className="ml-3 text-brand-text">{user.email}</span>
                  </li>
                  <li className="flex items-center">
                    <StatusIcon />
                    <span className="ml-3 text-brand-text">
                      Status:
                      <span
                        className={`ml-1 capitalize font-semibold ${
                          user.membership_status === "active"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {user.membership_status}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Subscription Card */}
              <div className="bg-brand-bg-white p-6 rounded-lg shadow-sm border border-gray-200/80">
                <h3 className="text-xl font-semibold font-serif text-brand-dark">
                  My Subscription
                </h3>
                <p className="mt-2 text-sm text-brand-light">
                  Manage your billing and membership details.
                </p>
                <button className="mt-4 w-full bg-brand-dark text-white px-5 py-2.5 rounded-md font-semibold hover:bg-brand-accent transition-colors">
                  Manage Subscription
                </button>
              </div>
            </div>
          </aside>

          {/* --- Right Column: Saved Properties --- */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-brand-bg-white p-6 rounded-lg shadow-sm border border-gray-200/80">
              <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-2xl font-semibold font-serif text-brand-dark">
                  Saved Properties
                </h2>
                <span className="bg-brand-accent/10 text-brand-accent font-bold px-3 py-1 rounded-full text-sm">
                  {savedProperties.length} Saved
                </span>
              </div>
              <AnimatePresence>
                {savedProperties.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {savedProperties.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        onUnsave={handleUnsaveFromDashboard}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 px-6"
                  >
                    <h3 className="text-xl font-semibold font-serif text-brand-dark">
                      Your Dossier is Empty
                    </h3>
                    <p className="mt-2 text-brand-light">
                      Start exploring our collection to save properties that
                      catch your eye.
                    </p>
                    <Link
                      to="/listings"
                      className="mt-6 inline-block bg-brand-accent text-white px-6 py-3 rounded-md font-semibold hover:bg-brand-dark transition-colors"
                    >
                      Explore Listings
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
