import { ModelData, ModelEvaluation, BenchmarkExplanation, UseCasePreset } from "./types";

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

// 벤치마크 설명 데이터
export const benchmarkExplanations: BenchmarkExplanation[] = [
  {
    name: "TruthfulQA",
    description: "사실과 일치하는 답변을 얼마나 잘하는지 평가한 점수입니다. 숫자가 높을수록 더 믿을 수 있어요.",
    higherIsBetter: true,
    idealScore: "80% 이상",
    useCase: "정확한 정보가 필요한 경우"
  },
  {
    name: "MT Bench",
    description: "다양한 대화 상황에서 모델이 얼마나 자연스럽고 유용한 답변을 하는지 평가합니다.",
    higherIsBetter: true,
    idealScore: "8.5/10 이상",
    useCase: "일상적인 대화나 상담이 필요한 경우"
  },
  {
    name: "Toxicity",
    description: "유해하거나 부적절한 내용을 생성할 가능성을 측정합니다. 숫자가 낮을수록 더 안전해요.",
    higherIsBetter: false,
    idealScore: "5% 미만",
    useCase: "안전한 대화가 필요한 경우"
  },
  {
    name: "Hallucination",
    description: "사실이 아닌 내용을 만들어내는 경향을 측정합니다. 숫자가 낮을수록 더 신뢰할 수 있어요.",
    higherIsBetter: false,
    idealScore: "10% 미만",
    useCase: "정확한 정보가 중요한 경우"
  },
  {
    name: "MMLU",
    description: "다양한 분야의 지식과 이해도를 평가합니다. 숫자가 높을수록 더 똑똑해요.",
    higherIsBetter: true,
    idealScore: "80% 이상",
    useCase: "학습이나 연구에 활용할 경우"
  },
  {
    name: "HumanEval",
    description: "프로그래밍 문제 해결 능력을 평가합니다. 숫자가 높을수록 코딩을 더 잘해요.",
    higherIsBetter: true,
    idealScore: "70% 이상",
    useCase: "프로그래밍이나 개발에 활용할 경우"
  }
];

// 사용 목적별 프리셋
export const useCasePresets: UseCasePreset[] = [
  {
    id: "conversation",
    name: "대화용",
    description: "자연스러운 대화와 상담이 필요한 경우",
    weights: {
      "MT Bench": 2.0,
      "TruthfulQA": 1.5,
      "Toxicity": 1.5,
      "Hallucination": 1.0,
      "MMLU": 0.5,
      "HumanEval": 0.5
    }
  },
  {
    id: "coding",
    name: "코딩용",
    description: "프로그래밍과 개발에 활용할 경우",
    weights: {
      "HumanEval": 2.0,
      "MMLU": 1.5,
      "TruthfulQA": 1.0,
      "MT Bench": 0.5,
      "Toxicity": 1.0,
      "Hallucination": 1.0
    }
  },
  {
    id: "study",
    name: "학습용",
    description: "공부나 연구에 활용할 경우",
    weights: {
      "MMLU": 2.0,
      "TruthfulQA": 1.5,
      "Hallucination": 1.5,
      "MT Bench": 1.0,
      "Toxicity": 1.0,
      "HumanEval": 0.5
    }
  },
  {
    id: "safety",
    name: "안전성 중시",
    description: "안전하고 신뢰할 수 있는 대화가 필요한 경우",
    weights: {
      "Toxicity": 2.0,
      "Hallucination": 2.0,
      "TruthfulQA": 1.5,
      "MT Bench": 1.0,
      "MMLU": 0.5,
      "HumanEval": 0.5
    }
  }
];

// 샘플 벤치마크 데이터 (다양한 지표 및 출처 포함)
export const evaluations: ModelEvaluation[] = [
  {
    model: "GPT-4",
    type: "LLM",
    description: "가장 강력하고 다재다능한 AI 모델입니다. 복잡한 문제 해결과 창의적인 작업에 뛰어납니다.",
    tags: ["🎯 고정밀", "🔒 안전성 우수", "💡 창의적"],
    strengths: ["복잡한 문제 해결", "창의적인 글쓰기", "정확한 정보 제공"],
    useCases: ["연구", "개발", "창작"],
    recommendedFor: ["전문가", "개발자", "연구자"],
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
    description: "부드럽고 정직한 대화가 특징인 AI 모델입니다. 안전하고 신뢰할 수 있는 답변을 제공합니다.",
    tags: ["🧘 부드러움", "🤝 신뢰성", "📚 학습 도우미"],
    strengths: ["자연스러운 대화", "안전한 상담", "학습 지원"],
    useCases: ["교육", "상담", "일상 대화"],
    recommendedFor: ["학생", "교사", "일반 사용자"],
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
    description: "오픈소스 기반의 강력한 AI 모델입니다. 커스터마이징이 가능하고 다양한 용도로 활용할 수 있습니다.",
    tags: ["🔓 오픈소스", "🛠️ 커스터마이징", "💪 강력한 성능"],
    strengths: ["커스터마이징", "오픈소스 활용", "다양한 용도"],
    useCases: ["개발", "연구", "커스텀 솔루션"],
    recommendedFor: ["개발자", "연구자", "기업"],
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
    description: "구글의 최신 AI 모델로, 빠른 응답과 정확한 정보 제공이 특징입니다.",
    tags: ["⚡ 빠른 응답", "🎯 정확성", "🌐 다국어 지원"],
    strengths: ["빠른 응답", "정확한 정보", "다국어 지원"],
    useCases: ["검색", "번역", "정보 제공"],
    recommendedFor: ["일반 사용자", "비즈니스", "글로벌 사용자"],
    benchmarks: [
      { name: "TruthfulQA", score: 82.9, unit: "%", source: "Google Eval" },
      { name: "MT Bench", score: 9.1, unit: "/10", source: "LMSYS Arena" },
      { name: "Toxicity", score: 4.6, unit: "%", source: "Google Eval" },
      { name: "Hallucination", score: 9.3, unit: "%", source: "OpenCompass" },
      { name: "MMLU", score: 83.7, source: "Google Eval" },
      { name: "HumanEval", score: 58.4, source: "Google Eval" },
    ],
  },
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