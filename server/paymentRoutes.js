// server/paymentRoutes.js
const express = require("express");
const Stripe = require("stripe");
const { requireAuth } = require("./authMiddleware");
const db = require("./db");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// --- 1. CREATE CHECKOUT SESSION ---
router.post("/create-checkout-session", requireAuth, async (req, res) => {
  const { user } = req;
  const clientUrl = process.env.CLIENT_URL;

  // Safety check: Prevent already active members from paying again
  const memberProfile = await db("users").where({ id: user.userId }).first();
  if (memberProfile && memberProfile.membership_status === "active") {
    return res.status(400).json({ error: "User is already an active member." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Luminous Heaven Club Membership (Promotional)",
              description: "One-time fee for lifetime access.",
            },
            unit_amount: 3000, // The price you are charging: $30.00 in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.userId,
      },
      success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/pricing`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: "Failed to create payment session." });
  }
});

// --- 2. STRIPE WEBHOOK ---
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;

      console.log(`✅ Payment successful for user ID: ${userId}.`);

      try {
        const count = await db("users")
          .where({ id: userId })
          .update({ membership_status: "active" });

        if (count > 0) {
          console.log(
            `✅ User ${userId} membership status updated to 'active'.`
          );
        } else {
          console.error(
            `🚨 User with ID ${userId} not found for webhook fulfillment.`
          );
        }
      } catch (dbError) {
        console.error(`🚨 DB Error during webhook fulfillment:`, dbError);
        return res.status(500).send("Database update failed.");
      }
    }

    res.status(200).json({ received: true });
  }
);

router.post("/verify-payment", requireAuth, async (req, res) => {
  const { sessionId } = req.body;
  const { user } = req; // Logged-in user from token

  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is required." });
  }

  try {
    // 1. Ask Stripe for the details of the completed session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 2. Security Check: Verify the payment was successful AND it belongs to the logged-in user
    // We compare the userId from our JWT with the userId we stored in Stripe's metadata.
    if (
      session.payment_status === "paid" &&
      session.metadata.userId === String(user.userId)
    ) {
      // 3. FULFILLMENT: Update the user's status in the database
      const count = await db("users")
        .where({ id: user.userId })
        .update({ membership_status: "active" });

      if (count > 0) {
        console.log(`✅ Membership activated for user ${user.userId}`);
        // Send back a success response
        return res
          .status(200)
          .json({ message: "Membership activated successfully." });
      } else {
        console.error(`🚨 User ${user.userId} not found during verification.`);
        return res.status(404).json({ error: "User not found." });
      }
    } else {
      // This happens if the payment wasn't successful or if a user is trying to use someone else's session ID
      console.warn(
        `⚠️ Verification failed for user ${user.userId} and session ${sessionId}.`
      );
      return res.status(400).json({ error: "Payment verification failed." });
    }
  } catch (error) {
    console.error("Stripe verification error:", error.message);
    res.status(500).json({ error: "Failed to verify payment." });
  }
});

module.exports = router;
