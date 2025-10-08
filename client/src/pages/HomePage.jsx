// client/src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import ValueProposition from '../components/ValueProposition';
import FeaturedListings from '../components/FeaturedListings';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ValueProposition />
      <FeaturedListings />
      <Testimonials />
      <CTA />
    </>
  );
};

export default HomePage;