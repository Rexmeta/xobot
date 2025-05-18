import { ModelData } from "./types";

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