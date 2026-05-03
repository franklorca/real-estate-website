// client/src/components/Testimonials.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonialsData = [
  {
    id: 1,
    quote:
      "Luminous Heaven gave us access to our dream home before it ever hit the market. The process was seamless and truly exclusive.",
    author: "Dr. Eleanor Vance",
    location: "Malibu, CA",
  },
  {
    id: 2,
    quote:
      "I don't have time to sift through hundreds of listings. The curated selection from Luminous Heaven is a game-changer.",
    author: "Marcus Thorne",
    location: "New York, NY",
  },
  {
    id: 3,
    quote:
      "Every property recommendation felt handpicked for us. This is what luxury real estate should feel like.",
    author: "Jonathan Ames",
    location: "Palm Springs, CA",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % testimonialsData.length);
    }, 6000); // 6 second rotation
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-brand-bg py-32 sm:py-48 overflow-hidden border-t border-brand-divider/30">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative h-[400px] sm:h-[350px] flex items-center justify-center">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute w-full px-4"
          >
            <p className="font-serif text-3xl sm:text-5xl lg:text-6xl text-brand-dark leading-tight tracking-tight max-w-4xl mx-auto italic">
              "{testimonialsData[index].quote}"
            </p>
            
            <div className="mt-12 flex flex-col items-center justify-center">
              <div className="w-12 h-[1px] bg-brand-accent mb-6"></div>
              <p className="font-sans text-[11px] font-bold tracking-[0.2em] text-brand-dark uppercase">
                {testimonialsData[index].author}
              </p>
              <p className="font-sans text-[10px] tracking-widest text-brand-light uppercase mt-1">
                {testimonialsData[index].location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Testimonials;
