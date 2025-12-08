"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GeneratorPage() {
  const router = useRouter();

  const [loadingUser, setLoadingUser] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ------------------------------------------------------------
  // PROTECCIÓN: solo usuarios con sesión + suscripción activa
  // ------------------------------------------------------------
  useEffect(() => {
    async function verifyAccess() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        router.push("/login");
        return;
      }

      // Consultar si tiene suscripción activa
      const { data: sub, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", "active")
        .maybeSingle();

      if (error || !sub) {
        router.push("/pricing");
        return;
      }

      setLoadingUser(false);
    }

    verifyAccess();
  }, [router]);

  if (loadingUser) {
    return (
      <div className="text-white text-center pt-32 text-xl">
        Verificando acceso…
      </div>
    );
  }

  // ------------------------------------------------------------
  // GENERAR LOGO VIA /api/generate-logo
  // ------------------------------------------------------------
  async function generate() {
    if (!prompt.trim()) {
      alert("Debes ingresar un prompt.");
      return;
    }

    setLoading(true);
    setImage(null);

    const res = await fetch("/api/generate-logo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!data.success) {
      alert("Error generando imagen: " + (data.error ?? ""));
    } else {
      setImage(data.image);
    }

    setLoading(false);
  }

  return (
    <div className="text-white max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Generador de Logos con IA</h1>

      <p className="opacity-80 mb-6">
        Describe el logo que quieres generar. Puedes pedir estilos, formas,
        colores, temáticas, etc.
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ejemplo: logo minimalista de un hotel con palma y colores dorados…"
        className="w-full p-4 bg-[#131A2A] border border-white/20 rounded-lg mb-4"
        rows={5}
      />

      <button
        onClick={generate}
        disabled={loading}
        className="px-6 py-3 bg-primary rounded-lg font-semibold"
      >
        {loading ? "Generando…" : "Generar Logo"}
      </button>

      {image && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Resultado:</h2>
          <img
            src={image}
            alt="Resultado del logo"
            className="rounded-lg border border-white/20"
          />
        </div>
      )}
    </div>
  );
}

