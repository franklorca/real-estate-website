// luminousheaven/src/app/api/stripe/create-checkout-session/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requireAuthUser } from "@/lib/api-auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { user, response } = await requireAuthUser(req);
    if (response) return response;

    const { propertyIdentifier } = await req.json().catch(() => ({}));

    const origin =
      req.headers.get("origin") ||
      req.headers.get("referer")?.replace(/\/$/, "") ||
      "https://www.luminous-heaven.com";

    const returnPath = propertyIdentifier
      ? `/properties/${propertyIdentifier}`
      : "/dashboard";

    const successUrl = `${origin}${returnPath}?success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}${returnPath}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Luminous Heaven Exclusive Membership",
              description:
                "Full access to agent contact details, private viewings, and off-market luxury property dossiers.",
            },
            unit_amount: 3000, // $30.00 USD
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user.email,
      client_reference_id: user.id.toString(),
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: user.id.toString(),
        userEmail: user.email,
        propertyIdentifier: propertyIdentifier || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Create Checkout Session Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create Stripe checkout session." },
      { status: 500 }
    );
  }
}
