// client/src/components/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';
// We have removed the import from dummyProperties.js

// The testimonial data now lives directly in this file as a constant.
const testimonialsData = [
  {
    id: 1,
    quote: "Luminous Heaven gave us access to our dream home before it ever hit the market. The process was seamless and felt truly exclusive. We couldn't be happier.",
    author: "Dr. Eleanor Vance",
    location: "Malibu, CA",
  },
  {
    id: 2,
    quote: "As a busy professional, I don't have time to sift through hundreds of listings. The curated selection from Luminous Heaven is a game-changer. They understand quality.",
    author: "Marcus Thorne",
    location: "New York, NY",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};


const Testimonials = () => {
  return (
    <div className="bg-gray-800 text-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Members Are Saying
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover the experiences of those who have found their extraordinary homes with us.
          </p>
        </div>
        <motion.div
          className="mt-16 flow-root"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid max-w-2xl mx-auto gap-x-8 gap-y-10 md:max-w-none md:grid-cols-2">
            {/* The .map function now uses our local testimonialsData constant */}
            {testimonialsData.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="flex flex-col rounded-2xl bg-white/5 p-8 text-center"
              >
                <blockquote className="text-gray-300">
                  <p>“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-center gap-x-4">
                  <div className="font-semibold text-white">
                    {testimonial.author}
                    <span className="text-gray-400 font-normal"> / {testimonial.location}</span>
                  </div>
                </figcaption>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;