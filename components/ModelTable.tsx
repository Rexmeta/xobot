'use client'; // 클라이언트 컴포넌트로 변경

import { useState } from 'react';
// import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"; // shadcn/ui Table 임포트 제거
import { ModelEvaluation, BenchmarkResult } from '@/lib/types';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'; // 아이콘 추가
import clsx from 'clsx'; // 조건부 클래스 적용을 위한 라이브러리

interface ModelTableProps {
  evaluations: ModelEvaluation[];
}

type SortField = string;

export default function ModelTable({ evaluations }: ModelTableProps) {
  const allBenchmarkNames = Array.from(new Set(
    evaluations.flatMap(evaluationItem => evaluationItem.benchmarks.map(b => b.name))
  ));

  const [sortField, setSortField] = useState<SortField>('model');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEvaluations = [...evaluations].sort((a, b) => {
    if (sortField === 'model') {
      const aValue = a.model;
      const bValue = b.model;
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    } else {
      const aBenchmark = a.benchmarks.find(b => b.name === sortField);
      const bBenchmark = b.benchmarks.find(b => b.name === sortField);

      const aValue = aBenchmark ? (typeof aBenchmark.score === 'number' ? aBenchmark.score : -Infinity) : -Infinity;
      const bValue = bBenchmark ? (typeof bBenchmark.score === 'number' ? bBenchmark.score : -Infinity) : -Infinity;

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return null;
    }
    if (sortDirection === 'asc') {
      return <ChevronUpIcon className="ml-1 w-3 h-3 inline-block" />;
    } else {
      return <ChevronDownIcon className="ml-1 w-3 h-3 inline-block" />;
    }
  };

  const getHeaderClass = (field: SortField) =>
    clsx(
      "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
      {
        "text-primary-600": sortField === field,
      }
    );

  const getBenchmarkScore = (benchmarks: BenchmarkResult[], name: string): string => {
    const benchmark = benchmarks.find(b => b.name === name);
    if (!benchmark) return '-';
    if (typeof benchmark.score === 'number') {
      return `${benchmark.score.toFixed(1)}${benchmark.unit || ''}`;
    } else {
      return `${benchmark.score}${benchmark.unit || ''}`;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className={getHeaderClass('model')} onClick={() => handleSort('model')}>모델 {renderSortIcon('model')}</th>
            {allBenchmarkNames.map(name => (
              <th key={name} className={getHeaderClass(name)} onClick={() => handleSort(name)}>
                {name} {renderSortIcon(name)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedEvaluations.map((evaluation) => (
            <tr key={evaluation.model} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{evaluation.model}</td>
              {allBenchmarkNames.map(name => (
                <td key={name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getBenchmarkScore(evaluation.benchmarks, name)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 