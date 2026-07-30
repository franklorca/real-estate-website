// luminousheaven/src/app/api/agents/[id]/route.js
import db from "@/lib/db";
import { requireAdminUser } from "@/lib/api-auth";

export async function GET(request, { params }) {
  const { id } = await params;
  const agentId = parseInt(id, 10);

  if (isNaN(agentId)) {
    return Response.json({ message: "Invalid agent ID." }, { status: 400 });
  }

  try {
    const agent = await db("agents").where({ id: agentId }).first();
    if (agent) {
      return Response.json(agent);
    }
    return Response.json({ message: "Agent not found." }, { status: 404 });
  } catch (error) {
    console.error(`Error fetching agent with ID ${id}:`, error);
    return Response.json({ message: "Error fetching agent." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  const { id } = await params;
  const agentId = parseInt(id, 10);

  if (isNaN(agentId)) {
    return Response.json({ message: "Invalid agent ID." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const count = await db("agents").where({ id: agentId }).update(body);

    if (count > 0) {
      const updatedAgent = await db("agents").where({ id: agentId }).first();
      return Response.json(updatedAgent);
    }
    return Response.json({ message: "Agent not found" }, { status: 404 });
  } catch (error) {
    console.error(`Error updating agent with ID ${id}:`, error);
    return Response.json({ message: "Error updating agent." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  const { id } = await params;
  const agentId = parseInt(id, 10);

  if (isNaN(agentId)) {
    return Response.json({ message: "Invalid agent ID." }, { status: 400 });
  }

  try {
    const assignedProperties = await db("properties").where({ agent_id: agentId }).first();
    if (assignedProperties) {
      return Response.json(
        { message: "Cannot delete agent. They are still assigned to one or more properties." },
        { status: 400 }
      );
    }

    const count = await db("agents").where({ id: agentId }).del();
    if (count > 0) {
      return new Response(null, { status: 204 });
    }
    return Response.json({ message: "Agent not found" }, { status: 404 });
  } catch (error) {
    console.error(`Error deleting agent with ID ${id}:`, error);
    return Response.json({ message: "Error deleting agent." }, { status: 500 });
  }
}
