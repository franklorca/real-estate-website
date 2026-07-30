// luminousheaven/src/app/admin/blogs/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/services/api";
import { toast } from "react-toastify";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        toast.error("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await api.delete(`/api/blogs/admin/${blogId}`);
        setBlogs(blogs.filter((b) => b.id !== blogId));
        toast.success("Blog deleted successfully.");
      } catch (error) {
        toast.error("Could not delete blog.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif text-brand-dark">
          Blog & Journal Management
        </h1>
        <Link href="/admin/blogs/new">
          <button className="bg-brand-accent text-white px-5 py-2.5 rounded-md hover:bg-brand-dark transition-colors uppercase text-xs tracking-wider font-semibold">
            + Create New Blog
          </button>
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto border border-brand-divider">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-dark">
                  {blog.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-light text-sm">
                  {blog.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-brand-light text-sm">
                  {blog.author || "Luminous Heaven"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/blogs/edit/${blog.id}`}
                    className="text-brand-accent hover:text-brand-dark font-semibold mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
