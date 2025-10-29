// client/src/components/ValueProposition.jsx
import React from "react";
import { motion } from "framer-motion";

// The feature data remains the same, but we'll re-add the icons here for clarity
const features = [
  {
    name: "Exclusive Access",
    description:
      "Gain entry to a curated list of off-market properties you won't find anywhere else.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
        />
      </svg>
    ),
  },
  {
    name: "Expertly Vetted",
    description:
      "Every listing is hand-picked and thoroughly evaluated by our team of real estate experts.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: "Preferred Pricing",
    description:
      "Leverage our network to access member-only pricing and advantageous deal structures.",
    icon: (
      <svg
        xmlns="http://www.w.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6h.008v.008H6V6z"
        />
      </svg>
    ),
  },
];

// Animation variants for the container to orchestrate staggered animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation variants for each feature card (fade in from below)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const ValueProposition = () => {
  return (
    // Using our new brand background color for a soft transition
    <div className="bg-brand-bg-light py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-accent">
            The Luminous Heaven Advantage
          </h2>
          <p className="mt-2 font-serif text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            A Higher Standard of Real Estate
          </p>
        </div>

        <motion.div
          className="mt-20 grid max-w-sm mx-auto gap-12 lg:max-w-none lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Animate when 30% of the section is visible
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={itemVariants}
              // This is now a styled "card"
              className="bg-brand-bg-white p-8 rounded-lg shadow-sm border border-gray-200/50"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-accent/10 text-brand-accent">
                {feature.icon}
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold leading-8 text-brand-dark">
                {feature.name}
              </h3>
              <p className="mt-4 text-base leading-7 text-brand-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ValueProposition;
