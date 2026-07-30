// luminousheaven/src/app/api/admin/users/[id]/route.js
import db from "@/lib/db";
import { requireAdminUser } from "@/lib/api-auth";

export async function GET(request, { params }) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  const { id } = await params;

  try {
    const targetUser = await db("user")
      .where({ id: String(id) })
      .select("id", "name", "email", "role", "membership_status")
      .first();

    if (targetUser) {
      return Response.json(targetUser);
    }
    return Response.json({ message: "User not found." }, { status: 404 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json({ message: "Error fetching user." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  const { id } = await params;

  try {
    const body = await request.json();
    const { role, membership_status } = body;
    const updates = {};
    if (role !== undefined) updates.role = role;
    if (membership_status !== undefined) updates.membership_status = membership_status;

    const count = await db("user").where({ id: String(id) }).update(updates);
    if (count > 0) {
      const updatedUser = await db("user").where({ id: String(id) }).first();
      return Response.json(updatedUser);
    }
    return Response.json({ message: "User not found." }, { status: 404 });
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json({ message: "Error updating user." }, { status: 500 });
  }
}
