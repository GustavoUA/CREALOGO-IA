'use client';

import { useState } from 'react';

export default function GeneratorForm({ onGenerate }) {
  const [form, setForm] = useState({
    name: "",
    slogan: "",
    industry: "",
    style: "",
    colors: "",
    tone: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit() {
    onGenerate(form);
  }

  return (
    <div className="card space-y-4">
      <input name="name" onChange={handleChange} placeholder="Nombre de la marca" className="input" />
      <input name="slogan" onChange={handleChange} placeholder="Slogan (opcional)" className="input" />
      <input name="industry" onChange={handleChange} placeholder="Industria" className="input" />
      <input name="style" onChange={handleChange} placeholder="Estilo visual" className="input" />
      <input name="colors" onChange={handleChange} placeholder="Colores deseados" className="input" />
      <input name="tone" onChange={handleChange} placeholder="Tono de marca" className="input" />
      <button onClick={submit} className="btn-primary w-full">Generar</button>
    </div>
  );
}
