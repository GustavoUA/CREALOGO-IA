"use client";

import { useState } from "react";
import Link from "next/link";

export default function Landing() {
  const [loadingPlan, setLoadingPlan] = useState("");

  async function checkout(plan: string) {
    try {
      setLoadingPlan(plan);

      const endpoint =
        plan === "daily"
          ? "/api/checkout/daily"
          : plan === "monthly"
          ? "/api/checkout/monthly"
          : "/api/checkout/six-months";

      const res = await fetch(endpoint, { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error iniciando el pago: " + data.error);
      }
    } catch (error) {
      alert("Error desconocido iniciando pago.");
    } finally {
      setLoadingPlan("");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* HEADER */}
        <h1 className="text-5xl font-bold mb-4">Crea logos con IA</h1>
        <p className="text-lg text-gray-300 mb-8">
          Regístrate, selecciona un plan y genera logos ilimitados con inteligencia artificial.
        </p>

        {/* LOGIN / REGISTER BUTTONS */}
        <div className="flex justify-center gap-5 mb-14">
          <Link
            href="/login"
            className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/register"
            className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg font-semibold hover:bg-gray-700"
          >
            Crear cuenta
          </Link>
        </div>

        {/* PRICING SECTION */}
        <h2 className="text-4xl font-bold mb-10">Planes disponibles</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* DAILY PLAN */}
          <div className="p-8 bg-[#111827] rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-4">Plan Diario</h3>
            <p className="text-gray-300 mb-6">Acceso por 24 horas</p>
            <p className="text-4xl font-bold mb-6">20€</p>

            <button
              onClick={() => checkout("daily")}
              className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
            >
              {loadingPlan === "daily" ? "Procesando..." : "Comprar"}
            </button>
          </div>

          {/* MONTHLY PLAN */}
          <div className="p-8 bg-[#111827] rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-4">Plan Mensual</h3>
            <p className="text-gray-300 mb-6">Acceso por 30 días</p>
            <p className="text-4xl font-bold mb-6">40€</p>

            <button
              onClick={() => checkout("monthly")}
              className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
            >
              {loadingPlan === "monthly" ? "Procesando..." : "Comprar"}
            </button>
          </div>

          {/* SIX MONTHS PLAN */}
          <div className="p-8 bg-[#111827] rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-4">Plan Semestral</h3>
            <p className="text-gray-300 mb-6">Acceso durante 6 meses</p>
            <p className="text-4xl font-bold mb-6">50€ / mes</p>

            <button
              onClick={() => checkout("six-months")}
              className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
            >
              {loadingPlan === "six-months" ? "Procesando..." : "Comprar"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
