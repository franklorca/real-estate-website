// luminousheaven/src/app/admin/login/page.jsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoginForm from "@/components/LoginForm";
import { signIn } from "@/lib/auth-client";

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAdminLogin = async (formData) => {
    setIsLoading(true);
    toast.dismiss();
    try {
      const res = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (res.error) {
        toast.error(res.error.message || "Invalid credentials.");
        setIsLoading(false);
        return;
      }

      toast.success("Admin login successful!");
      setTimeout(() => router.push("/admin/dashboard"), 1000);
    } catch (err) {
      toast.error("An error occurred during admin login.");
      setIsLoading(false);
    }
  };

  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1686100511265-9979c01f61c3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl p-8 sm:p-12 text-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-serif text-brand-dark">
              Luminous Heaven
            </h1>
            <h2 className="mt-2 text-xl font-semibold font-sans text-brand-light">
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
}
