import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature error:", err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ----------------------------
  //  EVENTOS QUE MANEJAMOS
  // ----------------------------
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;

      const userEmail = session.customer_details.email;
      const priceId = session.line_items?.[0]?.price?.id;

      // Obtener el usuario de Supabase por email
      const { data: user } = await supabase
        .from("users")
        .select("id")
        .eq("email", userEmail)
        .single();

      if (!user) {
        console.warn("Usuario no encontrado:", userEmail);
        break;
      }

      // Créditos según producto comprado
      let creditsToAdd = 0;

      if (priceId === process.env.DAILY_PRICE_ID) creditsToAdd = 50;
      if (priceId === process.env.MONTHLY_PRICE_ID) creditsToAdd = 300;
      if (priceId === process.env.SIX_MONTHS_PRICE_ID) creditsToAdd = 2000;

      await supabase.rpc("add_credits", {
        user_id: user.id,
        credits: creditsToAdd,
      });

      break;
    }

    case "invoice.paid": {
      // Renovación automática de suscripción
      const invoice = event.data.object as any;
      const customer = await stripe.customers.retrieve(invoice.customer);
      const userEmail = (customer as any).email;

      const { data: user } = await supabase
        .from("users")
        .select("id")
        .eq("email", userEmail)
        .single();

      if (user) {
        await supabase.rpc("add_credits", {
          user_id: user.id,
          credits: 300, // créditos mensuales
        });
      }

      break;
    }
  }

  return NextResponse.json({ received: true });
}
