'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [credits, setCredits] = useState<number>(0);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  // ------------------------------------
  //  Cargar datos del usuario autenticado
  // ------------------------------------
  async function loadDashboard() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    setEmail(user.email ?? '');

    // Cargar créditos
    const { data: creditsData } = await supabase
      .from('users_credits')
      .select('credits')
      .eq('id', user.id)
      .single();

    setCredits(creditsData?.credits ?? 0);

    // Cargar historial
    const { data: historyData } = await supabase
      .from('logos_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setHistory(historyData ?? []);

    setLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  // --------------------------
  //  Funciones para Stripe
  // --------------------------
  async function goToCheckout(type: 'daily' | 'monthly' | 'six') {
    const route =
      type === 'daily'
        ? '/api/checkout/daily'
        : type === 'monthly'
        ? '/api/checkout/monthly'
        : '/api/checkout/six-months';

    const res = await fetch(route, { method: 'POST' });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Error iniciando el pago.');
    }
  }

  if (loading) return <div className="text-white">Cargando Dashboard…</div>;

  return (
    <div className="text-white max-w-4xl mx-auto mt-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <button
          className="px-4 py-2 bg-red-600 rounded-lg"
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/');
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* USER INFO */}
      <div className="card p-5 mb-6 bg-[#131A2A] border border-white/10 rounded-lg">
        <p className="text-lg opacity-80">Bienvenido:</p>
        <p className="text-xl font-semibold">{email}</p>
      </div>

      {/* CREDITOS */}
      <div className="card p-5 mb-6 bg-[#131A2A] border border-white/10 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Créditos disponibles</h2>
        <p className="text-5xl font-bold text-purple-400">{credits}</p>
      </div>

      {/* PAGOS / PLANES */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Comprar créditos o suscripción</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Plan Diario */}
        <div className="p-5 bg-[#1A2338] rounded-lg border border-white/10">
          <h3 className="text-xl font-bold">Acceso 24 horas</h3>
          <p className="opacity-80 mt-2">50 créditos por 20€</p>
          <button
            className="mt-4 w-full py-2 bg-purple-600 rounded-lg"
            onClick={() => goToCheckout('daily')}
          >
            Comprar 20€
          </button>
        </div>

        {/* Plan Mensual */}
        <div className="p-5 bg-[#1A2338] rounded-lg border border-white/10">
          <h3 className="text-xl font-bold">Plan Mensual</h3>
          <p className="opacity-80 mt-2">300 créditos por 50€/mes</p>
          <button
            className="mt-4 w-full py-2 bg-purple-600 rounded-lg"
            onClick={() => goToCheckout('monthly')}
          >
            Suscribirse 50€/mes
          </button>
        </div>

        {/* Plan 6 Meses */}
        <div className="p-5 bg-[#1A2338] rounded-lg border border-white/10">
          <h3 className="text-xl font-bold">Plan 6 Meses</h3>
          <p className="opacity-80 mt-2">2000 créditos — renovación cada 6 meses</p>
          <button
            className="mt-4 w-full py-2 bg-purple-600 rounded-lg"
            onClick={() => goToCheckout('six')}
          >
            50€/mes (fact. semestral)
          </button>
        </div>

      </div>

      {/* HISTORIAL */}
      <h2 className="text-2xl font-semibold mt-12 mb-4">Historial de logos</h2>

      {history.length === 0 && (
        <p className="opacity-60">No has generado ningún logo todavía.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {history.map((item, i) => (
          <div key={i} className="p-4 bg-[#1A2338] border border-white/10 rounded-lg">
            <img
              src={item.image_url}
              className="rounded border border-white/10 mb-3"
            />
            <p className="text-sm opacity-80">{item.prompt}</p>
            <p className="text-xs opacity-60">{item.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

