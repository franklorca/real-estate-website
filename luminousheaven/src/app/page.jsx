// luminousheaven/src/app/page.jsx
"use client";

import React from "react";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import FeaturedListings from "@/components/FeaturedListings";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <ValueProposition />
      <FeaturedListings />
      <Testimonials />
      <CTA />
    </div>
  );
}
