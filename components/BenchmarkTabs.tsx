"use client";

import { useState } from 'react';
import ModelTable from "./ModelTable";
import ModelChart from "./ModelChart";
import { ModelEvaluation, BenchmarkExplanation } from '@/lib/types';
import { useCasePresets } from '@/lib/data';
import clsx from 'clsx';

interface BenchmarkTabsProps {
  evaluations: ModelEvaluation[];
  selectedUseCase: string;
  benchmarkExplanations: BenchmarkExplanation[];
}

export default function BenchmarkTabs({ evaluations, selectedUseCase, benchmarkExplanations }: BenchmarkTabsProps) {
  const [activeTab, setActiveTab] = useState<'table' | 'chart'>('table');

  // 선택된 사용 목적에 따라 모델 정렬
  const sortedEvaluations = [...evaluations].sort((a, b) => {
    const preset = useCasePresets.find(p => p.id === selectedUseCase);
    if (!preset) return 0;

    const getWeightedScore = (model: ModelEvaluation) => {
      return model.benchmarks.reduce((score, benchmark) => {
        const weight = preset.weights[benchmark.name] || 1;
        const normalizedScore = typeof benchmark.score === 'number' ? benchmark.score : 0;
        return score + (normalizedScore * weight);
      }, 0);
    };

    return getWeightedScore(b) - getWeightedScore(a);
  });

  return (
    <div>
      {/* 탭 버튼 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('table')}
            className={clsx(
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'table'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            테이블 보기
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={clsx(
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'chart'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            차트 보기
          </button>
        </nav>
      </div>

      {/* 모델 태그 섹션 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">추천 모델</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedEvaluations.slice(0, 4).map((model, index) => (
            <div key={model.model} className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{model.model}</h4>
                {index === 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    추천
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{model.description}</p>
              <div className="flex flex-wrap gap-1">
                {model.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 테이블/차트 컨텐츠 */}
      <div className="mt-6">
        {activeTab === 'table' ? (
          <ModelTable evaluations={sortedEvaluations} benchmarkExplanations={benchmarkExplanations} />
        ) : (
          <ModelChart evaluations={sortedEvaluations} benchmarkExplanations={benchmarkExplanations} />
        )}
      </div>
    </div>
  );
} 