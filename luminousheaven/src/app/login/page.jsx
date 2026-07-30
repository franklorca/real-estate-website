// luminousheaven/src/app/login/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoginForm from "@/components/LoginForm";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMemberLogin = async (formData) => {
    setIsLoading(true);
    toast.dismiss();
    try {
      const res = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (res.error) {
        toast.error(res.error.message || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      toast.success("Welcome back! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err) {
      toast.error("An error occurred during login.");
      setIsLoading(false);
    }
  };

  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";

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
                Welcome Back
              </h1>
              <p
                className="mt-4 opacity-90 font-sans"
                style={{ textShadow: "0 2px 5px rgba(0,0,0,0.7)" }}
              >
                Your exclusive access awaits.
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
                Member Sign In
              </h2>
            </div>

            <LoginForm
              onSubmit={handleMemberLogin}
              buttonText={isLoading ? "Signing In..." : "Sign In"}
              isLoading={isLoading}
            />

            <p className="mt-8 text-center text-sm font-sans">
              Not a member yet?{" "}
              <Link
                href="/signup"
                className="font-medium text-brand-accent hover:underline"
              >
                Join the Club
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
