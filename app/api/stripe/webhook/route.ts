import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event);
      break;

    case "customer.subscription.updated":
    case "customer.subscription.created":
      await handleSubscriptionUpdated(event);
      break;

    case "customer.subscription.deleted":
      await handleSubscriptionCancelled(event);
      break;
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  const user_id = session.metadata?.user_id;
  if (!user_id) return;

  await supabase.from("subscriptions").upsert({
    user_id,
    status: "active",
    plan: session.metadata?.plan ?? "unknown",
    stripe_subscription_id: session.subscription,
  });
}

async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;

  const userId = await getUserIdFromStripeCustomer(customerId);
  if (!userId) return;

  const status = subscription.status === "active" ? "active" : "expired";

  await supabase
    .from("subscriptions")
    .update({
      status,
      plan: subscription.items.data[0]?.price.id ?? "unknown",
    })
    .eq("user_id", userId);
}

async function handleSubscriptionCancelled(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;

  const userId = await getUserIdFromStripeCustomer(customerId);
  if (!userId) return;

  await supabase
    .from("subscriptions")
    .update({ status: "expired" })
    .eq("user_id", userId);
}

async function getUserIdFromStripeCustomer(customerId: string) {
  const { data } = await supabase
    .from("subscriptions")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  return data?.user_id ?? null;
}
