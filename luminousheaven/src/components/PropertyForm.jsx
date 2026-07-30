// luminousheaven/src/components/PropertyForm.jsx
"use client";

import React, { useState, useEffect } from "react";
import api from "@/services/api";
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";
import Image from "next/image";

const PropertyForm = ({ initialData = {}, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    image: "",
    description: "",
    video_url: "",
    floor_plan_url: "",
    status: "Available",
    listing_type: "For Sale",
    agent_id: "",
  });
  const [gallery, setGallery] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await api.get("/api/agents");
        setAgents(response.data);
      } catch (error) {
        toast.error("Could not load agents for selection.");
      }
    };
    fetchAgents();
  }, []);

  useEffect(() => {
    if (initialData.id) {
      setFormData({
        title: initialData.title || "",
        city: initialData.city || "",
        price: initialData.price || "",
        bedrooms: initialData.bedrooms || "",
        bathrooms: initialData.bathrooms || "",
        image: initialData.image || "",
        description: initialData.description || "",
        video_url: initialData.video_url || "",
        floor_plan_url: initialData.floor_plan_url || "",
        status: initialData.status || "Available",
        listing_type: initialData.listing_type || "For Sale",
        agent_id: initialData.agent_id || "",
      });

      let initialGallery = initialData.image_gallery;
      if (typeof initialGallery === "string") {
        try {
          initialGallery = JSON.parse(initialGallery);
        } catch (e) {
          initialGallery = [];
        }
      }
      setGallery(
        Array.isArray(initialGallery) && initialGallery.length > 0
          ? initialGallery
          : []
      );
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMainImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleGalleryImageUpload = (url) => {
    setGallery((prev) => [...prev, url]);
  };

  const removeGalleryImage = (indexToRemove) => {
    setGallery((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please add a main (featured) image.");
      return;
    }

    const finalData = {
      ...formData,
      image_gallery: JSON.stringify(gallery),
    };
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Property Title"
            required
            className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
          />
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            required
            className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
          />
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            required
            className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
          />
        </div>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="agent_id"
              className="block text-sm font-medium text-brand-dark mb-1"
            >
              Assign Agent
            </label>
            <select
              name="agent_id"
              id="agent_id"
              value={formData.agent_id}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
            >
              <option value="">Select an Agent</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-brand-dark mb-1"
            >
              Property Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
            >
              <option>Available</option>
              <option>Under Offer</option>
              <option>Sold</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="listing_type"
              className="block text-sm font-medium text-brand-dark mb-1"
            >
              Listing Type
            </label>
            <select
              name="listing_type"
              id="listing_type"
              value={formData.listing_type}
              onChange={handleChange}
              className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
            >
              <option>For Sale</option>
              <option>Vacation Rental</option>
            </select>
          </div>
        </div>
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Property Description"
        rows="6"
        className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
      />

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">
          Main Image (Featured)
        </label>

        {formData.image ? (
          <div className="mt-2">
            <div className="relative w-full max-w-xs h-48 rounded border overflow-hidden">
              <Image
                src={formData.image}
                alt="Main preview"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => handleMainImageUpload("")}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <ImageUpload onUploadSuccess={handleMainImageUpload} />
        )}
      </div>

      <input
        type="text"
        name="video_url"
        value={formData.video_url}
        onChange={handleChange}
        placeholder="YouTube Video URL (Optional)"
        className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
      />
      <input
        type="text"
        name="floor_plan_url"
        value={formData.floor_plan_url}
        onChange={handleChange}
        placeholder="Floor Plan Image URL (Optional)"
        className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
      />

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Image Gallery
        </label>

        <div className="flex flex-wrap gap-4 p-4 border border-brand-divider rounded mb-4">
          {gallery.length === 0 && (
            <p className="text-sm text-gray-500">
              No gallery images uploaded yet.
            </p>
          )}

          {gallery.map((url, index) => (
            <div key={index} className="relative w-32 h-32 rounded overflow-hidden shadow">
              <Image
                src={url}
                alt={`Gallery ${index + 1}`}
                fill
                sizes="128px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="absolute top-1 right-1 z-10 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <ImageUpload onUploadSuccess={handleGalleryImageUpload} />
        <p className="text-xs text-gray-500 mt-1">
          Each successful upload will be added to the gallery.
        </p>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 rounded-md text-white bg-brand-accent hover:bg-brand-dark transition-colors uppercase font-medium text-sm tracking-wider"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default PropertyForm;
