import { ModelEvaluation, BenchmarkExplanation, UseCasePreset } from "./types";

// 오디오 생성 모델 벤치마크 설명 데이터
export const audioBenchmarkExplanations: BenchmarkExplanation[] = [
  {
    name: "FID-A",
    description: "생성된 오디오와 실제 오디오 사이의 지각적 유사성을 측정합니다. 숫자가 낮을수록 실제 오디오와 더 유사합니다.",
    higherIsBetter: false,
    idealScore: "15 미만",
    useCase: "실제 소리 같은 오디오를 만들 때"
  },
  {
    name: "CLIP Score-A",
    description: "생성된 오디오가 텍스트 프롬프트와 얼마나 잘 일치하는지 측정합니다. 숫자가 높을수록 프롬프트 의도를 잘 반영합니다.",
    higherIsBetter: true,
    idealScore: "30 이상",
    useCase: "텍스트 설명에 정확히 맞는 오디오를 만들 때"
  },
  {
    name: "Quality",
    description: "생성된 오디오의 전반적인 음질 및 선명도를 평가합니다. 숫자가 높을수록 깨끗하고 명료한 소리입니다.",
    higherIsBetter: true,
    idealScore: "4.5/5 이상",
    useCase: "고품질 음성 또는 효과음이 필요한 경우"
  },
  {
    name: "Diversity",
    description: "주어진 프롬프트에 대해 얼마나 다양한 종류의 오디오를 생성할 수 있는지 측정합니다.",
    higherIsBetter: true,
    idealScore: "95% 이상",
    useCase: "다양한 오디오 옵션이 필요한 경우"
  }
];

// 오디오 생성 사용 목적별 프리셋
export const audioUseCasePresets: UseCasePreset[] = [
  {
    id: "realistic-audio",
    name: "실사 오디오",
    description: "실제와 구분하기 어려운 오디오를 만들 때",
    weights: {
      "FID-A": 2.0,
      "Quality": 1.5,
      "CLIP Score-A": 1.0,
      "Diversity": 0.5
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
      "FID-A": 0.5
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
      "Diversity": 1.0
    }
  }
];

// 오디오 생성 모델 샘플 벤치마크 데이터
export const audioEvaluations: ModelEvaluation[] = [
  {
    model: "AudioCraft 2.0",
    type: "Audio Generation",
    description: "Meta의 최신 오디오 생성 모델로, 음악, 효과음, 음성을 생성할 수 있는 통합 모델입니다.",
    tags: ["🎶 오디오 올인원", "✨ 다재다능", "🔓 오픈소스"],
    strengths: ["다양한 오디오 타입", "고품질 생성", "오픈소스"],
    useCases: ["팟캐스트 제작", "게임 사운드", "영상 편집"],
    recommendedFor: ["오디오 엔지니어", "컨텐츠 제작자", "개발자"],
    benchmarks: [
      { name: "FID-A", score: 12.0 },
      { name: "CLIP Score-A", score: 35.0 },
      { name: "Quality", score: 4.7, unit: "/5" },
      { name: "Diversity", score: 96.0, unit: "%" }
    ]
  },
  {
    model: "MusicGen 2.0",
    type: "Audio Generation",
    description: "Meta의 최신 음악 생성 모델로, 텍스트 설명으로 다양한 스타일의 음악을 생성할 수 있습니다.",
    tags: ["🎵 음악 생성", "🗣️ 텍스트 기반", "🔓 오픈소스"],
    strengths: ["음악 스타일 제어", "다양한 장르", "오픈소스"],
    useCases: ["배경 음악 제작", "음악 아이디어", "연구"],
    recommendedFor: ["음악가", "개발자", "컨텐츠 크리에이터"],
    benchmarks: [
      { name: "FID-A", score: 14.0 },
      { name: "CLIP Score-A", score: 33.0 },
      { name: "Quality", score: 4.5, unit: "/5" },
      { name: "Diversity", score: 94.0, unit: "%" }
    ]
  },
  {
    model: "SoundStorm",
    type: "Audio Generation",
    description: "Google의 최신 오디오 생성 모델로, 고품질의 음성과 효과음을 생성할 수 있습니다.",
    tags: ["🎤 음성 생성", "🔊 효과음", "✨ 고품질"],
    strengths: ["음성 품질", "효과음 다양성", "실시간 생성"],
    useCases: ["음성 합성", "게임 사운드", "영상 편집"],
    recommendedFor: ["음성 엔지니어", "게임 개발자", "영상 편집자"],
    benchmarks: [
      { name: "FID-A", score: 13.0 },
      { name: "CLIP Score-A", score: 34.0 },
      { name: "Quality", score: 4.6, unit: "/5" },
      { name: "Diversity", score: 93.0, unit: "%" }
    ]
  },
  {
    model: "Stable Audio 2.0",
    type: "Audio Generation",
    description: "Stability AI의 오픈소스 오디오 생성 모델로, 커스터마이징이 가능하고 다양한 용도로 활용할 수 있습니다.",
    tags: ["🔓 오픈소스", "🛠️ 커스터마이징", "💪 강력한 성능"],
    strengths: ["오픈소스", "커스터마이징", "다양한 용도"],
    useCases: ["개발", "연구", "커스텀 솔루션"],
    recommendedFor: ["개발자", "연구자", "기업"],
    benchmarks: [
      { name: "FID-A", score: 15.0 },
      { name: "CLIP Score-A", score: 32.0 },
      { name: "Quality", score: 4.4, unit: "/5" },
      { name: "Diversity", score: 92.0, unit: "%" }
    ]
  },
  {
    model: "AudioLDM 2",
    type: "Audio Generation",
    description: "AudioLDM의 최신 오디오 생성 모델로, 텍스트 프롬프트로 다양한 스타일의 오디오를 생성할 수 있습니다.",
    tags: ["🎨 스타일 다양성", "✨ 고품질", "🚀 사용 용이"],
    strengths: ["다양한 스타일", "고품질 생성", "쉬운 사용"],
    useCases: ["마케팅", "콘텐츠 제작", "디자인"],
    recommendedFor: ["마케터", "콘텐츠 크리에이터", "디자이너"],
    benchmarks: [
      { name: "FID-A", score: 16.0 },
      { name: "CLIP Score-A", score: 31.0 },
      { name: "Quality", score: 4.3, unit: "/5" },
      { name: "Diversity", score: 91.0, unit: "%" }
    ]
  }
]; 