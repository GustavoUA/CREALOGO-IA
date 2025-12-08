'use client';

import Link from "next/link";

export default function PricingTable() {
  const plans = [
    {
      title: "Acceso 24h",
      price: "20€",
      description: "Acceso completo por 24 horas. Genera todos los logos que quieras.",
      priceId: process.env.NEXT_PUBLIC_DAILY_PRICE_ID
    },
    {
      title: "Suscripción 6 meses",
      price: "50€/mes",
      description: "Acceso ilimitado durante 6 meses. Ideal para empresas o diseñadores.",
      priceId: process.env.NEXT_PUBLIC_SIX_MONTHS_PRICE_ID
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {plans.map((plan, i) => (
        <div key={i} className="card p-8 text-center border border-white/10 rounded-lg bg-[#131A2A]">
          
          <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
          <p className="text-4xl font-extrabold mb-4">{plan.price}</p>
          <p className="opacity-70 mb-8">{plan.description}</p>

          <Link
            href={`/api/create-checkout-session?priceId=${plan.priceId}`}
            className="px-6 py-3 bg-primary rounded-lg text-lg font-semibold hover:opacity-90"
          >
            Suscribirse
          </Link>
        </div>
      ))}
    </div>
  );
}

