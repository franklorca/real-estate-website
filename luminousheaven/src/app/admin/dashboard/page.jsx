// luminousheaven/src/app/admin/dashboard/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/services/api";
import { toast } from "react-toastify";
import { ShieldCheck, ShieldAlert, Sparkles } from "lucide-react";

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState([]);
  const [isFeeEnabled, setIsFeeEnabled] = useState(true);
  const [isSettingLoading, setIsSettingLoading] = useState(true);
  const [isUpdatingSetting, setIsUpdatingSetting] = useState(false);

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

    const fetchSettings = async () => {
      try {
        const response = await api.get("/api/admin/settings");
        if (typeof response.data?.membership_fee_enabled === "boolean") {
          setIsFeeEnabled(response.data.membership_fee_enabled);
        }
      } catch (error) {
        console.error("Failed to fetch admin settings:", error);
      } finally {
        setIsSettingLoading(false);
      }
    };

    fetchProperties();
    fetchSettings();
  }, []);

  const handleToggleFee = async () => {
    const nextState = !isFeeEnabled;
    setIsUpdatingSetting(true);
    try {
      const response = await api.put("/api/admin/settings", {
        membership_fee_enabled: nextState,
      });

      if (response.data?.success) {
        setIsFeeEnabled(nextState);
        toast.success(
          nextState
            ? "Membership fee ENABLED: $30 fee & agent details lock active for non-members."
            : "Membership fee DISABLED: Open access mode enabled for all visitors!"
        );
      }
    } catch (error) {
      console.error("Failed to update membership fee setting:", error);
      toast.error(
        error.response?.data?.message || "Failed to update system setting."
      );
    } finally {
      setIsUpdatingSetting(false);
    }
  };

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
    <div className="max-w-7xl mx-auto py-8 space-y-8">
      {/* System Settings & Membership Gate Control Card */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-brand-divider">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-brand-accent" />
              <h2 className="text-xl font-bold font-serif text-brand-dark">
                System Membership Fee & Access Control
              </h2>
            </div>
            <p className="text-sm text-brand-light font-sans max-w-2xl">
              Control whether site visitors are required to pay the $30 membership fee to unlock agent contact details and viewings.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <span className="text-xs uppercase tracking-wider font-semibold font-sans block text-gray-500">
                Current Status
              </span>
              <span
                className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full mt-0.5 ${
                  isFeeEnabled
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                }`}
              >
                {isFeeEnabled ? (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5 mr-1" /> $30 Membership Gate ACTIVE
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Open Access (Fee OFF)
                  </>
                )}
              </span>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={handleToggleFee}
              disabled={isSettingLoading || isUpdatingSetting}
              aria-label="Toggle Membership Fee"
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 disabled:opacity-50 ${
                isFeeEnabled ? "bg-brand-accent" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                  isFeeEnabled ? "translate-x-9" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Property Management */}
      <div>
        <div className="flex justify-between items-center mb-6">
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
    </div>
  );
}
