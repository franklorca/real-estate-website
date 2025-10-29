// client/src/pages/EditPropertyPage.jsx
import React, { useState, useEffect } from "react"; // <-- IMPORTED useState and useEffect
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import PropertyForm from "../components/PropertyForm";

const EditPropertyPage = () => {
  // --- THESE LINES WERE MISSING/INCORRECT ---
  const [property, setProperty] = useState(null); // State to hold the fetched property
  const { id } = useParams();
  const navigate = useNavigate();
  // ------------------------------------------

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/api/properties/${id}`);
        setProperty(response.data); // Correctly set the state
      } catch (err) {
        console.error("Failed to fetch property:", err);
        toast.error("Could not load property data.");
        navigate("/admin/dashboard"); // Redirect if property can't be found
      }
    };
    fetchProperty();
  }, [id]);

  const handleUpdateProperty = async (formData) => {
    try {
      await api.put(`/api/properties/${id}`, formData);
      toast.success("Property updated successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Failed to update property:", err);
      toast.error(
        "Failed to update property. Please check the fields and try again."
      );
    }
  };

  // Handle the loading state gracefully
  if (!property) {
    return <div className="text-center py-40">Loading property data...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Property
        </h1>
        <PropertyForm
          initialData={property}
          onSubmit={handleUpdateProperty}
          buttonText="Update Property"
        />
      </div>
    </div>
  );
};

export default EditPropertyPage;
