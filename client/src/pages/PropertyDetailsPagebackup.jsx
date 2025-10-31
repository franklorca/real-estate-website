// client/src/pages/PropertyDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import AgentProfile from "../components/AgentProfile";

// --- Helper Components ---

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

// --- Main Page Component ---
const PropertyDetailPage = () => {
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeImage, setActiveImage] = useState("");
    const { id } = useParams();
    const { user } = useAuth();

    const hasActiveMembership = user && user.membership_status === "active";

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/properties/${id}`);
                setProperty(response.data);
                const gallery = response.data.image_gallery || [];
                setActiveImage(gallery.length > 0 ? gallery[0] : response.data.image);
            } catch (err) {
                console.error("Failed to fetch property details:", err);
                setError("Could not load property details. It may have been removed.");
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

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
        return <div className="text-center py-40">Loading Property...</div>;
    if (error)
        return <div className="text-center py-40 text-red-500">{error}</div>;
    if (!property)
        return <div className="text-center py-40">Property not found.</div>;

    const galleryImages = property.image_gallery || [];

    return (
        <div className="bg-brand-bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* --- Editorial Header (Visible to all) --- */}
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

                {/* --- Image Gallery (Main image visible to all, gallery for members) --- */}
                <div className="flex flex-col gap-4 mb-16">
                    <div className="w-full h-[250px] sm:h-[400px] md:h-[550px] bg-gray-200 rounded-lg overflow-hidden shadow-2xl">
                        <img
                            src={activeImage}
                            alt={property.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {hasActiveMembership && galleryImages.length > 1 && (
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
                                        className={`w-full h-full object-cover transition-opacity duration-300 ${activeImage === img
                                                ? "opacity-100 ring-2 ring-brand-accent"
                                                : "opacity-60 hover:opacity-100"
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
                    {/* --- Left Column - Details --- */}
                    <div className="lg:col-span-2">
                        <section>
                            <h2 className="font-serif text-3xl font-semibold text-brand-dark">
                                Property Description
                            </h2>
                            <div className="mt-4 prose max-w-none text-brand-light leading-relaxed">
                                <p>{property.description}</p>
                            </div>
                        </section>

                        {hasActiveMembership ? (
                            <>
                                {property.video_url && (
                                    <section className="mt-12 pt-8 border-t border-brand-divider">
                                        <h2 className="font-serif text-3xl font-semibold text-brand-dark">
                                            Video Tour
                                        </h2>
                                        <div className="mt-4">
                                            <VideoPlayer videoUrl={property.video_url} />
                                        </div>
                                    </section>
                                )}
                                {property.floor_plan_url && (
                                    <section className="mt-12 pt-8 border-t border-brand-divider">
                                        <h2 className="font-serif text-3xl font-semibold text-brand-dark">
                                            Floor Plan
                                        </h2>
                                        <div className="mt-4 border rounded-lg overflow-hidden">
                                            <img
                                                src={property.floor_plan_url}
                                                alt="Floor Plan"
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    </section>
                                )}
                            </>
                        ) : (
                            (property.video_url || property.floor_plan_url) && (
                                <div className="mt-12 pt-8 border-t border-brand-divider text-center bg-brand-bg-light p-8 rounded-lg">
                                    <h3 className="font-serif text-2xl font-semibold text-brand-dark">
                                        Unlock Full Media Access
                                    </h3>
                                    <p className="mt-2 text-brand-light">
                                        Video tours and floor plans are available exclusively for
                                        our members.
                                    </p>
                                    <Link
                                        to="/pricing"
                                        className="mt-6 inline-block w-full sm:w-auto bg-brand-accent text-white py-3 px-6 rounded-md font-semibold hover:bg-brand-dark transition-colors"
                                    >
                                        Become a Member
                                    </Link>
                                </div>
                            )
                        )}
                    </div>

                    {/* --- Right Column - Price & Contact --- */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-10 space-y-8">
                            <div className="bg-brand-bg-light p-6 rounded-lg shadow-sm border border-gray-200/80">
                                <p className="text-sm font-medium text-brand-light">Price</p>
                                {hasActiveMembership ? (
                                    <p className="text-4xl font-bold text-brand-dark mt-1">
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            minimumFractionDigits: 0,
                                        }).format(property.price)}
                                    </p>
                                ) : (
                                    <div className="mt-2 text-3xl font-bold text-brand-dark blur-md select-none">
                                        $8,888,888
                                    </div>
                                )}
                            </div>

                            {hasActiveMembership ? (
                                <div className="bg-brand-bg-light p-6 rounded-lg shadow-sm border border-gray-200/80">
                                    <AgentProfile
                                        agentId={property.agent_id}
                                        propertyId={property.id}
                                    />
                                </div>
                            ) : (
                                <div className="bg-brand-bg-light p-6 rounded-lg shadow-sm border border-gray-200/80 text-center">
                                    <h3 className="font-serif text-xl font-semibold text-brand-dark">
                                        Unlock Agent Details
                                    </h3>
                                    <p className="mt-2 text-brand-light">
                                        Join now to contact the agent directly.
                                    </p>
                                    <Link
                                        to={user ? "/pricing" : "/login?redirect=/pricing"}
                                        className="mt-6 inline-block w-full bg-brand-accent text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors"
                                    >
                                        {user ? "Upgrade Your Membership" : "Login to Continue"}
                                    </Link>
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
