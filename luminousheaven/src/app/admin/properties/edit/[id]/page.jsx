// luminousheaven/src/app/admin/properties/edit/[id]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "react-toastify";
import PropertyForm from "@/components/PropertyForm";

export default function EditPropertyPage() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        toast.error("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await api.put(`/api/properties/${id}`, formData);
      toast.success("Property updated successfully!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Failed to update property:", error);
      toast.error(error.response?.data?.message || "Failed to update property.");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading property data...</div>;
  }

  if (!property) {
    return <div className="text-center py-20 text-red-500">Property not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-serif text-brand-dark mb-8">
        Edit Property #{id}
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-brand-divider">
        <PropertyForm
          initialData={property}
          onSubmit={handleUpdate}
          buttonText="Save Changes"
        />
      </div>
    </div>
  );
}
