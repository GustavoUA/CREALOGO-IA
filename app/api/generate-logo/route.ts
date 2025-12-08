import { NextResponse } from "next/server";

export const runtime = "edge"; // opcional pero recomendado en Vercel

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt requerido" },
        { status: 400 }
      );
    }

    const replicateRes = await fetch(
      "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
      {
        method: "POST",
        headers: {
          "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            prompt,
            num_outputs: 1,
            aspect_ratio: "1:1",
          }
        }),
      }
    );

    const prediction = await replicateRes.json();

    if (prediction.error) {
      return NextResponse.json(
        { error: prediction.error },
        { status: 500 }
      );
    }

    // Esperar a que finalice la generación
    let result = prediction;
    while (result.status !== "succeeded" && result.status !== "failed") {
      await new Promise((r) => setTimeout(r, 1500));

      const check = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );

      result = await check.json();
    }

    if (result.status === "failed") {
      return NextResponse.json(
        { error: "Replicate no pudo generar la imagen" },
        { status: 500 }
      );
    }

    // La imagen final viene como URL directa
    const imageUrl = result.output?.[0];

    return NextResponse.json({
      success: true,
      image: imageUrl,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Error inesperado" },
      { status: 500 }
    );
  }
}
