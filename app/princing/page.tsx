'use client';

import { useRouter } from "next/navigation";

export default function Pricing() {
  const router = useRouter();

  async function subscribe(priceId: string) {
    const userId = "USER-ID-REAL-DE-SUPABASE";

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, userId }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div className="text-white max-w-xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6">Planes Premium</h1>

      <div className="card p-6 mb-4">
        <h2 className="text-xl font-semibold">Acceso Diario</h2>
        <p>20€ / día</p>
        <button
          onClick={() => subscribe(process.env.NEXT_PUBLIC_DAILY_PRICE_ID!)}
          className="btn-primary mt-4"
        >
          Suscribirme
        </button>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold">Plan 6 Meses</h2>
        <p>50€ / mes</p>
        <button
          onClick={() => subscribe(process.env.NEXT_PUBLIC_SIX_MONTHS_PRICE_ID!)}
          className="btn-primary mt-4"
        >
          Suscribirme
        </button>
      </div>
    </div>
  );
}
