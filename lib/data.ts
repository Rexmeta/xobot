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
    model: "Claude 3 Opus",
    type: "LLM",
    description: "Anthropic의 최신 대규모 언어 모델로, 복잡한 추론과 창의적 작업에 뛰어난 성능을 보입니다.",
    tags: ["👑 최고 성능", "🧠 고급 추론", "🎯 정확성"],
    strengths: ["복잡한 추론", "정확한 정보", "창의적 글쓰기"],
    useCases: ["연구", "고급 분석", "전문가 작업"],
    recommendedFor: ["연구원", "분석가", "전문가"],
    benchmarks: [
      { name: "MMLU", score: 86.0 },
      { name: "HumanEval", score: 84.2 },
      { name: "MT Bench", score: 9.2 },
      { name: "TruthfulQA", score: 95.0 },
      { name: "Toxicity", score: 0.1 },
      { name: "Hallucination", score: 0.05 }
    ]
  },
  {
    model: "GPT-4 Turbo",
    type: "LLM",
    description: "OpenAI의 최신 GPT-4 모델로, 더 빠른 응답 속도와 향상된 성능을 제공합니다.",
    tags: ["⚡ 빠른 응답", "🔄 최신 지식", "🎨 창의성"],
    strengths: ["빠른 처리", "광범위한 지식", "다양한 작업"],
    useCases: ["개발", "콘텐츠 제작", "비즈니스 분석"],
    recommendedFor: ["개발자", "콘텐츠 크리에이터", "비즈니스 전문가"],
    benchmarks: [
      { name: "MMLU", score: 85.2 },
      { name: "HumanEval", score: 82.5 },
      { name: "MT Bench", score: 9.0 },
      { name: "TruthfulQA", score: 94.5 },
      { name: "Toxicity", score: 0.15 },
      { name: "Hallucination", score: 0.08 }
    ]
  },
  {
    model: "Gemini 1.5 Pro",
    type: "LLM",
    description: "Google의 최신 멀티모달 AI 모델로, 텍스트와 이미지를 함께 처리할 수 있습니다.",
    tags: ["🖼️ 멀티모달", "🔍 정확성", "🌐 광범위"],
    strengths: ["멀티모달 처리", "정확한 정보", "실시간 데이터"],
    useCases: ["멀티모달 분석", "연구", "개발"],
    recommendedFor: ["연구원", "개발자", "데이터 분석가"],
    benchmarks: [
      { name: "MMLU", score: 83.5 },
      { name: "HumanEval", score: 80.8 },
      { name: "MT Bench", score: 8.8 },
      { name: "TruthfulQA", score: 93.8 },
      { name: "Toxicity", score: 0.12 },
      { name: "Hallucination", score: 0.07 }
    ]
  },
  {
    model: "Mistral Large",
    type: "LLM",
    description: "Mistral AI의 최신 대규모 언어 모델로, 효율적인 성능과 합리적인 비용을 제공합니다.",
    tags: ["💰 비용 효율", "⚡ 빠른 처리", "🔓 오픈소스"],
    strengths: ["효율적인 처리", "합리적인 비용", "오픈소스"],
    useCases: ["일반 작업", "개발", "비즈니스"],
    recommendedFor: ["개발자", "스타트업", "중소기업"],
    benchmarks: [
      { name: "MMLU", score: 81.2 },
      { name: "HumanEval", score: 78.5 },
      { name: "MT Bench", score: 8.5 },
      { name: "TruthfulQA", score: 92.0 },
      { name: "Toxicity", score: 0.18 },
      { name: "Hallucination", score: 0.1 }
    ]
  },
  {
    model: "Llama 3 70B",
    type: "LLM",
    description: "Meta의 최신 오픈소스 대규모 언어 모델로, 높은 성능과 커스터마이징 가능성을 제공합니다.",
    tags: ["🔓 오픈소스", "🛠️ 커스터마이징", "🌐 광범위"],
    strengths: ["오픈소스", "커스터마이징", "다양한 작업"],
    useCases: ["연구", "개발", "커스텀 솔루션"],
    recommendedFor: ["연구원", "개발자", "기업"],
    benchmarks: [
      { name: "MMLU", score: 80.5 },
      { name: "HumanEval", score: 77.8 },
      { name: "MT Bench", score: 8.3 },
      { name: "TruthfulQA", score: 91.5 },
      { name: "Toxicity", score: 0.2 },
      { name: "Hallucination", score: 0.12 }
    ]
  }
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