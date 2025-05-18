'use client'; // 클라이언트 컴포넌트로 변경

import { useState, useEffect } from 'react';
import Header from '../components/Header'
import BenchmarkTabs from '@/components/BenchmarkTabs'
import { fetchModels } from '@/lib/fetchers'
import { ModelEvaluation } from '@/lib/types'

export default function Home() {
  const [evaluations, setEvaluations] = useState<ModelEvaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              AI Model Performance Comparison
            </h1>
            <BenchmarkTabs evaluations={evaluations} />
          </div>
        </div>
      </main>
    </div>
  )
} 