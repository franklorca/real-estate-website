// luminousheaven/src/app/api/blogs/admin/[id]/route.js
import db from "@/lib/db";
import { requireAdminUser } from "@/lib/api-auth";

export async function GET(request, { params }) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  const { id } = await params;

  try {
    const blog = await db("blogs").where({ id: parseInt(id, 10) }).first();
    if (blog) {
      return Response.json(blog);
    }
    return Response.json({ message: "Blog not found." }, { status: 404 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return Response.json({ message: "Error fetching blog." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  const { id } = await params;
  const blogId = parseInt(id, 10);

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, cover_image_url, author, published_at } = body;
    const updates = {
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      author,
      published_at,
      updated_at: new Date(),
    };

    const count = await db("blogs").where({ id: blogId }).update(updates);
    if (count > 0) {
      const updatedBlog = await db("blogs").where({ id: blogId }).first();
      return Response.json(updatedBlog);
    }
    return Response.json({ message: "Blog not found." }, { status: 404 });
  } catch (error) {
    console.error("Error updating blog:", error);
    if (error.code === "23505" || error.code === "SQLITE_CONSTRAINT") {
      return Response.json({ message: "A blog with this slug already exists." }, { status: 400 });
    }
    return Response.json({ message: "Error updating blog." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  const { id } = await params;
  const blogId = parseInt(id, 10);

  try {
    const count = await db("blogs").where({ id: blogId }).del();
    if (count > 0) {
      return Response.json({ message: "Blog deleted successfully." });
    }
    return Response.json({ message: "Blog not found." }, { status: 404 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return Response.json({ message: "Error deleting blog." }, { status: 500 });
  }
}
