// client/src/pages/CreateAgentPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import AgentForm from "../components/AgentForm";

const CreateAgentPage = () => {
  const navigate = useNavigate();

  const handleCreateAgent = async (formData) => {
    try {
      await api.post("/api/agents", formData);
      toast.success("Agent created successfully!");
      navigate("/admin/agents");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create agent.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Add New Agent</h1>
      <div className="bg-white p-8 rounded-lg shadow">
        <AgentForm onSubmit={handleCreateAgent} buttonText="Create Agent" />
      </div>
    </div>
  );
};

export default CreateAgentPage;
