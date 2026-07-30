// luminousheaven/src/app/admin/dashboard/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/services/api";
import { toast } from "react-toastify";

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState([]);

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
  }, []);

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
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif text-brand-dark">
          Property Management
        </h1>
        <Link href="/admin/properties/new">
          <button className="bg-brand-accent text-white px-5 py-2.5 rounded-md hover:bg-brand-dark transition-colors uppercase text-xs tracking-wider font-semibold">
            + Add New Property
          </button>
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto border border-brand-divider">
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
              <tr key={prop.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-dark">
                  {prop.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-light">
                  {prop.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-dark">
                  ${new Intl.NumberFormat().format(prop.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/properties/edit/${prop.id}`}
                    className="text-brand-accent hover:text-brand-dark font-semibold mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(prop.id)}
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
