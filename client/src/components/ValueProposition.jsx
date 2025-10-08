// client/src/components/ValueProposition.jsx
import React from 'react';
import { motion } from 'framer-motion';

// This array holds the data for our features. This makes the code cleaner.
const features = [
  {
    name: 'Exclusive Access',
    description: 'Gain entry to a curated list of off-market properties you won\'t find anywhere else.',
    icon: ( // Key Icon SVG
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
  {
    name: 'Expertly Vetted',
    description: 'Every listing is hand-picked and thoroughly evaluated by our team of real estate experts.',
    icon: ( // Check Badge Icon SVG
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Preferred Pricing',
    description: 'Leverage our network to access member-only pricing and advantageous deal structures.',
    icon: ( // Tag Icon SVG
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
];

// Animation variants for the container to orchestrate children animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // This will make each child animate in 0.2s after the previous one
    },
  },
};

// Animation variants for each feature item
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' },
  },
};

const ValueProposition = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-600">The Luminous Heaven Advantage</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Unlock a Higher Standard of Real Estate
          </p>
        </div>
        <motion.div
          className="mt-16 grid max-w-2xl mx-auto gap-x-8 gap-y-16 md:max-w-none md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // The animation will trigger when the section scrolls into view
          viewport={{ once: true, amount: 0.5 }} // Ensures animation runs once
        >
          {features.map((feature) => (
            <motion.div key={feature.name} variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-800 text-white">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-6 text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ValueProposition;