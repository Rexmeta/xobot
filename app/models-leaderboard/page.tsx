"use client";

import useSWR from "swr";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableCell,
//   TableBody,
// } from "@/components/ui/table"; // Removed shadcn/ui import

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ModelsLeaderboardPage() {
  const { data: models, isLoading } = useSWR("/api/models-leaderboard", fetcher);

  if (isLoading) return <div>불러오는 중...</div>;
  if (!models) return <div>데이터 없음</div>; // Add check for no data

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">전체 AI 모델 리더보드</h1>
      <div className="overflow-x-auto"> {/* Add overflow for responsiveness */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">모델</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제공업체</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">출시일</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Context Length</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TruthfulQA</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MMLU</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toxicity ↓</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {models.map((item: any) => (
              <tr key={item.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.provider}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.releaseDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.contextLength}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.benchmarks.truthfulQA}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.benchmarks.mmlu}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.safety.toxicity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
} 