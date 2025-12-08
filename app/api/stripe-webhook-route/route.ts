import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ message: "Stripe webhook active" });
}

export async function POST(req) {
  try {
    const body = await req.text();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });

    const signature = req.headers.get("stripe-signature")!;
    const secret = process.env.STRIPE_WEBHOOK_SECRET!;

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    console.log("🔔 Webhook recibido:", event.type);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Error verificando el webhook:", err.message);
    return new NextResponse("Webhook Error", { status: 400 });
  }
}

