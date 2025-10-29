// client/src/components/Hero.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import HeroVideo from "../assets/hero-video.mp4"; // Make sure your video is here

// Reusable animated character component for the headline
const AnimatedCharacters = ({ text }) => {
  // Animation variants for each character
  const item = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  // Split the text into words and then characters
  const splitWords = text.split(" ");
  const words = [];
  splitWords.forEach((word) => {
    words.push(word.split(""));
  });

  return (
    // Map over each word
    <span className="font-serif">
      {words.map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap mr-[0.5em]">
          {" "}
          {/* Use 'em' for spacing relative to font size */}
          {/* Map over each character in the word */}
          {word.map((char, i) => (
            <span className="inline-block overflow-hidden" key={i}>
              <motion.span className="inline-block" variants={item}>
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"], // Track scroll from the end of the hero to the start of the next section
  });

  // Create parallax effects for the content as the user scrolls down
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Stagger animation for the container
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  return (
    // The main section is used as a scroll target
    <section ref={targetRef} className="relative h-screen w-full">
      {/* --- Sticky container to hold the hero while scrolling --- */}
      <motion.div
        style={{ opacity, scale }}
        className="fixed inset-0 flex items-center justify-center"
      >
        {/* --- Video Background Layer --- */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={HeroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-brand-dark opacity-50"></div>
        </div>

        {/* --- Frosted Glass Content Panel --- */}
        <motion.div
          className="relative z-10 w-[90%] max-w-4xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-12 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            <AnimatedCharacters text="Luminous Heaven" />
          </h1>

          <motion.p
            className="font-sans mt-6 text-lg sm:text-xl max-w-2xl mx-auto opacity-90"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
          >
            Your Gateway to Extraordinary Living and Exclusive Stays.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7, ease: "easeOut" }}
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
      </motion.div>
    </section>
  );
};

export default Hero;
