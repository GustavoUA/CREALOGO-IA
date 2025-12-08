import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_URL;

    if (!siteUrl) {
      throw new Error("NEXT_PUBLIC_URL is missing in environment variables.");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.MONTHLY_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/dashboard?sub=active`,
      cancel_url: `${siteUrl}/dashboard?sub=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

