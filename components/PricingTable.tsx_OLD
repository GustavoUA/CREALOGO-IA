'use client';

export default function PricingTable() {
  const plans = [
    {
      title: "Acceso 24 horas",
      price: "20€",
      description: "Acceso completo durante 24h. Perfecto para proyectos rápidos.",
      priceId: process.env.NEXT_PUBLIC_DAILY_PRICE_ID
    },
    {
      title: "Suscripción 6 meses",
      price: "50€/mes",
      description: "Ideal para diseñadores o empresas con necesidades continuas.",
      priceId: process.env.NEXT_PUBLIC_SIX_MONTHS_PRICE_ID
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {plans.map((plan, i) => (
        <div key={i} className="p-8 rounded-xl bg-[#131A2A] border border-white/10 text-center">
          <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
          <p className="text-5xl font-extrabold mb-4">{plan.price}</p>
          <p className="opacity-70 mb-6">{plan.description}</p>

          <a
            href={`/api/create-checkout-session?priceId=${plan.priceId}`}
            className="px-6 py-3 bg-primary rounded-lg font-semibold text-lg hover:opacity-90 inline-block"
          >
            Elegir plan
          </a>
        </div>
      ))}
    </div>
  );
}
