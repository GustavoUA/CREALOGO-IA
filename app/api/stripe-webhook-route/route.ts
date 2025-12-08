import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Conexión a Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!
);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  console.log("EVENTO RECIBIDO:", event.type);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      // Identificar usuario por email
      const email = session.customer_details?.email;
      if (!email) break;

      // Determinar qué plan ha comprado
      const priceId = session.metadata?.priceId;

      let creditsToAdd = 0;
      let planType = "";

      if (priceId === process.env.DAILY_PRICE_ID) {
        creditsToAdd = 20;
        planType = "daily";
      }

      if (priceId === process.env.SIX_MONTHS_PRICE_ID) {
        creditsToAdd = 500; // ejemplo: 500 créditos por 6 meses
        planType = "six_months";
      }

      console.log(`Asignando ${creditsToAdd} créditos al usuario ${email}`);

      // Buscar el usuario en Supabase
      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (!user) {
        console.error("Usuario no encontrado en Supabase");
        break;
      }

      // Actualizar créditos del usuario
      await supabase
        .from("users")
        .update({
          credits: (user.credits || 0) + creditsToAdd,
          plan: planType,
        })
        .eq("id", user.id);

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

