'use client';

export default function PricingPlans() {
  async function startCheckout(plan: "daily" | "monthly" | "six") {
    const endpoint =
      plan === "daily"
        ? "/api/checkout/daily"
        : plan === "monthly"
        ? "/api/checkout/monthly"
        : "/api/checkout/six-months";

    const res = await fetch(endpoint, { method: "POST" });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    } else {
      alert("Error iniciando pago: " + (data.error || "Desconocido"));
    }
  }

  return (
    <div className="text-white max-w-4xl mx-auto mt-20">
      <h1 className="text-4xl font-bold text-center mb-10">Planes de Suscripción</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* DAILY PLAN */}
        <div className="card p-6 bg-[#151a28] rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Plan Diario</h2>
          <p className="text-xl mb-4">20€ / día</p>
          <p className="opacity-70 mb-4">Ideal para uso puntual</p>
          <button
            onClick={() => startCheckout("daily")}
            className="w-full bg-primary py-3 rounded-lg font-semibold"
          >
            Comprar 1 Día
          </button>
        </div>

        {/* MONTHLY PLAN */}
        <div className="card p-6 bg-[#151a28] rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Plan Mensual</h2>
          <p className="text-xl mb-4">40€ / mes</p>
          <p className="opacity-70 mb-4">Acceso continuo a creación de logos</p>
          <button
            onClick={() => startCheckout("monthly")}
            className="w-full bg-primary py-3 rounded-lg font-semibold"
          >
            Comprar Mensual
          </button>
        </div>

        {/* 6 MONTHS PLAN */}
        <div className="card p-6 bg-[#151a28] rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Plan 6 Meses</h2>
          <p className="text-xl mb-4">50€ / mes (300€ total)</p>
          <p className="opacity-70 mb-4">Ahorra dinero con suscripción semestral</p>
          <button
            onClick={() => startCheckout("six")}
            className="w-full bg-primary py-3 rounded-lg font-semibold"
          >
            Comprar 6 Meses
          </button>
        </div>

      </div>
    </div>
  );
}

