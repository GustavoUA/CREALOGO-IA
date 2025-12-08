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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMsg("Error: " + error.message);
      setLoading(false);
      return;
    }

    // Login correcto → redirigir al dashboard
    router.push("/dashboard");
  }

  return (
    <div className="text-white max-w-md mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-6">Iniciar sesión</h1>

      <form onSubmit={loginUser} className="space-y-4 bg-[#131A2A] p-6 rounded-lg border border-white/10">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-black border border-white/10"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-black border border-white/10"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {msg && <p className="text-red-400 text-sm">{msg}</p>}
      </form>

      <p className="text-center opacity-70 mt-4">
        ¿No tienes cuenta? <a className="text-purple-400" href="/register">Crear cuenta</a>
      </p>
    </div>
  );
}
