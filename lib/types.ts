export interface ModelData {
  model: string;
  truthfulqa: number;
  mtbench: number;
  toxicity: number;
  hallucination: number;
  averageScore: number;
}

export interface BenchmarkResult {
  name: string; // 예: "TruthfulQA", "MT Bench", "BLEU"
  score: number | string; // 점수 값 (숫자, 문자열 등)
  unit?: string; // 단위 (예: "%", "/10")
  source?: string; // 데이터 출처 (예: "HELM", "OpenCompass", "PaperXYZ")
  description?: string; // 지표 설명
}

export interface ModelEvaluation {
  model: string; // 모델 이름 (예: "GPT-4")
  type: string; // 모델 종류 (예: "LLM", "Vision")
  benchmarks: BenchmarkResult[]; // 해당 모델의 벤치마크 결과 목록
  averageScore?: number; // (선택 사항) 특정 기준에 의한 평균 점수
  description?: string;
  tags?: string[];
  strengths?: string[];
  useCases?: string[];
  recommendedFor?: string[];
}

export interface BenchmarkExplanation {
  name: string;
  description: string;
  higherIsBetter: boolean;
  idealScore: string;
  useCase: string;
}

export interface UseCasePreset {
  id: string;
  name: string;
  description: string;
  weights: {
    [key: string]: number;
  };
} 