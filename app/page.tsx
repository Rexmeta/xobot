'use client'; // 클라이언트 컴포넌트로 변경

import { useState, useEffect } from 'react';
import Header from '../components/Header'
import BenchmarkTabs from '@/components/BenchmarkTabs'
import { fetchModels } from '@/lib/fetchers'
import { ModelEvaluation } from '@/lib/types'
import { useCasePresets, benchmarkExplanations } from '@/lib/data'

export default function Home() {
  const [evaluations, setEvaluations] = useState<ModelEvaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<string>('conversation');

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedEvaluations = await fetchModels();
        setEvaluations(fetchedEvaluations);
      } catch (err) {
        setError('데이터를 가져오는데 실패했습니다.');
        console.error('Error fetching evaluations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return (
      <main className="p-6 max-w-6xl mx-auto flex justify-center items-center h-screen">
        <p>데이터 로딩 중...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 max-w-6xl mx-auto flex justify-center items-center h-screen text-red-600">
        <p>{error}</p>
      </main>
    );
  }

  if (evaluations.length === 0) {
    return (
      <main className="p-6 max-w-6xl mx-auto flex justify-center items-center h-screen text-gray-600">
        <p>표시할 모델 데이터가 없습니다.</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* 초보자 안내 카드 */}
        <div className="px-4 py-6 sm:px-0 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">AI 모델 선택 가이드</h2>
            <p className="text-gray-600">
              이 대시보드는 복잡한 AI 모델 비교 대신, 사용 목적에 따라 어떤 모델이 적합한지 쉽게 설명해줍니다. 
              모델을 처음 접하더라도 걱정 마세요. 아래에서 사용 목적을 선택하면 적합한 모델을 추천해드립니다.
            </p>
          </div>
        </div>

        {/* 사용 목적 선택 */}
        <div className="px-4 py-6 sm:px-0 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">사용 목적 선택</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {useCasePresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedUseCase(preset.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedUseCase === preset.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <h3 className="font-medium text-gray-900">{preset.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{preset.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 벤치마크 설명 */}
        <div className="px-4 py-6 sm:px-0 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">평가 지표 설명</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benchmarkExplanations.map((explanation) => (
                <div key={explanation.name} className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900">{explanation.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{explanation.description}</p>
                  <div className="mt-2 text-sm">
                    <span className="text-blue-600">이상적인 점수: {explanation.idealScore}</span>
                    <p className="text-gray-500 mt-1">적합한 경우: {explanation.useCase}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 모델 비교 테이블 */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              AI 모델 성능 비교
            </h1>
            <p className="text-gray-600 mb-4 max-w-2xl">
              최신 생성형 AI 모델들의 주요 벤치마크 점수를 비교합니다. 각 수치는 <b>논문 기반</b> 또는 <b>공개 벤치마크 리더보드</b>에서 가져온 결과이며, <b>신뢰성, 정확도, 유해성</b> 등을 포함합니다.
            </p>
            <BenchmarkTabs evaluations={evaluations} selectedUseCase={selectedUseCase} />
          </div>
        </div>
      </main>
    </div>
  )
} 