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
import { ProviderSummary } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProviderModelTable() {
  const { data: providers, isLoading } = useSWR<ProviderSummary[]>("/api/providers", fetcher);

  if (isLoading) return <div>불러오는 중...</div>;
  if (!providers) return <div>데이터 없음</div>;

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제공업체</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">보유 모델</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">최신 모델</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">업데이트 일자</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {providers.map((item) => (
          <tr key={item.provider}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.provider}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.models.join(", ")}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.latest}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.updated}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 