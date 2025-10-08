// client/src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import HeroBackground from '../assets/hero-background.jpg'; // Make sure the image path is correct

const Hero = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${HeroBackground})` }}
    >
      {/* Black overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center p-4">
        {/* Animated main headline */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Luminous Heaven
        </motion.h1>

        {/* Animated sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-2xl mb-8"
        >
          Your Gateway to Extraordinary Living.
        </motion.p>

        {/* Animated button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg uppercase tracking-wider transition-colors duration-300"
        >
          Explore Exclusive Listings
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;