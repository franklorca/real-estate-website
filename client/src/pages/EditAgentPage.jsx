// client/src/pages/EditAgentPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import AgentForm from "../components/AgentForm";

const EditAgentPage = () => {
  const [agent, setAgent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await api.get(`/api/agents/${id}`);
        setAgent(response.data);
      } catch (error) {
        toast.error("Could not load agent data.");
        navigate("/admin/agents");
      }
    };
    fetchAgent();
  }, [id, navigate]);

  const handleUpdateAgent = async (formData) => {
    try {
      await api.put(`/api/agents/${id}`, formData);
      toast.success("Agent updated successfully!");
      navigate("/admin/agents");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update agent.");
    }
  };

  if (!agent) {
    return <div className="text-center py-20">Loading agent...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Edit Agent</h1>
      <div className="bg-white p-8 rounded-lg shadow">
        <AgentForm
          initialData={agent}
          onSubmit={handleUpdateAgent}
          buttonText="Update Agent"
        />
      </div>
    </div>
  );
};

export default EditAgentPage;
