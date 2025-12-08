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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}./login`,
      },
    });

    setLoading(false);

    if (error) {
      alert("Error creando cuenta: " + error.message);
      console.log(error);
      return;
    }

    alert("Cuenta creada. Revisa tu correo para confirmar el registro.");
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
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 rounded bg-black border border-gray-700"
          placeholder="Contraseña"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Creando…" : "Registrarse"}
        </button>
      </form>
    </main>
  );
}

