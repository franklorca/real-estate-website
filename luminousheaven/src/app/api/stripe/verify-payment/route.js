// luminousheaven/src/app/api/stripe/verify-payment/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@/lib/db";
import { requireAuthUser } from "@/lib/api-auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { user, response } = await requireAuthUser(req);
    if (response) return response;

    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID is required." },
        { status: 400 }
      );
    }

    // Retrieve session directly from Stripe using Secret Key
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json(
        { message: "Invalid session ID." },
        { status: 404 }
      );
    }

    if (session.payment_status === "paid") {
      const email = user.email;

      // Transactionally update membership_status to 'active' in both tables
      await db.transaction(async (trx) => {
        // 1. Update Better-Auth 'user' table
        await trx("user")
          .where({ email: email })
          .update({ membership_status: "active" });

        // 2. Update legacy 'users' table
        await trx("users")
          .where({ email: email })
          .update({ membership_status: "active" });
      });

      return NextResponse.json({
        success: true,
        membership_status: "active",
        message: "Payment verified successfully. Membership is active!",
      });
    } else {
      return NextResponse.json({
        success: false,
        payment_status: session.payment_status,
        message: "Payment is pending or incomplete.",
      });
    }
  } catch (error) {
    console.error("Stripe Verify Payment Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to verify payment status." },
      { status: 500 }
    );
  }
}
