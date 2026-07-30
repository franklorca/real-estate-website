// luminousheaven/src/app/api/users/me/route.js
import { requireAuthUser } from "@/lib/api-auth";
import db from "@/lib/db";

export async function GET(request) {
  const { user, response } = await requireAuthUser(request);
  if (response) return response;

  try {
    const userProfile = await db("user")
      .where({ id: String(user.id) })
      .orWhere({ email: user.email })
      .select("id", "name", "email", "role", "membership_status")
      .first();

    if (userProfile) {
      return Response.json(userProfile);
    }
    return Response.json({ message: "User profile not found." }, { status: 404 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return Response.json({ message: "Error fetching user profile." }, { status: 500 });
  }
}
