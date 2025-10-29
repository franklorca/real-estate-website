// client/src/pages/AdminLoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleAdminLogin = async (formData) => {
    setIsLoading(true);
    toast.dismiss();
    try {
      const response = await api.post("/api/auth/login", formData);
      loginAction(response.data.token);
      toast.success("Admin login successful!");
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during login."
      );
      setIsLoading(false);
    }
  };

  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1686100511265-9979c01f61c3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"; // A more corporate/hotel lobby image

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl p-8 sm:p-12 text-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Luminous Heaven
            </h1>
            <h2 className="mt-2 text-xl font-semibold text-gray-700">
              Administrator Portal
            </h2>
          </div>

          <LoginForm
            onSubmit={handleAdminLogin}
            buttonText={isLoading ? "Verifying..." : "Secure Login"}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
