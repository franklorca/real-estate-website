// server/inquiryRoutes.js
const express = require("express");
const { Resend } = require("resend");
const db = require("./db"); // <-- THIS WAS THE MISSING LINE
const { requireAuth } = require("./authMiddleware");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Inquiry router is working!");
});

// Initialize Resend, but check if the API key exists first
let resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.error(
    "FATAL ERROR: RESEND_API_KEY is not defined in environment variables."
  );
}

router.post("/", requireAuth, async (req, res) => {
  // Check if Resend was initialized correctly
  if (!resend) {
    return res
      .status(500)
      .json({ message: "Email service is not configured." });
  }

  const { propertyId, message } = req.body;
  const member = req.user;

  if (!propertyId || !message) {
    return res
      .status(400)
      .json({ message: "Property ID and message are required." });
  }

  try {
    // This query logic is complex, let's simplify and make it more robust.
    const property = await db("properties").where({ id: propertyId }).first();
    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    const agent = await db("agents").where({ id: property.agent_id }).first();
    if (!agent) {
      return res
        .status(404)
        .json({ message: "Agent for this property not found." });
    }

    const memberProfile = await db("users")
      .where({ id: member.userId })
      .first();
    if (!memberProfile) {
      return res.status(404).json({ message: "Member profile not found." });
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
        <p><strong>Price:</strong> $${new Intl.NumberFormat().format(
        property.price
      )}</p>
        <hr>
        <h2>Member Details</h2>
        <p><strong>Name:</strong> ${memberProfile.name}</p>
        <p><strong>Email:</strong> ${memberProfile.email}</p>
        <hr>
        <h2>Message</h2>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return res.status(500).json({ message: "Failed to send inquiry." });
    }

    res.status(200).json({ message: "Inquiry sent successfully!" });
  } catch (dbError) {
    console.error("Database error while preparing inquiry:", dbError);
    res.status(500).json({ message: "An internal error occurred." });
  }
});

module.exports = router;
