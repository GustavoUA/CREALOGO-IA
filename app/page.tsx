'use client';

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="text-white">

      {/* ---------------- HERO ---------------- */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-[#0B0F19] text-center px-6">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Crea logos profesionales con IA en segundos
        </h1>

        <p className="text-lg opacity-80 max-w-2xl mb-10">
          Genera logotipos totalmente originales usando inteligencia artificial avanzada.
          Sin diseñadores, sin complicaciones.
        </p>

        <div className="flex gap-4">
          <Link
            href="/register"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
          >
            Crear cuenta
          </Link>

          <Link
            href="/generator"
            className="px-6 py-3 bg-white text-black hover:bg-gray-300 rounded-lg font-semibold"
          >
            Probar generador
          </Link>
        </div>
      </section>

      {/* ---------------- CÓMO FUNCIONA ---------------- */}
      <section className="py-24 bg-[#0E1424] text-center px-6">
        <h2 className="text-4xl font-bold mb-12">¿Cómo funciona?</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-6 bg-[#131A2A] rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-2">1. Describe tu logo</h3>
            <p className="opacity-70">
              Escribe unos detalles: colores, estilo, nombre de marca…
            </p>
          </div>

          <div className="p-6 bg-[#131A2A] rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-2">2. IA genera el diseño</h3>
            <p className="opacity-70">
              Nuestro modelo avanzado crea un logotipo único en segundos.
            </p>
          </div>

          <div className="p-6 bg-[#131A2A] rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-2">3. Descarga en alta calidad</h3>
            <p className="opacity-70">
              Guarda tu logo final en alta resolución para tu marca.
            </p>
          </div>

        </div>
      </section>

      {/* ---------------- PLANES ---------------- */}
      <section className="py-24 bg-[#0B0F19] text-center px-6">
        <h2 className="text-4xl font-bold mb-12">Planes y precios</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* ---- PLAN DIARIO ---- */}
          <div className="p-8 bg-[#131A2A] rounded-xl border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-4">Acceso 24 horas</h3>
            <p className="text-5xl font-extrabold mb-4">20€</p>
            <p className="opacity-80 mb-6">Uso ilimitado durante 1 día</p>

            <form action="/api/checkout/daily" method="POST">
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
              >
                Comprar
              </button>
            </form>
          </div>

          {/* ---- PLAN MENSUAL ---- */}
          <div className="p-8 bg-[#131A2A] rounded-xl border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-4">Plan mensual</h3>
            <p className="text-5xl font-extrabold mb-4">50€</p>
            <p className="opacity-80 mb-6">Facturado cada mes</p>

            <form action="/api/checkout/monthly" method="POST">
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
              >
                Suscribirse
              </button>
            </form>
          </div>

          {/* ---- PLAN 6 MESES ---- */}
          <div className="p-8 bg-[#131A2A] rounded-xl border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-4">Plan 6 meses</h3>
            <p className="text-5xl font-extrabold mb-4">50€/mes</p>
            <p className="opacity-80 mb-6">Acceso completo durante 6 meses</p>

            <form action="/api/checkout/six-months" method="POST">
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
              >
                Elegir plan
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="py-10 text-center opacity-60 bg-[#0B0F19]">
        © {new Date().getFullYear()} CrealogoAI — Todos los derechos reservados.
      </footer>

    </div>
  );
}

