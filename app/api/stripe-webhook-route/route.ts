import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });

    const signature = req.headers.get("stripe-signature")!;
    const secret = process.env.STRIPE_WEBHOOK_SECRET!;

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return new NextResponse("Webhook Error", { status: 400 });
  }
}


