// luminousheaven/src/app/admin/blogs/edit/[id]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "react-toastify";
import BlogForm from "@/components/BlogForm";

export default function EditBlogPage() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/api/blogs/admin/${id}`);
        setBlog(response.data);
      } catch (error) {
        toast.error("Failed to load blog data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await api.put(`/api/blogs/admin/${id}`, formData);
      toast.success("Blog updated successfully!");
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast.error(error.response?.data?.message || "Failed to update blog.");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading blog data...</div>;
  }

  if (!blog) {
    return <div className="text-center py-20 text-red-500">Blog not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold font-serif text-brand-dark mb-8">
        Edit Blog Article #{id}
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-brand-divider">
        <BlogForm initialData={blog} onSubmit={handleUpdate} buttonText="Save Changes" />
      </div>
    </div>
  );
}
