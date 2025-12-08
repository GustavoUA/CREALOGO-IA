import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 border-b border-white/10 mb-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-white">CrealogoAI</Link>
        <nav className="flex items-center gap-6 text-white/80">
          <Link href="/generator">Generador</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/pricing">Precios</Link>
          <Link href="/login" className="px-4 py-2 bg-primary rounded-lg text-white font-semibold">Entrar</Link>
        </nav>
      </div>
    </header>
  );
}
