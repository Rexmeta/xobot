import { ModelData, ModelEvaluation } from "./types";

// Helper function to calculate average score
const calculateAverage = (model: Omit<ModelData, 'averageScore'>): number => {
  // Simple average for demonstration - adjust weights/metrics as needed
  const metrics = [
    model.truthfulqa,
    model.mtbench * 10, // Scale MT Bench for simple averaging (out of 100)
    100 - model.toxicity, // Scale toxicity so higher is better
    100 - model.hallucination // Scale hallucination so higher is better
  ];
  const sum = metrics.reduce((acc, val) => acc + val, 0);
  return sum / metrics.length;
};

// 샘플 벤치마크 데이터 (다양한 지표 및 출처 포함)
export const evaluations: ModelEvaluation[] = [
  {
    model: "GPT-4",
    type: "LLM",
    benchmarks: [
      { name: "TruthfulQA", score: 88.1, unit: "%", source: "Paper" },
      { name: "MT Bench", score: 9.6, unit: "/10", source: "LMSYS Arena" },
      { name: "Toxicity", score: 3.1, unit: "%", source: "Perspective API" },
      { name: "Hallucination", score: 7.2, unit: "%", source: "OpenCompass" },
      { name: "MMLU", score: 86.4, source: "OpenAI Eval" },
      { name: "HumanEval", score: 67.0, source: "OpenAI Eval" },
    ],
  },
  {
    model: "Claude 3 Opus",
    type: "LLM",
    benchmarks: [
      { name: "TruthfulQA", score: 85.4, unit: "%", source: "Anthropic Eval" },
      { name: "MT Bench", score: 9.2, unit: "/10", source: "LMSYS Arena" },
      { name: "Toxicity", score: 2.4, unit: "%", source: "Anthropic Eval" },
      { name: "Hallucination", score: 6.9, unit: "%", source: "OpenCompass" },
      { name: "MMLU", score: 86.8, source: "Anthropic Eval" },
      { name: "HumanEval", score: 80.0, source: "Anthropic Eval" },
    ],
  },
  {
    model: "LLaMA 3 70B",
    type: "LLM",
    benchmarks: [
      { name: "TruthfulQA", score: 76.0, unit: "%", source: "Meta Eval" },
      { name: "MT Bench", score: 8.1, unit: "/10", source: "LMSYS Arena" },
      { name: "Toxicity", score: 7.3, unit: "%", source: "Meta Eval" },
      { name: "Hallucination", score: 12.1, unit: "%", source: "OpenCompass" },
      { name: "MMLU", score: 81.7, source: "Meta Eval" },
      { name: "HumanEval", score: 62.2, source: "Meta Eval" },
    ],
  },
  {
    model: "Gemini 1.5 Pro",
    type: "LLM",
    benchmarks: [
      { name: "TruthfulQA", score: 82.9, unit: "%", source: "Google Eval" },
      { name: "MT Bench", score: 9.1, unit: "/10", source: "LMSYS Arena" },
      { name: "Toxicity", score: 4.6, unit: "%", source: "Google Eval" },
      { name: "Hallucination", score: 9.3, unit: "%", source: "OpenCompass" },
      { name: "MMLU", score: 83.7, source: "Google Eval" },
      { name: "HumanEval", score: 58.4, source: "Google Eval" },
    ],
  },
  // Add more models and benchmarks as needed
];

// 필요하다면 평균 점수 계산 로직 추가 (예: 특정 지표에 대한 가중 평균)
// const calculateAverageScore = (benchmarks: BenchmarkResult[]): number => { ... };

// 데이터에 평균 점수 계산 결과를 추가하려면 map 사용 (선택 사항)
// export const modelsWithAverage = evaluations.map(eval => ({
//   ...eval,
//   averageScore: calculateAverageScore(eval.benchmarks),
// }));

export const models: ModelData[] = [
  {
    model: "GPT-4",
    truthfulqa: 88.1,
    mtbench: 9.6,
    toxicity: 3.1,
    hallucination: 7.2,
    averageScore: 0, // Placeholder, will be calculated
  },
  {
    model: "Claude 3",
    truthfulqa: 85.4,
    mtbench: 9.2,
    toxicity: 2.4,
    hallucination: 6.9,
    averageScore: 0, // Placeholder
  },
  {
    model: "LLaMA 3 70B",
    truthfulqa: 76.0,
    mtbench: 8.1,
    toxicity: 7.3,
    hallucination: 12.1,
    averageScore: 0, // Placeholder
  },
  {
    model: "Gemini 1.5",
    truthfulqa: 82.9,
    mtbench: 9.1,
    toxicity: 4.6,
    hallucination: 9.3,
    averageScore: 0, // Placeholder
  },
].map(model => ({ // Calculate averageScore for each model
  ...model,
  averageScore: calculateAverage(model)
})); 