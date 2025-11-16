// client/src/components/PropertyForm.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";

const PropertyForm = ({ initialData = {}, onSubmit, buttonText }) => {
  // --- STATE MANAGEMENT ---
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

  // --- EFFECTS ---
  // Fetch agents for the dropdown
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

  // Populate form fields when editing
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
          : // --- (FIX 2: Changed fallback from [""] to []) ---
            []
      );
    }
  }, [initialData]);

  // --- FORM HANDLERS ---
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Handles success from the MAIN <ImageUpload> component.
   * Also used by the "Remove Image" button (by passing an empty string).
   */
  const handleMainImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  /**
   * Handles success from the GALLERY <ImageUpload> component.
   * Adds the new URL to the gallery array.
   */
  const handleGalleryImageUpload = (url) => {
    setGallery((prev) => [...prev, url]);
  };

  /**
   * Replaces old 'removeGalleryField'.
   * Called by the 'X' button on gallery preview images.
   */
  const removeGalleryImage = (indexToRemove) => {
    setGallery((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  // --- (FIX 5: Updated handleSubmit to use the clean 'gallery' array) ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please add a main (featured) image.");
      return;
    }

    const finalData = {
      ...formData,
      // 'gallery' is now a clean array, no filtering needed.
      image_gallery: JSON.stringify(gallery),
    };
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --- Main Grid for Fields --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {" "}
          {/* Column 1 */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Property Title"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-6">
          {" "}
          {/* Column 2 */}
          <div>
            <label
              htmlFor="agent_id"
              className="block text-sm font-medium text-gray-700"
            >
              Assign Agent
            </label>
            <select
              name="agent_id"
              id="agent_id"
              value={formData.agent_id}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1"
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
              className="block text-sm font-medium text-gray-700"
            >
              Property Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option>Available</option>
              <option>Under Offer</option>
              <option>Sold</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="listing_type"
              className="block text-sm font-medium text-gray-700"
            >
              Listing Type
            </label>
            <select
              name="listing_type"
              id="listing_type"
              value={formData.listing_type}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option>For Sale</option>
              <option>Vacation Rental</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- Full Width Fields --- */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Property Description"
        rows="6"
        className="w-full p-2 border rounded"
      />
      {/* --- MAIN IMAGE UPLOAD --- */}
      <div>
        <label className="block text-sm font-medium text-brand-dark">
          Main Image (Featured)
        </label>

        {/* If an image is already uploaded, show it */}
        {formData.image ? (
          <div className="mt-2">
            <img
              src={formData.image}
              alt="Main preview"
              className="w-full max-w-xs h-auto rounded border"
            />
            <button
              type="button"
              onClick={() => handleMainImageUpload("")} // Function to clear the image
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Image
            </button>
          </div>
        ) : (
          // If no image, show the upload component
          <ImageUpload onUploadSuccess={handleMainImageUpload} />
        )}
      </div>
      <input
        type="text"
        name="video_url"
        value={formData.video_url}
        onChange={handleChange}
        placeholder="YouTube Video URL (Optional)"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="floor_plan_url"
        value={formData.floor_plan_url}
        onChange={handleChange}
        placeholder="Floor Plan Image URL (Optional)"
        className="w-full p-2 border rounded"
      />

      {/* --- DYNAMIC IMAGE GALLERY --- */}
      {/* --- IMAGE GALLERY UPLOAD --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Gallery
        </label>

        {/* 1. The Preview Area: Show uploaded images */}
        <div className="flex flex-wrap gap-4 p-4 border rounded mb-4">
          {gallery.length === 0 && (
            <p className="text-sm text-gray-500">
              No gallery images uploaded yet.
            </p>
          )}

          {gallery.map((url, index) => (
            <div key={index} className="relative w-32 h-32">
              <img
                src={url}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(index)} // Use your remove function
                className="absolute top-0 right-0 m-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* 2. The Upload Area: Add new images */}
        <ImageUpload onUploadSuccess={handleGalleryImageUpload} />
        <p className="text-xs text-gray-500 mt-1">
          Each successful upload will be added to the gallery.
        </p>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default PropertyForm;
