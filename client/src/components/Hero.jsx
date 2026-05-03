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
          className="font-sans bg-brand-accent text-white font-semibold py-3.5 px-10 rounded-sm text-[15px] uppercase tracking-[0.15em] transition-all duration-500 hover:bg-brand-accent-hover hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]"
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
          className="font-sans bg-brand-accent text-white font-semibold py-3.5 px-10 rounded-sm text-[15px] uppercase tracking-[0.15em] transition-all duration-500 hover:bg-brand-accent-hover hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]"
        >
          Complete Membership Setup
        </Link>
      );
    }

    // --- CASE 3: Guest (not logged in) ---
    return (
      <Link
        to="/pricing"
        className="font-sans bg-brand-accent text-white font-semibold py-3.5 px-10 rounded-sm text-[15px] uppercase tracking-[0.15em] transition-all duration-500 hover:bg-brand-accent-hover hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]"
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-5xl bg-black/20 backdrop-blur-sm border border-white/10 rounded-sm shadow-2xl p-10 sm:p-16 text-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif text-5xl sm:text-7xl lg:text-[6rem] font-medium tracking-wide"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}
        >
          Luminous Heaven
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans mt-8 text-lg sm:text-xl max-w-2xl mx-auto opacity-90 font-light tracking-wide"
          style={{ textShadow: "0 2px 15px rgba(0,0,0,0.6)" }}
        >
          Your Gateway to Extraordinary Living and Exclusive Rentals.
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
