import { ModelEvaluation } from '@/lib/types';
import { evaluations } from '@/lib/data'; // Import static data directly
import { fetchModels } from '@/lib/fetchers'; // 상세 페이지에서 데이터를 가져올 fetcher 함수

// 동적 라우트 파라미터의 타입을 정의
interface ModelDetailPageProps {
  params: {
    name: string; // 모델 이름 (URL에서 추출)
  };
}

// 동적으로 페이지 생성 시 필요한 함수 (Next.js)
export async function generateStaticParams() {
  // Use static data directly during build time
  return evaluations.map((model) => ({
    name: model.model,
  }));
}

// 모델 상세 페이지 컴포넌트
export default async function ModelDetailPage({ params }: ModelDetailPageProps) {
  const modelName = params.name;

  // During build time and initial page load, use static data
  let modelData = evaluations.find(model => model.model === modelName);

  // If not found in static data, try fetching from API (client-side navigation)
  if (!modelData) {
    try {
      const allModels = await fetchModels();
      modelData = allModels.find(model => model.model === modelName);
    } catch (error) {
      console.error('Error fetching model data:', error);
    }
  }

  if (!modelData) {
    // 해당 모델을 찾지 못했을 경우 404 페이지 또는 메시지 표시
    return (
      <main className="p-6 max-w-6xl mx-auto text-center mt-10">
        <h1 className="text-2xl font-bold text-red-600">모델을 찾을 수 없습니다.</h1>
        <p className="mt-4 text-gray-600">요청하신 모델 ({modelName})의 데이터를 찾을 수 없습니다.</p>
      </main>
    );
  }

  // 상세 정보를 보여주는 UI 구현
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">모델 상세 정보: {modelData.model}</h1>
      {/* 모델 종류 표시 */}
      <p className="text-gray-600 mb-4">종류: {modelData.type}</p>

      {/* 벤치마크 지표 상세 목록 표시 */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">벤치마크 결과</h2>
        {/* TODO: 상세 지표 테이블 또는 목록 구현 */}
        <ul className="space-y-4">
          {modelData.benchmarks.map((benchmark, index) => (
            <li key={index} className="border-b pb-2">
              <h3 className="text-lg font-medium">{benchmark.name}</h3>
              <p className="text-gray-700">점수: {benchmark.score}{benchmark.unit}</p>
              {benchmark.source && <p className="text-gray-500 text-sm">출처: {benchmark.source}</p>}
              {benchmark.description && <p className="text-gray-500 text-sm">설명: {benchmark.description}</p>}
            </li>
          ))}
        </ul>
      </div>

      {/* TODO: 추세 그래프 섹션 추가 (데이터 필요) */}
      {/* <div className="mt-8">...</div> */}

    </main>
  );
} 