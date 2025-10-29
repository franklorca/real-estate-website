// client/src/pages/CreatePropertyPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import PropertyForm from "../components/PropertyForm";

const CreatePropertyPage = () => {
  const navigate = useNavigate();

  // We no longer need useAuth() as the api service handles the token.
  // const { token } = useAuth();

  const handleCreateProperty = async (formData) => {
    try {
      await api.post("/api/properties", formData);
      toast.success("Property created successfully!");
      // On success, navigate back to the dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Failed to create property:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to create property.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Property
        </h1>
        <PropertyForm
          onSubmit={handleCreateProperty}
          buttonText="Create Property"
        />
      </div>
    </div>
  );
};

export default CreatePropertyPage;
