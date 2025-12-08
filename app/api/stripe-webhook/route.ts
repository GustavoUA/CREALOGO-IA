import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      const email = session.customer_details.email;

      // Obtener créditos dependiendo del plan
      let credits = 0;

      if (session.amount_total === 2000) credits = 100;       // Daily
      if (session.amount_total === 5000) credits = 500;       // Monthly
      if (session.amount_total === 30000) credits = 4000;     // 6 months

      // Actualizamos en Supabase
      await supabase
        .from("profiles")
        .update({ credits: supabase.rpc("increment_credits", { amount: credits }) })
        .eq("email", email);

      console.log("Créditos añadidos a:", email);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
