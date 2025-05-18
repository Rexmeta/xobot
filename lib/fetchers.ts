import { ModelEvaluation } from '@/lib/types';

// 환경에 따라 API 기본 URL을 결정하는 함수
function getBaseUrl() {
  // Vercel 배포 환경에서는 VERCEL_URL 환경 변수 사용
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // 개발 환경에서는 로컬호스트 사용
  // 클라이언트 측에서는 상대 경로도 가능하지만, 서버/빌드 시점에서는 절대 경로 필요
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
}

export async function fetchModels(): Promise<ModelEvaluation[]> {
  // API 기본 URL과 경로를 합쳐 절대 경로 생성
  const apiUrl = `${getBaseUrl()}/api/models`;
  
  const res = await fetch(apiUrl);
  if (!res.ok) {
    // 에러 발생 시 상세 정보 로깅
    const errorDetail = await res.text();
    console.error(`Failed to fetch models from ${apiUrl}: ${res.status} ${res.statusText}`, errorDetail);
    throw new Error(`Failed to fetch models: ${res.status} ${res.statusText}`);
  }
  return res.json();
} 