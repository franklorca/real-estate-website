// client/src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeroVideo from "../assets/hero-video.mp4"; // ✅ Ensure this path is correct

const Hero = () => {
  const { user } = useAuth();

  const renderCtaButton = () => {
    // --- CASE 1: Logged in and active member ---
    if (user && user.membership_status === "active") {
      return (
        <Link
          to="/listings"
          className="font-sans bg-brand-accent border-2 border-brand-accent text-white font-bold py-3 px-10 rounded-md text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:bg-transparent hover:border-white"
        >
          Explore Properties
        </Link>
      );
    }

    // --- CASE 2: Logged in but pending membership ---
    if (user && user.membership_status === "pending") {
      return (
        <Link
          to="/pricing"
          className="font-sans bg-yellow-500 border-2 border-yellow-500 text-white font-bold py-3 px-10 rounded-md text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:bg-transparent hover:border-white"
        >
          Complete Membership Setup
        </Link>
      );
    }

    // --- CASE 3: Guest (not logged in) ---
    return (
      <Link
        to="/pricing"
        className="font-sans bg-brand-accent text-white font-semibold py-3 px-8 rounded-md text-lg uppercase tracking-wider transition-transform transform hover:scale-105 shadow-lg"
      >
        Become a Member
      </Link>
    );
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      {/* --- Video Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={HeroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-dark opacity-50"></div>
      </div>

      {/* --- Foreground Content --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-[90%] max-w-4xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-12 text-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          Luminous Heaven
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans mt-6 text-lg sm:text-xl max-w-2xl mx-auto opacity-90"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
        >
          Your Gateway to Extraordinary Living and Exclusive Stays.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          {renderCtaButton()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
