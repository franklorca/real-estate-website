// luminousheaven/src/app/properties/[identifier]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/services/api";
import AgentProfile from "@/components/AgentProfile";
import { generateSmartSlug, decodeId, isValidHashId } from "@/utils/slugify";
import { fetchWithSWR } from "@/utils/cache";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";

const StatIcon = ({ icon, label }) => (
  <div className="flex items-center text-gray-600">
    {icon}
    <span className="ml-2 text-sm font-medium">{label}</span>
  </div>
);

const BedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
    />
  </svg>
);

const BathIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0a2 2 0 012 2v3m0 0a2 2 0 01-2 2H7a2 2 0 01-2-2v-3a2 2 0 012-2m10 0V4"
    />
  </svg>
);

const VideoPlayer = ({ videoUrl }) => {
  let videoId;
  try {
    const url = new URL(videoUrl);
    videoId = url.searchParams.get("v") || url.pathname.split("/").pop();
  } catch (error) {
    console.error("Invalid video URL:", videoUrl);
    return null;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="aspect-w-16 aspect-h-9 relative w-full h-[400px]">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default function PropertyDetailPage() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const params = useParams();
  const router = useRouter();
  const identifier = params?.identifier;

  let resolvedId = null;
  const isStrictlyNumeric = /^\d+$/.test(identifier);

  const parts = identifier ? identifier.split("-") : [];
  const lastPart = parts.length > 0 ? parts[parts.length - 1] : "";

  if (isStrictlyNumeric) {
    resolvedId = identifier;
  } else if (lastPart && isValidHashId(lastPart)) {
    resolvedId = decodeId(lastPart);
  } else {
    const legacyMatch = identifier?.match(/^(\d+)/);
    if (legacyMatch) {
      resolvedId = legacyMatch[1];
    }
  }

  useEffect(() => {
    const fetchProperty = async () => {
      if (!resolvedId) {
        setLoading(false);
        setError("Invalid property link.");
        return;
      }

      try {
        await fetchWithSWR(
          `property_${resolvedId}`,
          async () => {
            const response = await api.get(`/api/properties/${resolvedId}`);
            return response.data;
          },
          {
            onCacheHit: (cachedProperty) => {
              if (cachedProperty) {
                setProperty(cachedProperty);
                setLoading(false);
              }
            },
            onFreshData: (fetchedProperty) => {
              if (fetchedProperty) {
                setProperty(fetchedProperty);
                setLoading(false);

                if (fetchedProperty.id && fetchedProperty.title) {
                  const expectedIdentifier = generateSmartSlug(
                    fetchedProperty.id,
                    fetchedProperty.title
                  );
                  if (identifier !== expectedIdentifier && !isStrictlyNumeric) {
                    router.replace(`/properties/${expectedIdentifier}`);
                  }
                }
              }
            },
            onError: (err) => {
              console.error("Failed to fetch property details:", err);
              setError("Could not load property details. It may have been removed.");
              setLoading(false);
            },
          }
        );
      } catch (err) {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [resolvedId, identifier, isStrictlyNumeric, router]);

  const rawGallery = property?.image_gallery;
  let galleryImages = [];
  if (Array.isArray(rawGallery)) {
    galleryImages = rawGallery;
  } else if (typeof rawGallery === "string") {
    try {
      const parsed = JSON.parse(rawGallery);
      if (Array.isArray(parsed)) galleryImages = parsed;
    } catch (e) {
      galleryImages = [];
    }
  }
  if (!Array.isArray(galleryImages) || galleryImages.length === 0) {
    galleryImages = property?.image ? [property.image] : [];
  }

  const handleNext = () => {
    if (!galleryImages.length) return;
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(nextIndex);
    setActiveImage(galleryImages[nextIndex]);
  };

  const handlePrev = () => {
    if (!galleryImages.length) return;
    const prevIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(prevIndex);
    setActiveImage(galleryImages[prevIndex]);
  };

  const handleThumbnailClick = (image, index) => {
    setActiveImage(image);
    setCurrentIndex(index);
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Under Offer":
        return "bg-yellow-100 text-yellow-800";
      case "Sold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  if (loading)
    return (
      <div className="text-center py-40 font-sans text-brand-light">
        Loading Property...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-40 text-red-500 font-sans">{error}</div>
    );
  if (!property)
    return (
      <div className="text-center py-40 font-sans">Property not found.</div>
    );

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={property.title}
        description={`Beautiful ${property.bedrooms} bed, ${
          property.bathrooms
        } bath property in ${property.city}. ${
          property.description ? property.description.substring(0, 120) + "..." : ""
        }`}
        image={activeImage || property.image}
        type="article"
      />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between mb-8 pb-8 border-b border-brand-divider">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark">
              {property.title}
            </h1>
            <p className="mt-2 text-lg text-brand-light">{property.city}</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-6">
            <StatIcon icon={<BedIcon />} label={`${property.bedrooms} Beds`} />
            <StatIcon
              icon={<BathIcon />}
              label={`${property.bathrooms} Baths`}
            />
            {property.status && (
              <span
                className={`text-sm font-semibold py-1 px-3 rounded-full ${getStatusClasses(
                  property.status
                )}`}
              >
                {property.status}
              </span>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-16">
          <div className="hidden md:grid grid-cols-12 gap-4 h-[650px]">
            <div
              className={`h-full overflow-hidden relative group cursor-pointer ${
                galleryImages.length > 1 ? "col-span-8" : "col-span-12"
              }`}
              onClick={() => handleThumbnailClick(galleryImages[0], 0)}
            >
              <Image
                src={galleryImages[0] || property.image}
                alt={property.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                priority
              />
            </div>

            {galleryImages.length > 1 && (
              <div className="col-span-4 flex flex-col gap-4 h-full">
                {galleryImages[1] && (
                  <div
                    className={`overflow-hidden relative group cursor-pointer ${
                      galleryImages.length > 2 ? "h-1/2" : "h-full"
                    }`}
                    onClick={() => handleThumbnailClick(galleryImages[1], 1)}
                  >
                    <Image
                      src={galleryImages[1]}
                      alt={`${property.title} secondary`}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    />
                  </div>
                )}
                {galleryImages[2] && (
                  <div
                    className="h-1/2 overflow-hidden relative group cursor-pointer"
                    onClick={() => handleThumbnailClick(galleryImages[2], 2)}
                  >
                    <Image
                      src={galleryImages[2]}
                      alt={`${property.title} tertiary`}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    />
                    {galleryImages.length > 3 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/60 backdrop-blur-sm">
                        <span className="text-white font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                          + {galleryImages.length - 3} More Photos
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
            >
              <button
                onClick={() => setActiveImage("")}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-50"
              >
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold">
                  Close
                </span>
              </button>

              <div className="relative w-full max-w-6xl h-[85vh] flex items-center justify-center">
                <Image
                  src={activeImage}
                  alt="Enlarged property view"
                  fill
                  sizes="100vw"
                  className="object-contain shadow-2xl"
                />

                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white backdrop-blur-md transition-all z-50"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white backdrop-blur-md transition-all z-50"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Narrative & Agent */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          <div className="lg:col-span-2">
            <section>
              <h2 className="font-serif text-3xl font-semibold text-brand-dark mb-8">
                The Narrative
              </h2>
              <div className="prose max-w-none">
                {property.description?.split("\n").map(
                  (para, idx) =>
                    para.trim() && (
                      <p
                        key={idx}
                        className="font-sans text-brand-light text-lg leading-[1.8] mb-6 last:mb-0"
                      >
                        {para}
                      </p>
                    )
                )}
              </div>
            </section>

            {property.video_url && (
              <section className="mt-12 pt-8 border-t border-brand-divider">
                <h2 className="font-serif text-3xl font-semibold text-brand-dark mb-4">
                  Video Tour
                </h2>
                <VideoPlayer videoUrl={property.video_url} />
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-10 space-y-8">
              <div className="bg-brand-bg p-6 rounded-lg shadow-sm border border-brand-divider">
                <p className="text-sm font-medium text-brand-light">Price</p>
                <p className="text-4xl font-bold text-brand-dark mt-1">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                  }).format(property.price)}
                </p>
              </div>

              <div className="bg-brand-bg p-6 rounded-lg shadow-sm border border-brand-divider">
                <AgentProfile
                  agentId={property.agent_id}
                  propertyId={property.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
