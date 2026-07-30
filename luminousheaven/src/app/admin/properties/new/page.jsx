// luminousheaven/src/app/admin/properties/new/page.jsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "react-toastify";
import PropertyForm from "@/components/PropertyForm";

export default function CreatePropertyPage() {
  const router = useRouter();

  const handleCreate = async (formData) => {
    try {
      await api.post("/api/properties", formData);
      toast.success("Property created successfully!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Failed to create property:", error);
      toast.error(error.response?.data?.message || "Failed to create property.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-serif text-brand-dark mb-8">
        Add New Property
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-brand-divider">
        <PropertyForm onSubmit={handleCreate} buttonText="Create Property" />
      </div>
    </div>
  );
}
