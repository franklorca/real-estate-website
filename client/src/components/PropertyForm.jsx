// client/src/components/PropertyForm.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

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
  const [gallery, setGallery] = useState([""]);
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
          : [""]
      );
    }
  }, [initialData]);

  // --- FORM HANDLERS ---
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGalleryChange = (index, value) => {
    const newGallery = [...gallery];
    newGallery[index] = value;
    setGallery(newGallery);
  };

  const addGalleryField = () => {
    setGallery([...gallery, ""]);
  };

  const removeGalleryField = (index) => {
    if (gallery.length > 1) {
      setGallery(gallery.filter((_, i) => i !== index));
    } else {
      // If it's the last field, just clear it instead of removing it
      setGallery([""]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      image_gallery: JSON.stringify(gallery.filter((url) => url.trim() !== "")),
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
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Main Image URL (Featured)"
        required
        className="w-full p-2 border rounded"
      />
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Gallery URLs
        </label>
        {gallery.map((url, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={url}
              onChange={(e) => handleGalleryChange(index, e.target.value)} // Correctly calls the handler
              placeholder={`Image URL ${index + 1}`}
              className="flex-grow p-2 border rounded-l"
            />
            <button
              type="button"
              onClick={() => removeGalleryField(index)} // Correctly calls the handler
              className="px-3 py-2 bg-red-500 text-white rounded-r hover:bg-red-600"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addGalleryField} // Correctly calls the handler
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
        >
          + Add Another Image
        </button>
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
