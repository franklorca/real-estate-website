import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      toast.error("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Blog deleted successfully.");
        fetchBlogs();
      } catch (error) {
        toast.error("Failed to delete blog.");
      }
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-brand-dark">Manage Blogs</h1>
        <Link
          to="/admin/blogs/new"
          className="flex items-center px-4 py-2 bg-brand-dark text-white rounded font-sans text-sm tracking-wide hover:bg-brand-accent transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" /> NEW POST
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-brand-light py-10">Loading blogs...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-divider text-brand-light text-sm tracking-wide uppercase font-sans">
                <th className="py-3 px-4 font-normal">Title</th>
                <th className="py-3 px-4 font-normal">Author</th>
                <th className="py-3 px-4 font-normal">Published</th>
                <th className="py-3 px-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-brand-light">
                    No blogs found. Create one to get started.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-brand-divider/50 hover:bg-brand-bg/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-serif text-lg text-brand-dark">{blog.title}</div>
                      <div className="text-sm text-brand-light font-sans">{blog.slug}</div>
                    </td>
                    <td className="py-4 px-4 font-sans text-brand-dark">{blog.author}</td>
                    <td className="py-4 px-4 font-sans text-brand-dark">
                      {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end space-x-3">
                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="text-brand-light hover:text-brand-accent transition-colors p-2"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-brand-light hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBlogsPage;
