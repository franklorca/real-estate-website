// client/src/pages/AdminDashboard.jsx

// Change the first line to this:
import React, { useState, useEffect } from "react";

import api from "../services/api"; // Changed from axios
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]); // This line will now work
  const { token } = useAuth();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/api/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties", error);
        toast.error("Failed to load properties.");
      }
    };
    fetchProperties();
  }, []); // useEffect dependency array is correct

  const handleDelete = async (propertyId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this property? This action cannot be undone."
      )
    ) {
      try {
        await api.delete(`/api/properties/${propertyId}`);
        setProperties(properties.filter((p) => p.id !== propertyId));
        toast.success("Property deleted successfully.");
      } catch (error) {
        console.error("Failed to delete property", error);
        toast.error("Could not delete property.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/properties/new">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            + Add New Property
          </button>
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((prop) => (
              <tr key={prop.id}>
                <td className="px-6 py-4 whitespace-nowrap">{prop.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prop.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${new Intl.NumberFormat().format(prop.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/admin/properties/edit/${prop.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(prop.id)}
                    className="text-red-600 hover:text-red-900 ml-4"
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
};

export default AdminDashboard;
