'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [credits, setCredits] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      const res = await fetch('/api/user-dashboard');
      const data = await res.json();
      setCredits(data.credits);
      setHistory(data.history || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return <div className="text-white">Cargando dashboard...</div>;

  return (
    <div className="text-white max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-2">Créditos disponibles</h2>
        <p className="text-4xl font-bold text-primary">{credits ?? 0}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Historial de logos</h2>
      <div className="space-y-4">
        {history.length === 0 && <p>No has generado ningún logo todavía.</p>}

        {history.map((item, i) => (
          <div key={i} className="card flex items-center gap-4">
            <img
              src={item.image_url.startsWith('data:image')
                ? item.image_url
                : `data:image/png;base64,${item.image_url}`}
              className="w-20 h-20 rounded border border-white/10"
            />
            <div>
              <p className="opacity-80 text-sm">{item.prompt}</p>
              <p className="text-xs opacity-50">{item.created_at}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
