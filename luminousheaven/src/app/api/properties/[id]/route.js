// luminousheaven/src/app/api/properties/[id]/route.js
import db from "@/lib/db";
import { requireAdminUser } from "@/lib/api-auth";

export async function GET(request, { params }) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);

  if (isNaN(propertyId)) {
    return Response.json({ message: "Invalid property ID." }, { status: 400 });
  }

  try {
    const property = await db("properties").where({ id: propertyId }).first();
    if (property) {
      return Response.json(property);
    }
    return Response.json({ message: "Property not found" }, { status: 404 });
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    return Response.json({ message: "Error fetching property" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  const { id } = await params;
  const propertyId = parseInt(id, 10);

  if (isNaN(propertyId)) {
    return Response.json({ message: "Invalid property ID." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const count = await db("properties").where({ id: propertyId }).update(body);

    if (count > 0) {
      const updatedProperty = await db("properties").where({ id: propertyId }).first();
      return Response.json(updatedProperty);
    }
    return Response.json({ message: "Property not found" }, { status: 404 });
  } catch (error) {
    console.error(`Error updating property with ID ${id}:`, error);
    return Response.json({ message: "Error updating property" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  const { id } = await params;
  const propertyId = parseInt(id, 10);

  if (isNaN(propertyId)) {
    return Response.json({ message: "Invalid property ID." }, { status: 400 });
  }

  try {
    const count = await db("properties").where({ id: propertyId }).del();
    if (count > 0) {
      return new Response(null, { status: 204 });
    }
    return Response.json({ message: "Property not found" }, { status: 404 });
  } catch (error) {
    console.error(`Error deleting property with ID ${id}:`, error);
    return Response.json({ message: "Error deleting property" }, { status: 500 });
  }
}
