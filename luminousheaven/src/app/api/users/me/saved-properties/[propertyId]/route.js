// luminousheaven/src/app/api/users/me/saved-properties/[propertyId]/route.js
import { requireAuthUser } from "@/lib/api-auth";
import db from "@/lib/db";

export async function DELETE(request, { params }) {
  const { user, response } = await requireAuthUser(request);
  if (response) return response;

  const { propertyId } = await params;
  const numericUserId = parseInt(user.id, 10) || user.id;

  try {
    const count = await db("saved_properties")
      .where({
        user_id: numericUserId,
        property_id: parseInt(propertyId, 10),
      })
      .del();

    if (count > 0) {
      return new Response(null, { status: 204 });
    }
    return Response.json({ message: "Saved property not found" }, { status: 404 });
  } catch (error) {
    console.error("Error unsaving property:", error);
    return Response.json({ message: "Error unsaving property" }, { status: 500 });
  }
}
