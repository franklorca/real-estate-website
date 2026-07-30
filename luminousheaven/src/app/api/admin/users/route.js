// luminousheaven/src/app/api/admin/users/route.js
import db from "@/lib/db";
import { requireAdminUser } from "@/lib/api-auth";

export async function GET(request) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  try {
    const users = await db("user")
      .select("id", "name", "email", "role", "membership_status")
      .orderBy("id");
    return Response.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ message: "Error fetching users." }, { status: 500 });
  }
}
