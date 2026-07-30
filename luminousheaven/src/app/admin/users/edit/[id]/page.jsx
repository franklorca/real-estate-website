// luminousheaven/src/app/admin/users/edit/[id]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "react-toastify";

export default function EditUserPage() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("member");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/admin/users/${id}`);
        setUser(response.data);
        setRole(response.data.role || "member");
        setStatus(response.data.membership_status || "active");
      } catch (error) {
        toast.error("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/users/${id}`, {
        role,
        membership_status: status,
      });
      toast.success("User updated successfully!");
      router.push("/admin/users");
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading user data...</div>;
  }

  if (!user) {
    return <div className="text-center py-20 text-red-500">User not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-serif text-brand-dark mb-8">
        Edit User: {user.name}
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-brand-divider">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-light mb-1">
              Email Address
            </label>
            <input
              type="text"
              disabled
              value={user.email}
              className="w-full p-2.5 bg-gray-100 border border-brand-divider rounded text-sm text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">
              Membership Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2.5 border border-brand-divider rounded text-sm focus:ring-2 focus:ring-brand-accent"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-accent text-white font-medium rounded hover:bg-brand-dark transition-colors uppercase text-xs tracking-wider"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
