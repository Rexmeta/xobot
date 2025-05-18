import { NextResponse } from "next/server";
import { videoEvaluations } from "@/lib/video-data";

export async function GET() {
  try {
    const models = videoEvaluations; // 샘플 데이터 사용
    return NextResponse.json(models);
  } catch (error) {
    console.error("Error in video models API route:", error);
    return NextResponse.json({ error: "Failed to fetch video model data" }, { status: 500 });
  }
} 