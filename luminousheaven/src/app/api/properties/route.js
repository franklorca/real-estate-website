// luminousheaven/src/app/api/properties/route.js
import db from "@/lib/db";
import { requireAdminUser } from "@/lib/api-auth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const listing_type = searchParams.get("listing_type");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const bedrooms = searchParams.get("bedrooms");

  try {
    let query = db("properties").select("*");

    if (city) {
      query = query.where("city", "ilike", `%${city}%`);
    }
    if (listing_type) {
      query = query.where("listing_type", listing_type);
    }
    if (minPrice) {
      query = query.where("price", ">=", parseFloat(minPrice));
    }
    if (maxPrice) {
      query = query.where("price", "<=", parseFloat(maxPrice));
    }
    if (bedrooms) {
      query = query.where("bedrooms", ">=", parseInt(bedrooms, 10));
    }

    const properties = await query.orderBy("id");
    return Response.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return Response.json({ message: "Error fetching properties" }, { status: 500 });
  }
}

export async function POST(request) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  try {
    const body = await request.json();
    const [newProperty] = await db("properties").insert(body).returning("*");
    return Response.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return Response.json({ message: "Error creating property" }, { status: 500 });
  }
}
