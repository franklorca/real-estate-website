// luminousheaven/src/app/api/agents/route.js
import db from "@/lib/db";
import { requireAdminUser } from "@/lib/api-auth";

export async function GET() {
  try {
    const agents = await db("agents").select("*").orderBy("id");
    return Response.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return Response.json({ message: "Error fetching agents" }, { status: 500 });
  }
}

export async function POST(request) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  try {
    const body = await request.json();
    const [newAgent] = await db("agents").insert(body).returning("*");
    return Response.json(newAgent, { status: 201 });
  } catch (error) {
    console.error("Error creating agent:", error);
    return Response.json({ message: "Error creating agent." }, { status: 500 });
  }
}
