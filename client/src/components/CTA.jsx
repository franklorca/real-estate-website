// client/src/components/CTA.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80";

  return (
    // Main container with a background image
    <div
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-brand-dark/70"></div>

      <div className="relative max-w-4xl mx-auto text-center py-24 px-6 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Begin Your Journey.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-200 max-w-2xl mx-auto">
            Join the Luminous Heaven club today to unlock exclusive listings,
            preferred pricing, and a network of discerning individuals.
          </p>
          <div className="mt-12">
            <Link
              to="/pricing"
              className="font-sans bg-brand-accent text-white font-semibold py-4 px-10 rounded-md text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Become a Member
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTA;
