// client/src/pages/SignUpPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.dismiss();

    try {
      const response = await api.post("/api/users/register", formData);
      loginAction(response.data.token);
      toast.success("Account created successfully! Welcome to the club.");
      setTimeout(() => navigate("/pricing"), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during registration."
      );
      setIsLoading(false);
    }
  };

  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      {/* --- Frosted Glass Container --- */}
      <div className="relative w-full max-w-lg lg:max-w-4xl flex rounded-xl shadow-2xl overflow-hidden">
        {/* --- Left Panel (Desktop Only) --- */}
        <div
          className="hidden lg:block w-1/2 bg-cover"
          style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        >
          <div className="w-full h-full bg-black bg-opacity-25 flex items-center justify-center p-8 text-white text-center">
            <div>
              <h1
                className="text-4xl font-bold"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
              >
                Welcome to the Club
              </h1>
              <p
                className="mt-4 opacity-90"
                style={{ textShadow: "0 2px 5px rgba(0,0,0,0.7)" }}
              >
                Unlock access to the world's most exclusive properties.
              </p>
            </div>
          </div>
        </div>

        {/* --- Right Panel (Form) --- */}
        <div className="w-full lg:w-1/2 bg-white/70 backdrop-blur-xl p-8 sm:p-12 text-gray-800">
          <div className="w-full">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900">
                Luminous Heaven
              </h1>
              <h2 className="mt-2 text-xl font-semibold text-gray-700">
                Create Your Account
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Form Inputs with Improved Styling */}
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all transform hover:scale-105"
              >
                {isLoading ? "Creating..." : "Create Account & Proceed"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-700 hover:text-indigo-500 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
