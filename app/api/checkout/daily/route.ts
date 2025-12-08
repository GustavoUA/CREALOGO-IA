import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // porque tu producto DAILY ya es recurrente
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.DAILY_PRICE_ID,
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_URL}/generator`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?cancel=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe daily error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


