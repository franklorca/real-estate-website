import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import BlogForm from "../components/BlogForm";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/api/blogs/admin/${id}`);
        setInitialData(response.data);
      } catch (err) {
        console.error("Failed to load blog:", err);
        toast.error("Failed to load blog.");
        navigate("/admin/blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleUpdateBlog = async (formData) => {
    try {
      await api.put(`/api/blogs/${id}`, formData);
      toast.success("Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error("Failed to update blog:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to update blog.";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-brand-light">Loading blog details...</div>;
  }

  return (
    <div className="bg-brand-bg min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
        <h1 className="text-3xl font-serif text-brand-dark mb-8 border-b border-brand-divider pb-4">
          Edit Journal Entry
        </h1>
        <BlogForm
          initialData={initialData}
          onSubmit={handleUpdateBlog}
          buttonText="UPDATE POST"
        />
      </div>
    </div>
  );
};

export default EditBlogPage;
