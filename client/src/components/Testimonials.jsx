// client/src/components/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonialsData = [
  {
    id: 1,
    quote:
      "Luminous Heaven gave us access to our dream home before it ever hit the market. The process was seamless and felt truly exclusive. We couldn't be happier.",
    author: "Dr. Eleanor Vance",
    location: "Malibu, CA",
  },
  {
    id: 2,
    quote:
      "As a busy professional, I don't have time to sift through hundreds of listings. The curated selection from Luminous Heaven is a game-changer. They understand quality.",
    author: "Marcus Thorne",
    location: "New York, NY",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const Testimonials = () => {
  return (
    // Main container with dark brand color and relative positioning for pseudo-elements
    <div className="relative bg-brand-dark text-white py-24 sm:py-32 overflow-hidden">
      {/* --- 1. Subtle Background Gradient Light --- */}
      <div
        className="absolute top-1/2 left-1/2 w-[80rem] h-[80rem] -translate-x-1/2 -translate-y-1/2 bg-indigo-900/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The Voice of the Club
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover the experiences of those who have found their extraordinary
            homes with us.
          </p>
        </div>

        {/* --- 2. Decorative Quotation Mark --- */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 -z-10">
          <svg
            className="w-96 h-96 text-white/5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M10.8817 5.56742C12.8315 5.56742 14.4178 7.15372 14.4178 9.10352C14.4178 10.9328 13.0903 12.5191 11.245 12.7201L10.7441 14.4178H12.2709V18.4326H5.56742V12.2709L8.45501 5.82627C8.95594 5.66175 9.82037 5.56742 10.8817 5.56742ZM18.4326 5.56742C20.3824 5.56742 21.9687 7.15372 21.9687 9.10352C21.9687 10.9328 20.6412 12.5191 18.7959 12.7201L18.295 14.4178H19.8218V18.4326H13.1183V12.2709L15.9941 5.82627C16.5059 5.66175 17.3704 5.56742 18.4326 5.56742Z" />
          </svg>
        </div>

        <motion.div
          className="mt-16 grid max-w-2xl mx-auto gap-8 lg:max-w-none lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonialsData.map((testimonial) => (
            <motion.figure
              key={testimonial.id}
              variants={itemVariants}
              className="flex flex-col rounded-xl bg-white/5 backdrop-blur-sm p-8"
            >
              <blockquote className="flex-grow">
                <p className="font-serif text-2xl leading-9 text-gray-100">
                  “{testimonial.quote}”
                </p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-x-4">
                <div className="font-semibold text-white">
                  <div className="text-base">{testimonial.author}</div>
                  <div className="text-sm text-gray-400 font-normal">
                    {testimonial.location}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
