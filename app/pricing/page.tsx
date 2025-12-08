'use client';

import { useState } from 'react';

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function subscribe(plan: string) {
    setLoading(plan);

    const endpoint =
      plan === 'daily'
        ? '/api/checkout/daily'
        : plan === 'monthly'
        ? '/api/checkout/monthly'
        : '/api/checkout/six-months';

    try {
      const res = await fetch(endpoint, { method: 'POST' });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirige al checkout de Stripe
      } else {
        alert('Error iniciando el pago: ' + data.error);
      }
    } catch (err: any) {
      alert('Error iniciando el pago.');
    }

    setLoading(null);
  }

  return (
    <div className="text-white max-w-5xl mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-10">Planes y Precios</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* PLAN DIARIO */}
        <div className="card p-6 text-center border border-white/10 rounded-lg bg-[#131A2A]">
          <h2 className="text-2xl font-bold mb-2">Plan Diario</h2>
          <p className="text-4xl font-bold text-primary mb-4">20 €</p>
          <p className="opacity-70 mb-6">Acceso por 24 horas con créditos ilimitados.</p>
          <button
            onClick={() => subscribe('daily')}
            className="w-full py-3 bg-primary rounded-lg font-semibold"
            disabled={loading === 'daily'}
          >
            {loading === 'daily' ? 'Procesando…' : 'Comprar 1 día'}
          </button>
        </div>

        {/* PLAN MENSUAL */}
        <div className="card p-6 text-center border border-white/10 rounded-lg bg-[#131A2A]">
          <h2 className="text-2xl font-bold mb-2">Plan Mensual</h2>
          <p className="text-4xl font-bold text-primary mb-4">40 €</p>
          <p className="opacity-70 mb-6">Acceso completo por 30 días + prioridad.</p>
          <button
            onClick={() => subscribe('monthly')}
            className="w-full py-3 bg-primary rounded-lg font-semibold"
            disabled={loading === 'monthly'}
          >
            {loading === 'monthly' ? 'Procesando…' : 'Comprar 1 mes'}
          </button>
        </div>

        {/* PLAN 6 MESES */}
        <div className="card p-6 text-center border border-white/10 rounded-lg bg-[#131A2A]">
          <h2 className="text-2xl font-bold mb-2">Plan 6 meses</h2>
          <p className="text-4xl font-bold text-primary mb-4">50 €/mes</p>
          <p className="opacity-70 mb-6">Plan extendido con ahorro del 20%.</p>
          <button
            onClick={() => subscribe('six-months')}
            className="w-full py-3 bg-primary rounded-lg font-semibold"
            disabled={loading === 'six-months'}
          >
            {loading === 'six-months' ? 'Procesando…' : 'Comprar 6 meses'}
          </button>
        </div>
      </div>

      {/* Botón volver al Home */}
      <div className="text-center mt-12">
        <a
          href="/"
          className="px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition"
        >
          Volver al Home
        </a>
      </div>
    </div>
  );
}

