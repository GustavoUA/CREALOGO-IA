'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function loginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMsg('Error: ' + error.message);
    } else {
      router.push('/dashboard');
    }

    setLoading(false);
  }

  return (
    <div className="text-white max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Iniciar sesión</h1>

      <form onSubmit={loginUser} className="space-y-4 card">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-[#131A2A] border border-white/10"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-[#131A2A] border border-white/10"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary rounded-lg font-semibold"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        {msg && <p className="text-sm opacity-80 mt-2">{msg}</p>}
      </form>
    </div>
  );
}
