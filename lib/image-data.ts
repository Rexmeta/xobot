import { ModelEvaluation, BenchmarkExplanation, UseCasePreset } from "./types";

// 이미지 생성 모델 벤치마크 설명 데이터
export const imageBenchmarkExplanations: BenchmarkExplanation[] = [
  {
    name: "FID",
    description: "생성된 이미지의 사실성을 평가합니다. 점수가 낮을수록 실제 이미지와 유사합니다.",
    higherIsBetter: false,
    idealScore: "10 미만",
    useCase: "실사 이미지 생성 시"
  },
  {
    name: "IS",
    description: "생성된 이미지의 품질과 다양성을 평가합니다. 점수가 높을수록 품질이 좋고 다양한 이미지를 생성합니다.",
    higherIsBetter: true,
    idealScore: "100 이상",
    useCase: "고품질 및 다양한 스타일 이미지 생성 시"
  },
  {
    name: "CLIP Score",
    description: "이미지가 텍스트 프롬프트와 얼마나 일치하는지 평가합니다. 점수가 높을수록 프롬프트 의도를 잘 반영합니다.",
    higherIsBetter: true,
    idealScore: "30 이상",
    useCase: "텍스트 설명에 정확히 맞는 이미지 생성 시"
  },
  {
    name: "LPIPS",
    description: "원본 이미지와 생성된 이미지 간의 지각적 유사성을 측정합니다. 점수가 낮을수록 원본과 유사합니다.",
    higherIsBetter: false,
    idealScore: "0.1 미만",
    useCase: "이미지 투 이미지 또는 편집 작업 시"
  }
];

// 이미지 생성 사용 목적별 프리셋
export const imageUseCasePresets: UseCasePreset[] = [
  {
    id: "realistic-image",
    name: "실사 이미지",
    description: "실제 사진 같은 이미지를 만들 때",
    weights: {
      "FID": 2.0,
      "LPIPS": 1.5,
      "IS": 1.0,
      "CLIP Score": 1.0
    }
  },
  {
    id: "creative-image",
    name: "창의적 이미지",
    description: "독창적이고 다양한 스타일의 이미지를 만들 때",
    weights: {
      "IS": 2.0,
      "CLIP Score": 1.5,
      "FID": 1.0,
      "LPIPS": 0.5
    }
  },
  {
    id: "text-accurate-image",
    name: "프롬프트 정확성",
    description: "텍스트 프롬프트의 의도를 정확히 따르는 이미지를 만들 때",
    weights: {
      "CLIP Score": 2.0,
      "FID": 1.0,
      "IS": 1.0,
      "LPIPS": 1.0
    }
  }
];

// 이미지 생성 모델 샘플 벤치마크 데이터
export const imageEvaluations: ModelEvaluation[] = [
  {
    model: "DALL-E 3",
    type: "Image Generation",
    description: "OpenAI의 최신 이미지 생성 모델로, 자연어 이해도가 뛰어나 텍스트 설명에 정확히 맞는 이미지를 생성합니다.",
    tags: ["🗣️ 텍스트 이해", "✨ 고품질", "🎨 창의성"],
    strengths: ["자연어 이해", "디테일 표현", "다양한 스타일"],
    useCases: ["컨텐츠 제작", "스토리보드", "디자인"],
    recommendedFor: ["컨텐츠 크리에이터", "디자이너", "마케터"],
    benchmarks: [
      { name: "FID", score: 8.0 },
      { name: "IS", score: 110.0 },
      { name: "CLIP Score", score: 32.0 },
      { name: "LPIPS", score: 0.08 }
    ]
  },
  {
    model: "Midjourney V6",
    type: "Image Generation",
    description: "뛰어난 예술적 감각과 사실적인 이미지 생성 능력을 가진 모델입니다. 프롬프트 해석 능력이 우수합니다.",
    tags: ["🎨 예술성", "✨ 사실적", "📸 고해상도"],
    strengths: ["예술적 스타일", "사실적인 렌더링", "고해상도 출력"],
    useCases: ["미술 작업", "컨셉 아트", "포스터 디자인"],
    recommendedFor: ["아티스트", "디자이너", "컨셉 아티스트"],
    benchmarks: [
      { name: "FID", score: 7.5 },
      { name: "IS", score: 115.0 },
      { name: "CLIP Score", score: 31.0 },
      { name: "LPIPS", score: 0.07 }
    ]
  },
  {
    model: "Stable Diffusion XL",
    type: "Image Generation",
    description: "Stability AI의 강력한 오픈소스 모델로, 다양한 스타일과 높은 해상도의 이미지를 생성할 수 있습니다. 커스터마이징 옵션이 풍부합니다.",
    tags: ["🔓 오픈소스", "🛠️ 커스터마이징", "💪 강력한 성능"],
    strengths: ["오픈소스", "확장성", "다양한 기능"],
    useCases: ["개발", "연구", "커스텀 애플리케이션"],
    recommendedFor: ["개발자", "연구원", "기업"],
    benchmarks: [
      { name: "FID", score: 9.0 },
      { name: "IS", score: 105.0 },
      { name: "CLIP Score", score: 30.0 },
      { name: "LPIPS", score: 0.09 }
    ]
  },
  {
    model: "Imagen 2",
    type: "Image Generation",
    description: "Google의 최신 이미지 생성 모델로, 사실적인 이미지와 깊이 있는 이해도를 바탕으로 이미지를 생성합니다.",
    tags: ["✨ 사실적", "🔍 정확성", "🤖 Google"],
    strengths: ["사실성", "텍스트 이해도", "다양한 스타일"],
    useCases: ["광고 이미지", "제품 디자인", "컨텐츠 생성"],
    recommendedFor: ["마케터", "디자이너", "컨텐츠 크리에이터"],
    benchmarks: [
      { name: "FID", score: 8.5 },
      { name: "IS", score: 108.0 },
      { name: "CLIP Score", score: 31.5 },
      { name: "LPIPS", score: 0.085 }
    ]
  },
  {
    model: "Playground v2.5",
    type: "Image Generation",
    description: "빠르고 사용하기 쉬운 이미지 생성 도구로, 다양한 스타일과 기능을 제공합니다. 웹 기반으로 접근하기 편리합니다.",
    tags: ["🚀 사용 용이", "⏱️ 빠른 생성", "🌐 웹 기반"],
    strengths: ["속도", "사용자 친화적", "다양한 도구"],
    useCases: ["아이디어 시각화", "SNS 컨텐츠", "간단한 디자인"],
    recommendedFor: ["일반 사용자", "블로거", "SNS 마케터"],
    benchmarks: [
      { name: "FID", score: 9.5 },
      { name: "IS", score: 102.0 },
      { name: "CLIP Score", score: 29.0 },
      { name: "LPIPS", score: 0.1 }
    ]
  }
]; 