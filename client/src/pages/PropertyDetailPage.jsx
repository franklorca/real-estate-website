// client/src/pages/PropertyDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import AgentProfile from "../components/AgentProfile";

// Simple YouTube embed component for clean code
const VideoPlayer = ({ videoUrl }) => {
  const videoId = videoUrl.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="aspect-w-16 aspect-h-9">
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

const PropertyDetailPage = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/properties/${id}`);
        setProperty(response.data);
        const gallery = response.data.image_gallery || [];
        setActiveImage(gallery.length > 0 ? gallery[0] : response.data.image);
      } catch (err) {
        setError("Could not load property details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading)
    return <div className="text-center py-40">Loading Property...</div>;
  if (error)
    return <div className="text-center py-40 text-red-500">{error}</div>;
  if (!property)
    return <div className="text-center py-40">Property not found.</div>;

  const galleryImages = property.image_gallery || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Responsive Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            {property.title}
          </h1>
          <p className="text-md md:text-xl text-gray-600 mt-2">
            {property.city}
          </p>
        </div>

        {/* Image Gallery */}
        <div className="flex flex-col gap-4 mb-12">
          <div className="w-full h-[250px] sm:h-[400px] md:h-[550px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img
              src={activeImage}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="h-20 sm:h-24 rounded-md overflow-hidden cursor-pointer"
                  onClick={() => setActiveImage(img)}
                >
                  <img
                    src={img}
                    alt={`${property.title} thumbnail ${index + 1}`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      activeImage === img
                        ? "opacity-100 ring-2 ring-indigo-500"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-6 text-gray-700 border-b pb-6">
              <span className="font-semibold">{property.bedrooms} Beds</span>
              <span className="text-gray-300">|</span>
              <span className="font-semibold">{property.bathrooms} Baths</span>
              {property.status && (
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    property.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {property.status}
                </span>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Description
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>

            {/* CONDITIONAL VIDEO PLAYER */}
            {property.video_url && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Video Tour
                </h2>
                <div className="mt-4">
                  <VideoPlayer videoUrl={property.video_url} />
                </div>
              </div>
            )}

            {/* CONDITIONAL FLOOR PLAN */}
            {property.floor_plan_url && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Floor Plan
                </h2>
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <img
                    src={property.floor_plan_url}
                    alt="Floor Plan"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Price & Contact */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-10">
              <p className="text-3xl font-bold text-gray-900">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                }).format(property.price)}
              </p>
              {user ? (
                <div className="mt-6 border-t pt-6">
                  <AgentProfile
                    agentId={property.agent_id}
                    propertyId={property.id}
                  />
                </div>
              ) : (
                <div className="mt-6 text-center border-t pt-6">
                  <p className="font-semibold">
                    Agent details and contact form are for members only.
                  </p>
                  <Link to="/login" className="text-indigo-600 hover:underline">
                    Log in
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/signup"
                    className="text-indigo-600 hover:underline"
                  >
                    join now
                  </Link>
                  .
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
