export function buildPrompt({
  name,
  slogan,
  industry,
  style,
  colors,
  tone,
}: {
  name: string;
  slogan?: string;
  industry?: string;
  style?: string;
  colors?: string;
  tone?: string;
}) {
  return `
    Crea un logotipo profesional y moderno siguiendo estas especificaciones:
    - Nombre de la marca: ${name}
    - Eslogan: ${slogan || "N/A"}
    - Sector: ${industry || "General"}
    - Estilo deseado: ${style || "Moderno y minimalista"}
    - Colores preferidos: ${colors || "A elección del diseñador"}
    - Tono de la marca: ${tone || "Profesional"}

    Instrucciones:
    - Debe ser un diseño limpio, atractivo y escalable.
    - Fondo transparente.
    - Entrega la imagen en formato PNG.
  `;
}

