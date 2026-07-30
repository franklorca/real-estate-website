// luminousheaven/src/app/admin/agents/edit/[id]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "react-toastify";
import AgentForm from "@/components/AgentForm";

export default function EditAgentPage() {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;
    const fetchAgent = async () => {
      try {
        const response = await api.get(`/api/agents/${id}`);
        setAgent(response.data);
      } catch (error) {
        toast.error("Failed to load agent details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAgent();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await api.put(`/api/agents/${id}`, formData);
      toast.success("Agent updated successfully!");
      router.push("/admin/agents");
    } catch (error) {
      console.error("Failed to update agent:", error);
      toast.error(error.response?.data?.message || "Failed to update agent.");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading agent data...</div>;
  }

  if (!agent) {
    return <div className="text-center py-20 text-red-500">Agent not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-serif text-brand-dark mb-8">
        Edit Agent #{id}
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-brand-divider">
        <AgentForm initialData={agent} onSubmit={handleUpdate} buttonText="Save Changes" />
      </div>
    </div>
  );
}
