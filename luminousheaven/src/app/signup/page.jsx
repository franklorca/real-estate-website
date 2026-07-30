// luminousheaven/src/app/signup/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.dismiss();

    try {
      const res = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.error) {
        toast.error(res.error.message || "An error occurred during registration.");
        setIsLoading(false);
        return;
      }

      toast.success("Account created successfully! Welcome to Luminous Heaven.");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err) {
      toast.error("An error occurred during registration.");
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
      <div className="relative w-full max-w-lg lg:max-w-4xl flex rounded-xl shadow-2xl overflow-hidden">
        <div
          className="hidden lg:block w-1/2 bg-cover"
          style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        >
          <div className="w-full h-full bg-black bg-opacity-25 flex items-center justify-center p-8 text-white text-center">
            <div>
              <h1
                className="text-4xl font-bold font-serif"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
              >
                Welcome to the Club
              </h1>
              <p
                className="mt-4 opacity-90 font-sans"
                style={{ textShadow: "0 2px 5px rgba(0,0,0,0.7)" }}
              >
                Unlock access to the world's most exclusive properties.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white/80 backdrop-blur-xl p-8 sm:p-12 text-gray-800">
          <div className="w-full">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold font-serif text-brand-dark">
                Luminous Heaven
              </h1>
              <h2 className="mt-2 text-xl font-semibold font-sans text-brand-light">
                Create Your Account
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full px-4 py-3 bg-white/70 border border-brand-divider rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-accent transition text-sm"
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
                className="block w-full px-4 py-3 bg-white/70 border border-brand-divider rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-accent transition text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full px-4 py-3 bg-white/70 border border-brand-divider rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-accent transition text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-md shadow-md text-sm font-semibold text-white bg-brand-accent hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:bg-gray-400 transition-all uppercase tracking-wider"
              >
                {isLoading ? "Creating..." : "Create Account & Proceed"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm font-sans">
              Already a member?{" "}
              <Link
                href="/login"
                className="font-medium text-brand-accent hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
