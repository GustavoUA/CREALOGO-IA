import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    console.log("PROMPT RECIBIDO:", prompt);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });
    }

    console.log("ENVIANDO A REPLICATE...");

    const predictionReq = await fetch(
      "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            prompt,
            num_outputs: 1,
            aspect_ratio: "1:1",
          },
        }),
      }
    );

    console.log("RESPONSE STATUS:", predictionReq.status);

    if (!predictionReq.ok) {
      const errTxt = await predictionReq.text();
      console.error("ERROR DE REPLICATE:", errTxt);
      return NextResponse.json({ error: errTxt }, { status: 500 });
    }

    let prediction = await predictionReq.json();
    console.log("CREATED PREDICTION:", prediction.id);

    let status = prediction.status;
    let result = prediction;

    while (status !== "succeeded" && status !== "failed") {
      console.log("STATUS:", status);

      await new Promise((r) => setTimeout(r, 1500));

      const poll = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );

      result = await poll.json();
      status = result.status;
    }

    if (status === "failed") {
      console.error("PREDICCIÓN FALLÓ:", result);
      return NextResponse.json(
        { error: "Replicate falló al generar la imagen" },
        { status: 500 }
      );
    }

    console.log("PREDICCIÓN FINALIZADA OK");

    return NextResponse.json({
      success: true,
      image: result.output[0],
    });
  } catch (err: any) {
    console.error("ERROR DEL SERVIDOR:", err);
    return NextResponse.json(
      { error: err.message ?? "Error desconocido" },
      { status: 500 }
    );
  }
}
