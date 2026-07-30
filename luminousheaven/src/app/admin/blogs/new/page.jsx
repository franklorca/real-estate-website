// luminousheaven/src/app/admin/blogs/new/page.jsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "react-toastify";
import BlogForm from "@/components/BlogForm";

export default function CreateBlogPage() {
  const router = useRouter();

  const handleCreate = async (formData) => {
    try {
      await api.post("/api/blogs", formData);
      toast.success("Blog post created successfully!");
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Failed to create blog:", error);
      toast.error(error.response?.data?.message || "Failed to create blog post.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-serif text-brand-dark mb-8">
        Create New Blog Article
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-brand-divider">
        <BlogForm onSubmit={handleCreate} buttonText="Publish Article" />
      </div>
    </div>
  );
}
