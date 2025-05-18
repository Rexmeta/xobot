'use client'; // 클라이언트 컴포넌트로 변경

import { useState } from 'react';
// import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"; // shadcn/ui Table 임포트 제거
import { ModelEvaluation, BenchmarkResult, BenchmarkExplanation } from '@/lib/types';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'; // 아이콘 추가
import clsx from 'clsx'; // 조건부 클래스 적용을 위한 라이브러리

interface ModelTableProps {
  evaluations: ModelEvaluation[];
  benchmarkExplanations: BenchmarkExplanation[]; // benchmarkExplanations prop 추가
}

type SortField = string;

export default function ModelTable({ evaluations, benchmarkExplanations }: ModelTableProps) {
  const allBenchmarkNames = Array.from(new Set(
    evaluations.flatMap(evaluationItem => evaluationItem.benchmarks.map(b => b.name))
  ));

  const [sortField, setSortField] = useState<SortField>('model');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [hoveredBenchmark, setHoveredBenchmark] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    const explanation = benchmarkExplanations.find(b => b.name === field);
    const higherIsBetter = explanation ? explanation.higherIsBetter : true;

    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(higherIsBetter ? 'desc' : 'asc');
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

      const aValue = aBenchmark ? (typeof aBenchmark.score === 'number' ? aBenchmark.score : (sortDirection === 'asc' ? -Infinity : Infinity)) : (sortDirection === 'asc' ? -Infinity : Infinity);
      const bValue = bBenchmark ? (typeof bBenchmark.score === 'number' ? bBenchmark.score : (sortDirection === 'asc' ? -Infinity : Infinity)) : (sortDirection === 'asc' ? -Infinity : Infinity);


      const explanation = benchmarkExplanations.find(exp => exp.name === sortField);
      const higherIsBetter = explanation ? explanation.higherIsBetter : true;

      if (aValue < bValue) {
          if (higherIsBetter) return sortDirection === 'asc' ? -1 : 1;
          else return sortDirection === 'asc' ? 1 : -1;
      }
       if (aValue > bValue) {
          if (higherIsBetter) return sortDirection === 'asc' ? 1 : -1;
          else return sortDirection === 'asc' ? -1 : 1;
      }

      return 0;
    }
  });

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return null;
    }
     const explanation = benchmarkExplanations.find(b => b.name === field);
    const higherIsBetter = explanation ? explanation.higherIsBetter : true;

    if (sortDirection === 'asc') {
      return higherIsBetter ? <ChevronUpIcon className="ml-1 w-3 h-3 inline-block" /> : <ChevronDownIcon className="ml-1 w-3 h-3 inline-block" />;
    } else {
      return higherIsBetter ? <ChevronDownIcon className="ml-1 w-3 h-3 inline-block" /> : <ChevronUpIcon className="ml-1 w-3 h-3 inline-block" />;
    }
  };

  const getHeaderClass = (field: SortField) =>
    clsx(
      "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
      {
        "text-blue-600": sortField === field,
      }
    );

  const getBenchmarkScore = (benchmarks: BenchmarkResult[], name: string): string => {
    const benchmark = benchmarks.find(b => b.name === name);
    if (!benchmark) return '-';
    if (typeof benchmark.score === 'number') {
      return `${benchmark.score.toFixed(2)}${benchmark.unit || ''}`;
    } else {
      return `${benchmark.score}${benchmark.unit || ''}`;
    }
  };

  const getBenchmarkExplanation = (name: string) => {
    return benchmarkExplanations.find(b => b.name === name);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className={getHeaderClass('model')} onClick={() => handleSort('model')}>
              모델 {renderSortIcon('model')}
            </th>
            {allBenchmarkNames.map(name => {
              const explanation = getBenchmarkExplanation(name);
              return (
                <th
                  key={name}
                  className={getHeaderClass(name)}
                  onClick={() => handleSort(name)}
                  onMouseEnter={() => setHoveredBenchmark(name)}
                  onMouseLeave={() => setHoveredBenchmark(null)}
                >
                  <div className="relative">
                    {name} {renderSortIcon(name)}
                    {hoveredBenchmark === name && explanation && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-10 w-64 p-2 mt-1 text-sm bg-white border rounded-lg shadow-lg">
                        <p className="font-medium text-gray-900">{explanation.name}</p>
                        <p className="text-gray-600 mt-1">{explanation.description}</p>
                        <p className={clsx("mt-1", explanation.higherIsBetter ? 'text-green-600' : 'text-red-600')}>
                           {explanation.higherIsBetter ? '높을수록 좋음' : '낮을수록 좋음'}
                        </p>
                         <p className="text-blue-600 mt-1">이상적인 점수: {explanation.idealScore}</p>
                        <p className="text-gray-500 mt-1">적합한 경우: {explanation.useCase}</p>
                      </div>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedEvaluations.map((evaluation) => (
            <tr key={evaluation.model} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{evaluation.model}</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {evaluation.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </td>
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