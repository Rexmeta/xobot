"use client";

import useSWR from 'swr';
import Header from '@/components/Header';
import ProviderModelTable from '@/components/ProviderModelTable'; // Import the new table component
import { ProviderSummary } from '@/lib/types'; // Import the type

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProvidersPage() {
  // Data fetching is now handled within ProviderModelTable
  // const { data, error } = useSWR<ProviderModelPerformance[]>('/api/providers', fetcher);

  // if (error) return <div>데이터 로딩 실패</div>;
  // if (!data) return <div>데이터 로딩 중...</div>;

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">API 제공업체별 모델 성능 리더보드</h1>
        <ProviderModelTable /> {/* Use the new table component */}
      </main>
    </div>
  );
} 