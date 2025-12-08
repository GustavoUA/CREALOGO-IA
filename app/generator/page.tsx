'use client';

import { useState } from 'react';

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const res = await fetch('app/api/generate-logo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (data.success) {
      setImage(data.image);
    } else {
      alert(data.error || 'Error generating logo');
    }
    setLoading(false);
  }

  return (
    <div className="text-white max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Generar Logo con IA</h1>

      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Describe el logo que quieres generar…"
        className="w-full p-4 rounded bg-[#131A2A] border border-white/10 mb-4"
        rows={5}
      />

      <button
        onClick={generate}
        className="px-6 py-3 bg-primary rounded-lg font-semibold"
        disabled={loading}
      >
        {loading ? 'Generando…' : 'Generar Logo'}
      </button>

      {image && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Resultado:</h2>
          <img src={image} alt="logo generado" className="rounded-lg border border-white/10" />
        </div>
      )}
    </div>
  );
}
