// luminousheaven/src/app/blog/[slug]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import api from "@/services/api";
import SEO from "@/components/SEO";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/api/blogs/${slug}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg px-6">
        <h1 className="text-3xl font-serif text-brand-dark mb-4">
          Article Not Found
        </h1>
        <p className="text-brand-light font-sans mb-8">
          The requested journal entry could not be located.
        </p>
        <Link
          href="/blog"
          className="px-6 py-3 bg-brand-dark text-white rounded font-sans tracking-wide hover:bg-brand-accent transition-colors"
        >
          RETURN TO JOURNAL
        </Link>
      </div>
    );
  }

  const publishDate = new Date(
    blog.published_at || blog.created_at
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-brand-bg min-h-screen pt-24 pb-24 px-6 md:px-12 lg:px-24">
      <SEO
        title={blog.title}
        description={blog.excerpt || `Read ${blog.title} on Luminous Heaven.`}
        image={blog.cover_image_url}
        type="article"
      />

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <Link
          href="/blog"
          className="inline-flex items-center text-brand-light hover:text-brand-accent transition-colors font-sans text-sm tracking-wide mb-12 uppercase"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
        </Link>

        <header className="mb-12">
          <div className="flex items-center text-sm tracking-wider text-brand-light uppercase mb-6 font-sans space-x-6">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {publishDate}
            </span>
            <span className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {blog.author || "Luminous Heaven"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark leading-tight mb-8">
            {blog.title}
          </h1>

          {blog.cover_image_url && (
            <div className="w-full aspect-[21/9] bg-brand-champagne overflow-hidden mb-12 relative rounded">
              <Image
                src={blog.cover_image_url}
                alt={blog.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <div
          className="prose prose-lg md:prose-xl prose-stone max-w-none font-sans text-brand-dark/80 
                     prose-headings:font-serif prose-headings:text-brand-dark prose-headings:font-normal
                     prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-sm"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </motion.article>
    </div>
  );
}
