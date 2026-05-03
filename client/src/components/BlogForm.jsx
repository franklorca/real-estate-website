import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

const BlogForm = ({ initialData = {}, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image_url: "",
    author: "Luminous Heaven",
    published_at: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    if (initialData.id) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        excerpt: initialData.excerpt || "",
        content: initialData.content || "",
        cover_image_url: initialData.cover_image_url || "",
        author: initialData.author || "Luminous Heaven",
        published_at: initialData.published_at 
          ? new Date(initialData.published_at).toISOString().slice(0, 16)
          : new Date().toISOString().slice(0, 16),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto-generate slug from title if title is changed and slug is empty
      if (name === "title" && !prev.slug) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      return updated;
    });
  };

  const handleEditorChange = (content, editor) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, cover_image_url: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Title, slug, and content are required.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-brand-divider rounded font-sans focus:ring-brand-accent focus:border-brand-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full p-3 border border-brand-divider rounded font-sans focus:ring-brand-accent focus:border-brand-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border border-brand-divider rounded font-sans focus:ring-brand-accent focus:border-brand-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Publish Date</label>
          <input
            type="datetime-local"
            name="published_at"
            value={formData.published_at}
            onChange={handleChange}
            className="w-full p-3 border border-brand-divider rounded font-sans focus:ring-brand-accent focus:border-brand-accent outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1">Excerpt</label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-brand-divider rounded font-sans focus:ring-brand-accent focus:border-brand-accent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">Cover Image</label>
        {formData.cover_image_url ? (
          <div className="mb-4">
            <img src={formData.cover_image_url} alt="Cover" className="w-full max-w-md h-auto rounded shadow" />
            <button
              type="button"
              onClick={() => handleImageUpload("")}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <ImageUpload onUploadSuccess={handleImageUpload} />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">Content</label>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | code | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
          value={formData.content}
          onEditorChange={handleEditorChange}
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-brand-dark text-white font-sans tracking-widest text-sm rounded hover:bg-brand-accent transition-colors"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default BlogForm;
