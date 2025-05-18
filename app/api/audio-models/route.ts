import { NextResponse } from "next/server";
import { audioEvaluations } from "@/lib/audio-data";

export async function GET() {
  try {
    const models = audioEvaluations; // 샘플 데이터 사용
    return NextResponse.json(models);
  } catch (error) {
    console.error("Error in audio models API route:", error);
    return NextResponse.json({ error: "Failed to fetch audio model data" }, { status: 500 });
  }
} 