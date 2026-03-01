import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, name, type, image, url }) => {
    const isBrowser = typeof window !== "undefined";
    const defaultUrl = isBrowser ? window.location.href : "https://luminousheaven.com";

    const formattedTitle = title
        ? `${title} | Luminous Heaven`
        : "Luminous Heaven - Premium Real Estate";

    const formattedDescription = description
        || "Discover premium real estate, luxury vacation rentals, and exclusive listings at Luminous Heaven.";

    const formattedImage = image
        || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"; // Default beautiful mansion fallback

    const formattedUrl = url || defaultUrl;
    const formattedType = type || "website";
    const formattedName = name || "Luminous Heaven";

    return (
        <Helmet>
            {/* Standard SEO */}
            <title>{formattedTitle}</title>
            <meta name="description" content={formattedDescription} />

            {/* OpenGraph / Facebook / WhatsApp */}
            <meta property="og:type" content={formattedType} />
            <meta property="og:title" content={formattedTitle} />
            <meta property="og:description" content={formattedDescription} />
            <meta property="og:url" content={formattedUrl} />
            <meta property="og:image" content={formattedImage} />
            <meta property="og:site_name" content={formattedName} />

            {/* Twitter Cards */}
            <meta name="twitter:creator" content="@LuminousHeaven" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={formattedTitle} />
            <meta name="twitter:description" content={formattedDescription} />
            <meta name="twitter:image" content={formattedImage} />
        </Helmet>
    );
};

export default SEO;
