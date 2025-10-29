// client/src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleMemberLogin = async (formData) => {
    setIsLoading(true);
    toast.dismiss();
    try {
      const response = await api.post("/api/auth/member-login", formData);
      loginAction(response.data.token);
      toast.success("Welcome back! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500); // Redirect to dashboard on login
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during login."
      );
      setIsLoading(false);
    }
  };

  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="relative w-full max-w-lg lg:max-w-4xl flex rounded-xl shadow-2xl overflow-hidden">
        {/* Left Panel (Desktop Only) */}
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
                Welcome Back
              </h1>
              <p
                className="mt-4 opacity-90"
                style={{ textShadow: "0 2px 5px rgba(0,0,0,0.7)" }}
              >
                Your exclusive access awaits.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel (Form) */}
        <div className="w-full lg:w-1/2 bg-white/70 backdrop-blur-xl p-8 sm:p-12 text-gray-800">
          <div className="w-full">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900">
                Luminous Heaven
              </h1>
              <h2 className="mt-2 text-xl font-semibold text-gray-700">
                Member Sign In
              </h2>
            </div>

            {/* We can re-integrate our LoginForm with new props for loading state */}
            <LoginForm
              onSubmit={handleMemberLogin}
              title="" // Title is now handled above
              subtitle="" // Subtitle handled above
              buttonText={isLoading ? "Signing In..." : "Sign In"}
              isLoading={isLoading} // Pass loading state to disable button
            />

            <p className="mt-8 text-center text-sm">
              Not a member yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-700 hover:text-indigo-500 hover:underline"
              >
                Join the Club
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
