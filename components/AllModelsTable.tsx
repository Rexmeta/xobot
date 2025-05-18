"use client";

import { ModelEvaluation } from '@/lib/types';
import React from 'react'; // Import React for keys

interface AllModelsTableProps {
  evaluations: ModelEvaluation[];
}

export default function AllModelsTable({ evaluations }: AllModelsTableProps) {
  if (!evaluations || evaluations.length === 0) {
    return <div>비교할 모델 데이터가 없습니다.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">모델 이름</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제공업체</th>
             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">종류</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">라이선스</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Context Window</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intelligence Index</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (USD/1M)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Output Speed (t/s)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latency (s)</th>
            {/* Add more columns for other benchmarks if needed */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {evaluations.map((model) => (
            <tr key={model.model}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model.model}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.creator || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.type || 'N/A'}</td>
               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.license || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.contextWindow || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.intelligenceIndex || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.pricePerMillionTokens || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.outputSpeed || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.latency || 'N/A'}</td>
              {/* Add more cells for other benchmarks */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 