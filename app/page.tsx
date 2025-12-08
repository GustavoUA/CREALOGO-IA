'use client';

import Link from "next/link";
import PricingTable from "../components/PricingTable";

export default function LandingPage() {
  return (
    <div className="text-white">
      
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-black px-6">
        <h1 className="text-6xl font-extrabold mb-6 text-center">
          Diseña Logos Profesionales con IA
        </h1>

        <p className="text-xl opacity-80 mb-10 max-w-2xl text-center">
          CrealogoAI transforma tus ideas en logos modernos y profesionales usando inteligencia artificial avanzada.
        </p>

        <div className="flex gap-4">
          <Link
            className="px-8 py-4 bg-primary rounded-lg text-xl font-semibold hover:opacity-90"
            href="/register"
          >
            Empieza Gratis
          </Link>

          <Link
            className="px-8 py-4 bg-white text-black rounded-lg text-xl font-semibold hover:bg-gray-200"
            href="/login"
          >
            Iniciar sesión
          </Link>
        </div>

        <p className="opacity-60 mt-6">No se requiere tarjeta para registrarte</p>
      </section>

      {/* PRICING */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Planes y precios</h2>
        <PricingTable />
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 opacity-50">
        CrealogoAI © {new Date().getFullYear()} – Todos los derechos reservados
      </footer>

    </div>
  );
}
