// client/src/components/AgentForm.jsx
import React, { useState, useEffect } from "react";

const AgentForm = ({ initialData = {}, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    profile_picture_url: "",
  });

  useEffect(() => {
    if (initialData.id) {
      // Populate form if we're editing
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        bio: initialData.bio || "",
        profile_picture_url: initialData.profile_picture_url || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="profile_picture_url"
        value={formData.profile_picture_url}
        onChange={handleChange}
        placeholder="Profile Picture URL"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Agent Bio"
        rows="4"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AgentForm;
