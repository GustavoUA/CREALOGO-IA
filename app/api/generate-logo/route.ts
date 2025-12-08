import { NextResponse } from "next/server";
import requireAuth from "@/utils/requireAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  await requireAuth();

  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });

    const predictionReq = await fetch(
      "https://api.replicate.com/v1/models/stability-ai/stable-diffusion-xl-base-1.0/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: { prompt }
        }),
      }
    );

    let prediction = await predictionReq.json();

    let status = prediction.status;
    while (status !== "succeeded" && status !== "failed") {
      await new Promise((r) => setTimeout(r, 1500));

      const poll = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: { Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}` },
        }
      );

      prediction = await poll.json();
      status = prediction.status;
    }

    if (status === "failed") return NextResponse.json({ error: "Error generando imagen" }, { status: 500 });

    return NextResponse.json({ success: true, image: prediction.output[0] });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

