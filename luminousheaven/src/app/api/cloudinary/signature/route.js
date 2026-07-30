// luminousheaven/src/app/api/cloudinary/signature/route.js
import { cloudinary } from "cloudinary";
import { requireAdminUser } from "@/lib/api-auth";

const cloudinaryV2 = require("cloudinary").v2;

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request) {
  const { user, response } = await requireAdminUser(request);
  if (response) return response;

  const origin = request.headers.get("origin") || request.headers.get("referer") || "";
  const host = request.headers.get("host") || "";

  // Basic Origin validation if origin header is passed
  if (origin && !origin.includes(host) && !origin.includes("localhost") && !origin.includes("127.0.0.1")) {
    return Response.json({ error: "Invalid Origin" }, { status: 403 });
  }

  const timestamp = Math.round(new Date().getTime() / 1000);

  try {
    const signature = cloudinaryV2.utils.api_sign_request(
      { timestamp: timestamp },
      process.env.CLOUDINARY_API_SECRET
    );
    return Response.json({ signature, timestamp });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return Response.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
