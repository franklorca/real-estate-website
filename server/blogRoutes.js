const express = require("express");
const db = require("./db");
const { requireAdmin } = require("./authMiddleware");

const router = express.Router();

// === GET ALL PUBLISHED BLOGS (PUBLIC) ===
router.get("/", async (req, res) => {
  try {
    const blogs = await db("blogs")
      .select("id", "title", "slug", "excerpt", "cover_image_url", "author", "published_at", "created_at")
      .orderBy("created_at", "desc");
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs." });
  }
});

// === GET SINGLE BLOG BY SLUG (PUBLIC) ===
router.get("/:slug", async (req, res) => {
  try {
    const blog = await db("blogs")
      .where({ slug: req.params.slug })
      .first();
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Blog not found." });
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Error fetching blog." });
  }
});

// === GET SINGLE BLOG BY ID (ADMIN ONLY - FOR EDITING) ===
router.get("/admin/:id", requireAdmin, async (req, res) => {
  try {
    const blog = await db("blogs")
      .where({ id: req.params.id })
      .first();
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Blog not found." });
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Error fetching blog." });
  }
});

// === CREATE A NEW BLOG (ADMIN ONLY) ===
router.post("/", requireAdmin, async (req, res) => {
  const { title, slug, excerpt, content, cover_image_url, author, published_at } = req.body;
  
  if (!title || !slug || !content) {
    return res.status(400).json({ message: "Title, slug, and content are required." });
  }

  try {
    const [newId] = await db("blogs").insert({
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      author: author || "Luminous Heaven",
      published_at,
      created_at: new Date(),
      updated_at: new Date()
    }).returning("id");

    const newBlog = await db("blogs").where({ id: newId.id || newId }).first();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    if (error.code === '23505' || error.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ message: "A blog with this slug already exists." });
    }
    res.status(500).json({ message: "Error creating blog." });
  }
});

// === UPDATE A BLOG (ADMIN ONLY) ===
router.put("/:id", requireAdmin, async (req, res) => {
  const { title, slug, excerpt, content, cover_image_url, author, published_at } = req.body;
  const updates = { 
    title, 
    slug, 
    excerpt, 
    content, 
    cover_image_url, 
    author, 
    published_at,
    updated_at: new Date()
  };

  try {
    const count = await db("blogs").where({ id: req.params.id }).update(updates);
    if (count > 0) {
      const updatedBlog = await db("blogs").where({ id: req.params.id }).first();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: "Blog not found." });
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    if (error.code === '23505' || error.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ message: "A blog with this slug already exists." });
    }
    res.status(500).json({ message: "Error updating blog." });
  }
});

// === DELETE A BLOG (ADMIN ONLY) ===
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const count = await db("blogs").where({ id: req.params.id }).del();
    if (count > 0) {
      res.json({ message: "Blog deleted successfully." });
    } else {
      res.status(404).json({ message: "Blog not found." });
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog." });
  }
});

module.exports = router;
