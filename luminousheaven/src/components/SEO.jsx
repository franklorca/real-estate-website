// luminousheaven/src/components/SEO.jsx
"use client";

import React from "react";

const SEO = ({ title, description, image, url }) => {
  const formattedTitle = title
    ? `${title} | Luminous Heaven`
    : "Luminous Heaven - Premium Real Estate";

  const formattedDescription =
    description ||
    "Discover premium real estate, luxury vacation rentals, and exclusive listings at Luminous Heaven.";

  const formattedImage =
    image ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  return (
    <>
      <title>{formattedTitle}</title>
      <meta name="description" content={formattedDescription} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={formattedDescription} />
      <meta property="og:image" content={formattedImage} />
    </>
  );
};

export default SEO;
