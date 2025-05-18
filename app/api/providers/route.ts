import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      provider: "OpenAI",
      models: ["GPT-3.5", "GPT-4", "DALL·E 3"],
      latest: "GPT-4 Turbo",
      updated: "2024-05-17",
    },
    {
      provider: "Anthropic",
      models: ["Claude 2", "Claude 3 Haiku", "Claude 3 Opus"],
      latest: "Claude 3 Opus",
      updated: "2024-05-15",
    },
    {
      provider: "Meta",
      models: ["LLaMA 2", "LLaMA 3"],
      latest: "LLaMA 3 70B",
      updated: "2024-05-10",
    },
    {
      provider: "Google DeepMind",
      models: ["Gemini 1.0", "Gemini 1.5"],
      latest: "Gemini 1.5 Pro",
      updated: "2024-05-16",
    },
  ];

  return NextResponse.json(data);
} 