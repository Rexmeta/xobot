"use client";

import useSWR from 'swr';
import Header from '@/components/Header';
import { ProviderModelPerformance } from '@/lib/types'; // Import the new type

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProvidersPage() {
  const { data, error } = useSWR<ProviderModelPerformance[]>('/api/providers', fetcher);

  if (error) return <div>데이터 로딩 실패</div>;
  if (!data) return <div>데이터 로딩 중...</div>;

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">API 제공업체별 모델 성능 리더보드</h1>
        {/* TODO: Replace with a dedicated table component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{item.provider} - {item.model}</h2>
              <p>Intelligence Index: {item.intelligenceIndex}</p>
              <p>Price (USD/1M): {item.pricePerMillionTokens}</p>
              <p>Output Speed (t/s): {item.outputSpeed}</p>
              <p>Latency (s): {item.latency}</p>
              {/* Add other fields as needed */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 