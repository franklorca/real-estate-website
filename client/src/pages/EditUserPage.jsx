// client/src/pages/EditUserPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const EditUserPage = () => {
  const [user, setUser] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/admin/users/${id}`);
        setUser(response.data);
        setMembershipStatus(response.data.membership_status);
      } catch (error) {
        toast.error("Could not load user data.");
        navigate("/admin/users");
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/users/${id}`, {
        membership_status: membershipStatus,
      });
      toast.success("User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  if (!user) return <div className="text-center py-20">Loading user...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Edit User: {user.name}</h1>
      <p className="text-gray-600 mb-8">{user.email}</p>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-lg shadow space-y-6"
      >
        <div>
          <label
            htmlFor="membership_status"
            className="block text-sm font-medium text-gray-700"
          >
            Membership Status
          </label>
          <select
            id="membership_status"
            value={membershipStatus}
            onChange={(e) => setMembershipStatus(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>pending</option>
            <option>active</option>
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Set to 'active' to grant membership access manually.
          </p>
        </div>

        <div className="pt-5">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
