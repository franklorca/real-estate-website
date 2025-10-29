// client/src/pages/PricingPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

// Helper component for benefit list items
const Benefit = ({ children }) => (
  <li className="flex items-start">
    <svg
      className="h-6 w-6 flex-shrink-0 text-green-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
    <span className="ml-3 text-gray-300">{children}</span>
  </li>
);

const PricingPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (user && user.membership_status === "active") {
    toast.info("You are already an active member.");
    return <Navigate to="/dashboard" replace />;
  }

  const handleJoinNow = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/payments/create-checkout-session");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Could not initiate payment. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-brand-dark min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-indigo-900/20 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-12 text-white">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold">The Final Step</h1>
          <p className="mt-3 text-gray-300">
            Unlock lifetime access to the Luminous Heaven club.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            What's Included
          </h2>
          <ul className="mt-4 space-y-3">
            <Benefit>Full access to all exclusive property listings</Benefit>
            <Benefit>Direct contact with our network of elite agents</Benefit>
            <Benefit>Access to video tours and detailed floor plans</Benefit>
            <Benefit>Curated vacation stays and lifestyle experiences</Benefit>
          </ul>
        </div>

        {/* --- PROMOTIONAL PRICE UI --- */}
        <div className="mt-10 text-center bg-white/10 p-8 rounded-lg">
          <p className="font-semibold text-gray-300">Limited Time Offer</p>
          <div className="my-2 flex items-center justify-center gap-x-4">
            <span className="text-3xl text-gray-400 line-through">$50</span>
            <span className="text-5xl font-bold text-white">$30</span>
          </div>
          <p className="text-sm text-gray-400">One-time payment</p>
        </div>

        <div className="mt-10">
          {user ? (
            <button
              onClick={handleJoinNow}
              disabled={isLoading}
              className="w-full bg-brand-accent hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors transform hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Secure Checkout with Stripe"}
            </button>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-gray-300">
                Please sign up or log in to continue.
              </p>
              <Link
                to="/login?redirect=/pricing"
                className="bg-brand-accent hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-lg"
              >
                Login or Sign Up
              </Link>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Payments are securely processed by Stripe.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
