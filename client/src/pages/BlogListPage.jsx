import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import SEO from "../components/SEO";
import { ArrowRight, Calendar } from "lucide-react";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-brand-bg min-h-screen pt-24 pb-16 px-6 md:px-12 lg:px-24">
      <SEO 
        title="Journal"
        description="Editorial insights, market trends, and luxury real estate news from Luminous Heaven."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-16 border-b border-brand-divider pb-8">
          <h1 className="text-4xl md:text-6xl font-serif text-brand-dark mb-4">
            The Journal
          </h1>
          <p className="text-brand-light font-sans text-lg md:text-xl max-w-2xl">
            Curated insights on luxury living, architectural geometry, and real estate market trends.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <Link to={`/blog/${blog.slug}`} className="flex flex-col h-full">
                <div className="overflow-hidden aspect-[4/3] mb-6 relative bg-brand-champagne">
                  {blog.cover_image_url ? (
                    <img
                      src={blog.cover_image_url}
                      alt={blog.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-accent/50 font-serif text-2xl">
                      LH
                    </div>
                  )}
                </div>
                
                <div className="flex-grow flex flex-col">
                  <div className="flex items-center text-xs tracking-wider text-brand-light uppercase mb-3 font-sans">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <h2 className="text-2xl font-serif text-brand-dark mb-4 leading-tight group-hover:text-brand-accent transition-colors duration-300">
                    {blog.title}
                  </h2>
                  
                  <p className="text-brand-light font-sans line-clamp-3 mb-6">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center text-brand-accent font-sans font-medium text-sm tracking-wide group-hover:tracking-wider transition-all duration-300">
                    READ ARTICLE <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        
        {blogs.length === 0 && (
          <div className="text-center py-24 text-brand-light font-serif text-xl">
            No articles published yet. Check back soon.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BlogListPage;
