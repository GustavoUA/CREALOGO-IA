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

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* DAILY PLAN */}
          <div className="p-8 bg-[#111827] rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-4">Plan Diario</h3>
            <p className="text-gray-300 mb-6">Acceso por 24 horas</p>
            <p className="text-4xl font-bold mb-6">20€</p>

            <button
              onClick={() => checkout("daily")}
              className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
            >
              {loadingPlan === "daily" ? "Procesando..." : "Comprar"}
            </button>
          </div>

          {/* MONTHLY PLAN */}
          <div className="p-8 bg-[#111827] rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-4">Plan Mensual</h3>
            <p className="text-gray-300 mb-6">Acceso por 30 días</p>
            <p className="text-4xl font-bold mb-6">40€</p>

            <button
              onClick={() => checkout("monthly")}
              className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
            >
              {loadingPlan === "monthly" ? "Procesando..." : "Comprar"}
            </button>
          </div>

          {/* SIX MONTHS PLAN */}
          <div className="p-8 bg-[#111827] rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-4">Plan Semestral</h3>
            <p className="text-gray-300 mb-6">Acceso durante 6 meses</p>
            <p className="text-4xl font-bold mb-6">50€ / mes</p>

            <button
              onClick={() => checkout("six-months")}
              className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
            >
              {loadingPlan === "six-months" ? "Procesando..." : "Comprar"}
            </button>
          </div>

    </div>
  );
}
