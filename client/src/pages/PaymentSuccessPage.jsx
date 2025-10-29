// client/src/pages/PaymentSuccessPage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const PaymentSuccessPage = () => {
  const { loginAction } = useAuth();

  // This effect will re-fetch the user's profile, which will now be 'active'.
  useEffect(() => {
    // We get the token from localStorage and trigger a re-authentication.
    const token = localStorage.getItem("token");
    if (token) {
      loginAction(token);
    }
    toast.success("Welcome to the club!");
  }, [loginAction]);

  return (
    <div className="bg-brand-bg-light min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-xl shadow-lg">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
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
        <h1 className="mt-4 font-serif text-3xl font-bold text-brand-dark">
          Payment Successful!
        </h1>
        <p className="mt-2 text-brand-light">
          Your membership is now active. You have unlocked full access to
          Luminous Heaven.
        </p>
        <div className="mt-8">
          <Link
            to="/dashboard"
            className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-brand-accent hover:bg-brand-dark"
          >
            Go to Your Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
