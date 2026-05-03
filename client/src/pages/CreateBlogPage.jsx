import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import BlogForm from "../components/BlogForm";

const CreateBlogPage = () => {
  const navigate = useNavigate();

  const handleCreateBlog = async (formData) => {
    try {
      await api.post("/api/blogs", formData);
      toast.success("Blog published successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error("Failed to publish blog:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to publish blog.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
        <h1 className="text-3xl font-serif text-brand-dark mb-8 border-b border-brand-divider pb-4">
          Create New Journal Entry
        </h1>
        <BlogForm onSubmit={handleCreateBlog} buttonText="PUBLISH POST" />
      </div>
    </div>
  );
};

export default CreateBlogPage;
