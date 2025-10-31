// client/src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroVideo from '../assets/hero-video.mp4'; // Make sure this path is correct

const Hero = () => {
  return (
    // The main container remains a normal block element
    <div className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">

      {/* --- Video Background Layer --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
          autoPlay loop muted playsInline
        >
          <source src={HeroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-dark opacity-50"></div>
      </div>

      {/* --- Content Layer --- */}
      <motion.div
        // --- NEW FADE ON SCROLL LOGIC ---
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }} // Stays visible while in view
        viewport={{ amount: 0.8 }} // Start fading when 80% is scrolled past
        onViewportLeave={{ opacity: 0, transition: { duration: 0.5 } }} // Fade out when it leaves
        className="relative z-10 w-[90%] max-w-4xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-12 text-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          Luminous Heaven
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="font-sans mt-6 text-lg sm:text-xl max-w-2xl mx-auto opacity-90"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
        >
          Your Gateway to Extraordinary Living and Exclusive Stays.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-10"
        >
          <Link
            to="/pricing"
            className="font-sans bg-brand-accent text-white font-semibold py-3 px-8 rounded-md text-lg uppercase tracking-wider transition-transform transform hover:scale-105 shadow-lg"
          >
            Become a Member
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;