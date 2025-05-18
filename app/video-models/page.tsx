'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ModelTabs from '@/components/ModelTabs';
import { ModelEvaluation, UseCasePreset, BenchmarkExplanation } from '@/lib/types';
import { videoUseCasePresets, videoBenchmarkExplanations } from '@/lib/video-data'; // 비디오 데이터 임포트
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function VideoModelsPage() {
  const [selectedUseCase, setSelectedUseCase] = useState<string>('realistic-video'); // 기본 사용 목적 (비디오)

  // 비디오 모델 API 라우트에서 데이터 가져오기
  const { data: evaluations, error, isLoading } = useSWR<ModelEvaluation[]>('/api/video-models', fetcher);


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
        <p>비디오 모델 데이터를 가져오는데 실패했습니다: {error.message}</p>
      </main>
    );
  }

  if (!evaluations || evaluations.length === 0) {
    return (
      <main className="p-6 max-w-6xl mx-auto flex justify-center items-center h-screen text-gray-600">
        <p>표시할 비디오 모델 데이터가 없습니다.</p>
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
            <h2 className="text-xl font-semibold text-blue-600 mb-2">비디오 생성 AI 모델 선택 가이드</h2>
            <p className="text-gray-600">
              이 페이지에서는 다양한 비디오 생성 AI 모델들의 성능을 비교하고, 사용 목적에 맞는 모델을 추천해드립니다.
            </p>
          </div>
        </div>

        {/* 사용 목적 선택 (비디오용 프리셋 사용) */}
        <div className="px-4 py-6 sm:px-0 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">사용 목적 선택</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {videoUseCasePresets.map((preset: UseCasePreset) => (
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

        {/* 모델 비교 테이블/차트 (공통 ModelTabs 컴포넌트 사용, 비디오 데이터 전달) */}
        <div className="px-4 py-6 sm:px-0 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              비디오 생성 AI 모델 성능 비교
            </h1>
            <p className="text-gray-600 mb-4 max-w-2xl">
              주요 비디오 생성 AI 모델들의 벤치마크 점수를 비교합니다. <b>FID-V, FVD, CLIP Score-V</b> 등 비디오 품질 및 프롬프트 일치도 지표를 포함합니다.
            </p>
            <ModelTabs
               evaluations={evaluations}
               useCasePresets={videoUseCasePresets}
               benchmarkExplanations={videoBenchmarkExplanations}
               selectedUseCase={selectedUseCase}
            />
          </div>
        </div>

        {/* 벤치마크 설명 (비디오용 설명 사용) */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">평가 지표 설명</h2>
            <p className="text-gray-600 mb-6">
              각 평가 지표는 비디오 생성 모델의 다른 측면을 측정합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoBenchmarkExplanations.map((explanation: BenchmarkExplanation) => (
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