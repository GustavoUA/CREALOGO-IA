import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; 


export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });
    }

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

    const prediction = await predictionReq.json();

    if (prediction.error) {
      return NextResponse.json({ error: prediction.error }, { status: 500 });
    }

    let status = prediction.status;
    let result = prediction;

    while (status !== "succeeded" && status !== "failed") {
      await new Promise((resolve) => setTimeout(resolve, 1500));

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
      return NextResponse.json(
        { error: "Replicate falló al generar la imagen" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      image: result.output[0],
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Error desconocido" },
      { status: 500 }
    );
  }
}

