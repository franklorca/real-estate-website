// luminousheaven/src/app/api/blogs/[slug]/route.js
import db from "@/lib/db";

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const blog = await db("blogs").where({ slug }).first();
    if (blog) {
      return Response.json(blog);
    }
    return Response.json({ message: "Blog not found." }, { status: 404 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return Response.json({ message: "Error fetching blog." }, { status: 500 });
  }
}
