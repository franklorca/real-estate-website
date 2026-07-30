// luminousheaven/src/app/api/inquiries/route.js
import db from "@/lib/db";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { getAuthSession } from "@/lib/api-auth";

let resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const { isLimited } = rateLimit({ ip, windowMs: 60000, maxRequests: 5 });

  if (isLimited) {
    return Response.json(
      { message: "Too many inquiry attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  if (!resend) {
    return Response.json({ message: "Email service is not configured." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { propertyId, message, guestName, guestEmail } = body;

    if (!propertyId || !message) {
      return Response.json({ message: "Property ID and message are required." }, { status: 400 });
    }

    let senderName = guestName;
    let senderEmail = guestEmail;

    const authUser = await getAuthSession(request);
    if (authUser) {
      senderName = authUser.name;
      senderEmail = authUser.email;
    }

    if (!senderName || !senderEmail) {
      return Response.json({ message: "Sender name and email are required." }, { status: 400 });
    }

    const property = await db("properties").where({ id: parseInt(propertyId, 10) }).first();
    if (!property) {
      return Response.json({ message: "Property not found." }, { status: 404 });
    }

    const agent = await db("agents").where({ id: property.agent_id }).first();
    if (!agent) {
      return Response.json({ message: "Agent for this property not found." }, { status: 404 });
    }

    const { data, error } = await resend.emails.send({
      from: "Luminous Heaven Club <inquiries@luminous-heaven.com>",
      to: [agent.email],
      subject: `New Inquiry for ${property.title}`,
      html: `
        <h1>New Property Inquiry</h1>
        <p>A member of the Luminous Heaven club has sent an inquiry regarding one of your listings.</p>
        <hr>
        <h2>Property Details</h2>
        <p><strong>Property:</strong> ${property.title}</p>
        <p><strong>Location:</strong> ${property.city}</p>
        <p><strong>Price:</strong> $${new Intl.NumberFormat().format(property.price)}</p>
        <hr>
        <h2>Sender Details</h2>
        <p><strong>Name:</strong> ${senderName}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <hr>
        <h2>Message</h2>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend send error:", error);
      return Response.json({ message: "Failed to send inquiry." }, { status: 500 });
    }

    return Response.json({ message: "Inquiry sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return Response.json({ message: "An internal error occurred." }, { status: 500 });
  }
}
