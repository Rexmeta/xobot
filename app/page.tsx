'use client'; // 클라이언트 컴포넌트로 변경

import { useState } from 'react';
import Header from '../components/Header';
import ModelTabs from '@/components/ModelTabs';
import { ModelEvaluation } from '@/lib/types';
import { useCasePresets, benchmarkExplanations } from '@/lib/data';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const [selectedUseCase, setSelectedUseCase] = useState<string>('conversation');

  const { data: evaluations, error, isLoading } = useSWR<ModelEvaluation[]>('/api/models', fetcher);

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
        <p>LLM 모델 데이터를 가져오는데 실패했습니다: {error.message}</p>
      </main>
    );
  }

  if (!evaluations || evaluations.length === 0) {
    return (
      <main className="p-6 max-w-6xl mx-auto flex justify-center items-center h-screen text-gray-600">
        <p>표시할 LLM 모델 데이터가 없습니다.</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">AI 모델 선택 가이드</h2>
            <p className="text-gray-600">
              이 대시보드는 복잡한 AI 모델 비교 대신, 사용 목적에 따라 어떤 모델이 적합한지 쉽게 설명해드립니다.
              모델을 처음 접하더라도 걱정 마세요. 아래에서 사용 목적을 선택하면 적합한 모델을 추천해드립니다.
            </p>
          </div>
        </div>

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

        <div className="px-4 py-6 sm:px-0 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              LLM 성능 비교
            </h1>
            <p className="text-gray-600 mb-4 max-w-2xl">
              최신 생성형 AI 모델들의 주요 벤치마크 점수를 비교합니다. 각 수치는 <b>논문 기반</b> 또는 <b>공개 벤치마크 리더보드</b>에서 가져온 결과이며, <b>신뢰성, 정확도, 유해성</b> 등을 포함합니다.
            </p>
            <ModelTabs
               evaluations={evaluations}
               useCasePresets={useCasePresets}
               benchmarkExplanations={benchmarkExplanations}
               selectedUseCase={selectedUseCase}
            />
          </div>
        </div>

        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">평가 지표 설명</h2>
            <p className="text-gray-600 mb-6">
              각 평가 지표는 모델의 다른 측면을 측정합니다. 마우스를 지표 이름 위에 올리면 자세한 설명을 볼 수 있습니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benchmarkExplanations.map((explanation) => (
                <div key={explanation.name} className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    {explanation.name}
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      explanation.higherIsBetter
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {explanation.higherIsBetter ? '높을수록 좋음' : '낮을수록 좋음'}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">{explanation.description}</p>
                  <div className="mt-3 text-sm">
                    <div className="flex items-center text-blue-600">
                      <span className="font-medium">이상적인 점수:</span>
                      <span className="ml-2">{explanation.idealScore}</span>
                    </div>
                    <div className="mt-2 text-gray-500">
                      <span className="font-medium">적합한 경우:</span>
                      <p className="mt-1">{explanation.useCase}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 