export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      <h1 className="text-5xl font-extrabold mb-6">
        CrealogoAI
      </h1>

      <p className="text-lg opacity-80 max-w-xl text-center mb-10">
        Genera logotipos profesionales con inteligencia artificial en segundos.
        Describe tu idea y obtén un logo único listo para descargar.
      </p>

      <div className="flex gap-6">
        <a
          href="/generator"
          className="px-6 py-3 bg-primary text-black font-semibold rounded-lg text-lg hover:opacity-80 transition"
        >
          Generar un logo
        </a>

        <a
          href="/login"
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg text-lg hover:bg-gray-200 transition"
        >
          Iniciar sesión
        </a>
      </div>
    </main>
  );
}
