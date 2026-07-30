// luminousheaven/src/components/AgentForm.jsx
"use client";

import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";

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
      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-2.5 border border-brand-divider rounded-md focus:ring-2 focus:ring-brand-accent text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full p-2.5 border border-brand-divider rounded-md focus:ring-2 focus:ring-brand-accent text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2.5 border border-brand-divider rounded-md focus:ring-2 focus:ring-brand-accent text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Profile Picture</label>
        <ImageUpload
          onUploadSuccess={(url) =>
            setFormData((prev) => ({ ...prev, profile_picture_url: url }))
          }
        />
        {formData.profile_picture_url && (
          <p className="mt-2 text-xs text-green-600 truncate">
            Current Image: {formData.profile_picture_url}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Agent Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Agent Bio"
          rows="4"
          className="w-full p-2.5 border border-brand-divider rounded-md focus:ring-2 focus:ring-brand-accent text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 rounded-md text-white bg-brand-accent hover:bg-brand-dark transition-colors text-sm font-medium uppercase tracking-wider"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AgentForm;
