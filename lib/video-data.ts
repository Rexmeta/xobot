import { ModelEvaluation, BenchmarkExplanation, UseCasePreset } from "./types";

// 비디오 생성 모델 벤치마크 설명 데이터 (예시)
export const videoBenchmarkExplanations: BenchmarkExplanation[] = [
  {
    name: "FID-V", // 비디오용 FID (Frechet Inception Distance for Video)
    description: "생성된 비디오와 실제 비디오 사이의 지각적 유사성을 측정합니다. 숫자가 낮을수록 실제 비디오와 더 유사합니다.",
    higherIsBetter: false,
    idealScore: "50 미만",
    useCase: "실사 같은 비디오를 만들 때"
  },
  {
    name: "FVD", // Frechet Video Distance
    description: "생성된 비디오의 시공간적 일관성과 실제 비디오 분포와의 거리를 측정합니다. 숫자가 낮을수록 자연스러운 비디오입니다.",
    higherIsBetter: false,
    idealScore: "100 미만",
    useCase: "자연스럽고 부드러운 움직임의 비디오를 만들 때"
  },
  {
    name: "CLIP Score-V", // 비디오용 CLIP Score
    description: "비디오 내용이 텍스트 프롬프트와 얼마나 잘 일치하는지 측정합니다. 숫자가 높을수록 프롬프트 의도를 잘 반영합니다.",
    higherIsBetter: true,
    idealScore: "40 이상",
    useCase: "텍스트 설명에 정확히 맞는 비디오를 만들 때"
  },
   {
    name: "Consistency", // 시간적 일관성 (예시 지표)
    description: "비디오 프레임 간의 내용 및 스타일 일관성을 측정합니다. 숫자가 높을수록 깜빡임이나 부자연스러운 전환이 적습니다.",
    higherIsBetter: true,
    idealScore: "80% 이상",
    useCase: "안정적이고 부드러운 비디오를 만들 때"
   },
];

// 비디오 생성 사용 목적별 프리셋 (예시)
export const videoUseCasePresets: UseCasePreset[] = [
  {
    id: "realistic-video",
    name: "실사 비디오",
    description: "실제 영상 같은 비디오를 만들 때",
    weights: {
      "FID-V": 2.0,
      "FVD": 1.5,
      "CLIP Score-V": 1.0,
      "Consistency": 1.0,
    }
  },
  {
    id: "consistent-video",
    name: "일관성 중시",
    description: "부드럽고 안정적인 비디오를 만들 때",
    weights: {
      "Consistency": 2.0,
      "FVD": 1.5,
      "FID-V": 1.0,
      "CLIP Score-V": 1.0,
    }
  },
   {
    id: "text-accurate-video",
    name: "프롬프트 정확성",
    description: "텍스트 프롬프트의 의도를 정확히 따르는 비디오를 만들 때",
    weights: {
      "CLIP Score-V": 2.0,
      "FVD": 1.0,
      "FID-V": 1.0,
      "Consistency": 1.0,
    }
   },
];

// 비디오 생성 모델 샘플 벤치마크 데이터 (예시)
export const videoEvaluations: ModelEvaluation[] = [
  {
    model: "Sora",
    type: "Video Generation",
    description: "텍스트 설명으로 사실적이고 상상력이 풍부한 장면을 만들 수 있는 모델입니다.",
    tags: ["👑 최고 품질", "✨ 사실적", "💡 창의적"],
    strengths: ["복잡한 장면 이해", "긴 비디오 생성", "다양한 스타일"],
    useCases: ["영화 제작", "애니메이션", "컨텐츠 생성"],
    recommendedFor: ["크리에이터", "영화 제작자", "아티스트"],
    benchmarks: [
      { name: "FID-V", score: 10.0 }, // 예시 점수
      { name: "FVD", score: 30.0 }, // 예시 점수
      { name: "CLIP Score-V", score: 45.0 }, // 예시 점수
      { name: "Consistency", score: 90.0, unit: "%" }, // 예시 점수
    ],
  },
  {
    model: "Runway Gen-2",
    type: "Video Generation",
    description: "기존 영상이나 이미지에 움직임을 추가하거나 텍스트로 새로운 비디오를 생성합니다.",
    tags: ["🛠️ 편집 도구", "🔄 유연성", "⏱️ 빠른 생성"],
    strengths: ["영상 편집 통합", "다양한 입력 소스", "쉬운 사용"],
    useCases: ["SNS 컨텐츠", "영상 편집", "간단한 애니메이션"],
    recommendedFor: ["컨텐츠 마케터", "영상 편집자", "일반 사용자"],
     benchmarks: [
      { name: "FID-V", score: 60.0 }, // 예시 점수
      { name: "FVD", score: 150.0 }, // 예시 점수
      { name: "CLIP Score-V", score: 38.0 }, // 예시 점수
      { name: "Consistency", score: 75.0, unit: "%" }, // 예시 점수
    ],
  },
   {
    model: "Pika Labs",
    type: "Video Generation",
    description: "AI를 활용하여 고품질의 비디오를 빠르고 쉽게 생성할 수 있는 플랫폼입니다.",
    tags: ["🚀 사용 용이", "🤝 커뮤니티", "💡 빠른 프로토타이핑"],
    strengths: ["사용자 친화적 인터페이스", "활발한 커뮤니티", "다양한 스타일"],
    useCases: ["아이디어 시각화", "SNS 밈", "짧은 영상 컨텐츠"],
    recommendedFor: ["일반 사용자", "컨텐츠 크리에이터", "디자이너"],
     benchmarks: [
      { name: "FID-V", score: 55.0 }, // 예시 점수
      { name: "FVD", score: 130.0 }, // 예시 점수
      { name: "CLIP Score-V", score: 40.0 }, // 예시 점수
      { name: "Consistency", score: 80.0, unit: "%" }, // 예시 점수
    ],
   },
]; 