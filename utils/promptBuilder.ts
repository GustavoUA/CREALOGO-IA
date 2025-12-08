// Construye un prompt optimizado para OpenAI Imagen 3
export function buildPrompt({ name, slogan, industry, style, colors, tone }) {
  return `
  Crea un logotipo profesional y moderno siguiendo estas especificaciones:
  - Nombre de la marca: ${name}
  - Eslogan: ${slogan || "Sin eslogan"}
  - Sector o industria: ${industry}
  - Estilo visual: ${style}
  - Paleta de colores deseada: ${colors}
  - Personalidad de la marca: ${tone}

  Requisitos:
  - Diseño limpio y minimalista.
  - Composición centrada.
  - Colores equilibrados.
  - Imagen cuadrada 1024x1024.
  - NO incluir marcas de agua ni texto adicional fuera del nombre y slogan.
  `;
}
