// luminousheaven/src/app/api/users/me/saved-properties/route.js
import { requireAuthUser } from "@/lib/api-auth";
import db from "@/lib/db";

export async function GET(request) {
  const { user, response } = await requireAuthUser(request);
  if (response) return response;

  try {
    const numericUserId = parseInt(user.id, 10) || user.id;

    const saved = await db("saved_properties")
      .join("properties", "saved_properties.property_id", "=", "properties.id")
      .where("saved_properties.user_id", numericUserId)
      .select("properties.*");

    return Response.json(saved);
  } catch (error) {
    console.error("Error fetching saved properties:", error);
    return Response.json({ message: "Error fetching saved properties" }, { status: 500 });
  }
}

export async function POST(request) {
  const { user, response } = await requireAuthUser(request);
  if (response) return response;

  try {
    const body = await request.json();
    const { property_id } = body;

    if (!property_id) {
      return Response.json({ message: "property_id is required" }, { status: 400 });
    }

    const numericUserId = parseInt(user.id, 10) || user.id;

    await db("saved_properties").insert({
      user_id: numericUserId,
      property_id: parseInt(property_id, 10),
    });

    return Response.json({ message: "Property saved successfully" }, { status: 201 });
  } catch (error) {
    if (error.code === "23505" || error.code === "SQLITE_CONSTRAINT") {
      return Response.json({ message: "Property already saved" }, { status: 409 });
    }
    console.error("Error saving property:", error);
    return Response.json({ message: "Error saving property" }, { status: 500 });
  }
}
