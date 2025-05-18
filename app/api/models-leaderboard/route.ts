import { NextResponse } from "next/server";

export async function GET() {
  const models = [
    {
      name: "GPT-4 Turbo",
      provider: "OpenAI",
      releaseDate: "2023-11-06",
      contextLength: 128000,
      benchmarks: {
        truthfulQA: 88.1,
        mmlu: 83.5,
      },
      safety: {
        toxicity: 2.5,
      },
    },
    {
      name: "Claude 3 Opus",
      provider: "Anthropic",
      releaseDate: "2024-03-04",
      contextLength: 200000,
      benchmarks: {
        truthfulQA: 85.4,
        mmlu: 82.1,
      },
      safety: {
        toxicity: 2.1,
      },
    },
    {
      name: "Gemini 1.5 Pro",
      provider: "Google DeepMind",
      releaseDate: "2024-02-15",
      contextLength: 1000000,
      benchmarks: {
        truthfulQA: 82.9,
        mmlu: 80.7,
      },
      safety: {
        toxicity: 3.3,
      },
    },
    {
      name: "LLaMA 3 70B",
      provider: "Meta",
      releaseDate: "2024-04-18",
      contextLength: 8000,
      benchmarks: {
        truthfulQA: 76.0,
        mmlu: 72.4,
      },
      safety: {
        toxicity: 6.2,
      },
    },
  ];

  return NextResponse.json(models);
} 