'use client';

import { useState } from 'react';

interface GeneratorFormProps {
  onGenerate: (data: {
    name: string;
    slogan: string;
    style: string;
  }) => void;
}

export default function GeneratorForm({ onGenerate }: GeneratorFormProps) {
  const [form, setForm] = useState({
    name: "",
    slogan: "",
    style: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onGenerate(form);
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Nombre del negocio"
        value={form.name}
        onChange={handleChange}
        className="input"
      />

      <input
        type="text"
        name="slogan"
        placeholder="Slogan (opcional)"
        value={form.slogan}
        onChange={handleChange}
        className="input"
      />

      <select
        name="style"
        value={form.style}
        onChange={handleChange}
        className="input"
      >
        <option value="">Selecciona estilo</option>
        <option value="minimalista">Minimalista</option>
        <option value="moderno">Moderno</option>
        <option value="luxury">Luxury</option>
        <option value="3d">3D</option>
      </select>

      <button
        type="submit"
        className="w-full py-3 bg-primary rounded-lg font-semibold"
      >
        Generar Logo
      </button>
    </form>
  );
}
