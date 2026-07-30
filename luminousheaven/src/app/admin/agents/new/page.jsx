// luminousheaven/src/app/admin/agents/new/page.jsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "react-toastify";
import AgentForm from "@/components/AgentForm";

export default function CreateAgentPage() {
  const router = useRouter();

  const handleCreate = async (formData) => {
    try {
      await api.post("/api/agents", formData);
      toast.success("Agent created successfully!");
      router.push("/admin/agents");
    } catch (error) {
      console.error("Failed to create agent:", error);
      toast.error(error.response?.data?.message || "Failed to create agent.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-serif text-brand-dark mb-8">
        Add New Agent
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-brand-divider">
        <AgentForm onSubmit={handleCreate} buttonText="Create Agent" />
      </div>
    </div>
  );
}
