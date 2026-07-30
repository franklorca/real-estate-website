// luminousheaven/src/app/admin/agents/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/services/api";
import { toast } from "react-toastify";

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await api.get("/api/agents");
        setAgents(response.data);
      } catch (error) {
        toast.error("Failed to load agents.");
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const handleDelete = async (agentId) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      try {
        await api.delete(`/api/agents/${agentId}`);
        setAgents(agents.filter((a) => a.id !== agentId));
        toast.success("Agent deleted successfully.");
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not delete agent.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif text-brand-dark">
          Agent Management
        </h1>
        <Link href="/admin/agents/new">
          <button className="bg-brand-accent text-white px-5 py-2.5 rounded-md hover:bg-brand-dark transition-colors uppercase text-xs tracking-wider font-semibold">
            + Add New Agent
          </button>
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto border border-brand-divider">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-dark">
                  {agent.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-light">
                  {agent.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-light">
                  {agent.phone || "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/agents/edit/${agent.id}`}
                    className="text-brand-accent hover:text-brand-dark font-semibold mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
