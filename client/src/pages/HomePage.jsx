// client/src/pages/HomePage.jsx
import React from "react";
import Hero from "../components/Hero";
import ValueProposition from "../components/ValueProposition";
import FeaturedListings from "../components/FeaturedListings";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import SEO from "../components/SEO";

const HomePage = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Discover Luminous Heaven, your destination for premium real estate, luxury vacation rentals, and exclusive listings."
      />
      <Hero />
      <ValueProposition />
      <FeaturedListings />
      <Testimonials />
      <CTA />
    </>
  );
};

export default HomePage;
