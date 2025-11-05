// client/src/components/Testimonials.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

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
  {
    id: 3,
    quote:
      "The attention to detail and personalized experience made us feel valued. We found our forever home thanks to Luminous Heaven.",
    author: "Clara Windsor",
    location: "Aspen, CO",
  },
  {
    id: 4,
    quote:
      "Every property recommendation felt handpicked for us. This is what luxury real estate should feel like.",
    author: "Jonathan Ames",
    location: "Palm Springs, CA",
  },
  {
    id: 5,
    quote:
      "Professional, discreet, and inspiring. Luminous Heaven brings the essence of luxury living to life.",
    author: "Sophia Delacroix",
    location: "Paris, France",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  const intervalRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % testimonialsData.length);
  const prev = () =>
    setIndex(
      (i) => (i - 1 + testimonialsData.length) % testimonialsData.length
    );

  useEffect(() => {
    intervalRef.current = setInterval(next, 7000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleMouseEnter = () => clearInterval(intervalRef.current);
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(next, 7000);
  };

  return (
    <section
      className="relative bg-gradient-to-b from-slate-950 via-brand-dark to-slate-950 py-24 sm:py-32 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
        >
          The Voice of the Club
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-lg sm:text-xl leading-8 text-gray-300 max-w-3xl mx-auto"
        >
          Discover the experiences of those who have found their extraordinary
          homes with us.
        </motion.p>
      </div>

      {/* 3D Carousel */}
      <div
        className="relative mt-16 max-w-5xl mx-auto px-6 perspective-1000"
        ref={constraintsRef}
      >
        <div className="relative h-96 sm:h-[28rem] flex items-center justify-center">
          <AnimatePresence initial={false}>
            {testimonialsData.map((testimonial, i) => {
              const diff =
                ((i - index + testimonialsData.length) %
                  testimonialsData.length) -
                Math.floor(testimonialsData.length / 2);
              const isActive = i === index;

              return (
                <motion.div
                  key={testimonial.id}
                  className="absolute w-full max-w-md sm:max-w-lg lg:max-w-xl"
                  initial={false}
                  animate={{
                    x: `${diff * 110}%`,
                    scale: isActive ? 1 : 0.85,
                    z: isActive ? 100 : diff * 20,
                    opacity: isActive ? 1 : 0.5,
                    rotateY: isActive ? 0 : diff * 10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  drag="x"
                  dragConstraints={constraintsRef}
                  dragElastic={0.2}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(e, { offset }) => {
                    setIsDragging(false);
                    if (offset.x < -100) next();
                    if (offset.x > 100) prev();
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* High-Contrast Glass Card */}
                  <motion.figure
                    className="relative h-full rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-black/90 backdrop-blur-xl border border-white/20 p-8 sm:p-10 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
                    whileHover={{ scale: 1.02 }}
                    style={{
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {/* Subtle Inner Glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />

                    {/* Quote Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: isActive ? 1 : 0.7, rotate: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-6 left-6 text-white/30"
                    >
                      <Quote className="w-12 h-12 sm:w-14 sm:h-14" />
                    </motion.div>

                    <blockquote className="relative z-10 h-full flex flex-col justify-between">
                      {/* HIGH READABILITY QUOTE */}
                      <p
                        className="font-serif text-lg sm:text-xl lg:text-2xl leading-relaxed text-white italic mt-14 sm:mt-16 antialiased"
                        style={{
                          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                          lineHeight: "1.75",
                        }}
                      >
                        “{testimonial.quote}”
                      </p>

                      {/* Author */}
                      <figcaption className="mt-10 sm:mt-12 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg">
                            {testimonial.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-base sm:text-lg leading-tight">
                              {testimonial.author}
                            </p>
                            <p className="text-gray-300 text-sm leading-tight">
                              {testimonial.location}
                            </p>
                          </div>
                        </div>
                      </figcaption>
                    </blockquote>
                  </motion.figure>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all z-20 shadow-lg"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all z-20 shadow-lg"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition-all duration-300 ${
                i === index
                  ? "w-10 h-2.5 bg-white rounded-full shadow-md"
                  : "w-2.5 h-2.5 bg-white/50 rounded-full hover:bg-white/80"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <p className="mt-16 text-center text-sm text-gray-500 sm:hidden">
        Swipe to explore
      </p>
    </section>
  );
};

export default Testimonials;
