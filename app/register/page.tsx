"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerUser(e: any) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/login`,
      },
    });

    setLoading(false);

    if (error) {
      alert("Error creando cuenta: " + error.message);
      return;
    }

    alert("Revisa tu correo para confirmar tu cuenta.");
  }

  return (
    <main className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <form
        onSubmit={registerUser}
        className="bg-[#111827] p-10 rounded-xl border border-gray-800 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">Crear Cuenta</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 mb-6 rounded bg-black border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
        >
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>
    </main>
  );
}

