// client/src/components/CTA.jsx
import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto text-center py-24 px-6 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Begin Your Journey to Extraordinary Living.
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Join the Luminous Heaven club today to unlock exclusive listings, preferred pricing, and a network of discerning individuals.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md bg-gray-800 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 transition-transform"
            >
              Become a Member
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTA;