import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const result = await openai.images.generate({
      prompt,
      model: "gpt-image-1",
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = result.data?.[0]?.b64_json;

    if (!image) {
      return NextResponse.json(
        { error: "OpenAI did not return an image" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      image,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

