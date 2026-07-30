// luminousheaven/src/app/api/blogs/route.js
import db from "@/lib/db";
import { requireAdminUser } from "@/lib/api-auth";

export async function GET() {
  try {
    const blogs = await db("blogs")
      .select("id", "title", "slug", "excerpt", "cover_image_url", "author", "published_at", "created_at")
      .orderBy("created_at", "desc");
    return Response.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return Response.json({ message: "Error fetching blogs." }, { status: 500 });
  }
}

export async function POST(request) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, cover_image_url, author, published_at } = body;

    if (!title || !slug || !content) {
      return Response.json({ message: "Title, slug, and content are required." }, { status: 400 });
    }

    const [newId] = await db("blogs")
      .insert({
        title,
        slug,
        excerpt,
        content,
        cover_image_url,
        author: author || "Luminous Heaven",
        published_at,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning("id");

    const newBlog = await db("blogs").where({ id: newId.id || newId }).first();
    return Response.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    if (error.code === "23505" || error.code === "SQLITE_CONSTRAINT") {
      return Response.json({ message: "A blog with this slug already exists." }, { status: 400 });
    }
    return Response.json({ message: "Error creating blog." }, { status: 500 });
  }
}
