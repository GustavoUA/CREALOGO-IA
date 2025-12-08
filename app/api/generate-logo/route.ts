import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // 1. VERIFICAR USUARIO LOGUEADO
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Debes iniciar sesión para generar un logo" },
        { status: 401 }
      );
    }

    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });
    }

    // 2. VERIFICAR CRÉDITOS DEL USUARIO
    const { data: creditRow, error: creditError } = await supabase
      .from("user_credits")
      .select("credits")
      .eq("user_id", user.id)
      .single();

    if (creditError) {
      console.error(creditError);
      return NextResponse.json(
        { error: "No se pudieron obtener tus créditos" },
        { status: 500 }
      );
    }

    if (!creditRow || creditRow.credits <= 0) {
      return NextResponse.json(
        { error: "No tienes créditos suficientes" },
        { status: 402 }
      );
    }

    // 3. GENERACIÓN CON REPLICATE
    const predictionReq = await fetch(
      "https://api.replicate.com/v1/models/stability-ai/stable-diffusion-xl-base-1.0/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: { prompt },
        }),
      }
    );

    if (!predictionReq.ok) {
      const errTxt = await predictionReq.text();
      return NextResponse.json({ error: errTxt }, { status: 500 });
    }

    let prediction = await predictionReq.json();
    let status = prediction.status;
    let result = prediction;

    // 4. POLLING HASTA QUE TERMINE
    while (status !== "succeeded" && status !== "failed") {
      await new Promise((r) => setTimeout(r, 1500));

      const poll = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
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

    const finalImage = result.output[0];

    // 5. DESCONTAR CRÉDITO AUTOMÁTICO
    const { error: updateErr } = await supabase
      .from("user_credits")
      .update({ credits: creditRow.credits - 1 })
      .eq("user_id", user.id);

    if (updateErr) {
      console.error(updateErr);
      return NextResponse.json(
        { error: "Error al descontar crédito" },
        { status: 500 }
      );
    }

    // 6. RETORNAR IMAGEN
    return NextResponse.json({
      success: true,
      image: finalImage,
    });
  } catch (err: any) {
    console.error("ERROR:", err);
    return NextResponse.json(
      { error: err.message ?? "Error desconocido" },
      { status: 500 }
    );
  }
}
