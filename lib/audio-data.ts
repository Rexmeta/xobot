import { ModelEvaluation, BenchmarkExplanation, UseCasePreset } from "./types";

// 오디오 생성 모델 벤치마크 설명 데이터 (예시)
export const audioBenchmarkExplanations: BenchmarkExplanation[] = [
  {
    name: "FID-A", // 오디오용 FID (Frechet Inception Distance for Audio)
    description: "생성된 오디오와 실제 오디오 사이의 지각적 유사성을 측정합니다. 숫자가 낮을수록 실제 오디오와 더 유사합니다.",
    higherIsBetter: false,
    idealScore: "30 미만",
    useCase: "실제 소리 같은 오디오를 만들 때"
  },
  {
    name: "CLIP Score-A", // 오디오용 CLIP Score
    description: "생성된 오디오가 텍스트 프롬프트와 얼마나 잘 일치하는지 측정합니다. 숫자가 높을수록 프롬프트 의도를 잘 반영합니다.",
    higherIsBetter: true,
    idealScore: "35 이상",
    useCase: "텍스트 설명에 정확히 맞는 오디오를 만들 때"
  },
   {
    name: "Quality", // 오디오 품질 (예시 지표)
    description: "생성된 오디오의 전반적인 음질 및 선명도를 평가합니다. 숫자가 높을수록 깨끗하고 명료한 소리입니다.",
    higherIsBetter: true,
    idealScore: "4.0/5 이상",
    useCase: "고품질 음성 또는 효과음이 필요한 경우"
   },
   {
    name: "Diversity", // 오디오 다양성 (예시 지표)
    description: "주어진 프롬프트에 대해 얼마나 다양한 종류의 오디오를 생성할 수 있는지 측정합니다.",
    higherIsBetter: true,
    idealScore: "90% 이상",
    useCase: "다양한 오디오 옵션이 필요한 경우"
   },
];

// 오디오 생성 사용 목적별 프리셋 (예시)
export const audioUseCasePresets: UseCasePreset[] = [
  {
    id: "realistic-audio",
    name: "실사 오디오",
    description: "실제와 구분하기 어려운 오디오를 만들 때",
    weights: {
      "FID-A": 2.0,
      "Quality": 1.5,
      "CLIP Score-A": 1.0,
      "Diversity": 0.5,
    }
  },
  {
    id: "creative-audio",
    name: "창의적 오디오",
    description: "독창적이고 다양한 오디오를 만들 때",
    weights: {
      "Diversity": 2.0,
      "CLIP Score-A": 1.5,
      "Quality": 1.0,
      "FID-A": 0.5,
    }
  },
   {
    id: "text-accurate-audio",
    name: "프롬프트 정확성",
    description: "텍스트 프롬프트의 의도를 정확히 따르는 오디오를 만들 때",
    weights: {
      "CLIP Score-A": 2.0,
      "Quality": 1.0,
      "FID-A": 1.0,
      "Diversity": 1.0,
    }
   },
];

// 오디오 생성 모델 샘플 벤치마크 데이터 (예시)
export const audioEvaluations: ModelEvaluation[] = [
  {
    model: "MusicGen",
    type: "Audio Generation",
    description: "텍스트 설명으로 음악을 생성하는 Meta의 모델입니다.",
    tags: ["🎵 음악 생성", "🗣️ 텍스트 기반", "🔓 오픈소스"],
    strengths: ["음악 스타일 제어", "다양한 장르", "오픈소스"],
    useCases: ["배경 음악 제작", "음악 아이디어", "연구"],
    recommendedFor: ["음악가", "개발자", "컨텐츠 크리에이터"],
    benchmarks: [
      { name: "FID-A", score: 25.0 }, // 예시 점수
      { name: "CLIP Score-A", score: 38.0 }, // 예시 점수
      { name: "Quality", score: 4.2, unit: "/5" }, // 예시 점수
      { name: "Diversity", score: 85.0, unit: "%" }, // 예시 점수
    ],
  },
  {
    model: "AudioCraft",
    type: "Audio Generation",
    description: "음악, 효과음, 음성을 생성할 수 있는 Meta의 통합 모델입니다.",
    tags: ["🎶 오디오 올인원", "✨ 다재다능", "🔓 오픈소스"],
    strengths: ["다양한 오디오 타입", "고품질 생성", "오픈소스"],
    useCases: ["팟캐스트 제작", "게임 사운드", "영상 편집"],
    recommendedFor: ["오디오 엔지니어", "컨텐츠 제작자", "개발자"],
     benchmarks: [
      { name: "FID-A", score: 22.0 }, // 예시 점수
      { name: "CLIP Score-A", score: 40.0 }, // 예시 점수
      { name: "Quality", score: 4.5, unit: "/5" }, // 예시 점수
      { name: "Diversity", score: 90.0, unit: "%" }, // 예시 점수
    ],
  },
   {
    model: "Google SoundGeneration",
    type: "Audio Generation",
    description: "다양한 소리와 음악을 텍스트 설명으로 생성하는 Google의 모델입니다.",
    tags: ["🌐 광범위", "🎯 정확성", "🚀 사용 용이"],
    strengths: ["방대한 데이터 기반", "텍스트 이해도", "쉬운 사용"],
    useCases: ["컨텐츠 생성", "교육 자료", "아이디어 탐색"],
    recommendedFor: ["일반 사용자", "컨텐츠 크리에이터", "교육자"],
     benchmarks: [
      { name: "FID-A", score: 20.0 }, // 예시 점수
      { name: "CLIP Score-A", score: 42.0 }, // 예시 점수
      { name: "Quality", score: 4.3, unit: "/5" }, // 예시 점수
      { name: "Diversity", score: 92.0, unit: "%" }, // 예시 점수
    ],
   },
]; 