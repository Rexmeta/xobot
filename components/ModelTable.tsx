'use client'; // 클라이언트 컴포넌트로 변경

import { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { ModelData } from '@/lib/types';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'; // 아이콘 추가
import clsx from 'clsx'; // 조건부 클래스 적용을 위한 라이브러리

interface ModelTableProps {
  data: ModelData[];
}

type SortField = keyof ModelData;

export default function ModelTable({ data }: ModelTableProps) {
  const [sortField, setSortField] = useState<SortField>('averageScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    } else if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return null; // 현재 정렬 필드가 아니면 아이콘 표시 안 함
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
        "text-primary-600": sortField === field, // 현재 정렬 필드 강조
      }
    );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={getHeaderClass('model')} onClick={() => handleSort('model')}>모델 {renderSortIcon('model')}</TableHead>
            <TableHead className={getHeaderClass('truthfulqa')} onClick={() => handleSort('truthfulqa')}>TruthfulQA {renderSortIcon('truthfulqa')}</TableHead>
            <TableHead className={getHeaderClass('mtbench')} onClick={() => handleSort('mtbench')}>MT Bench {renderSortIcon('mtbench')}</TableHead>
            <TableHead className={getHeaderClass('toxicity')} onClick={() => handleSort('toxicity')}>Toxicity ↓ {renderSortIcon('toxicity')}</TableHead>
            <TableHead className={getHeaderClass('hallucination')} onClick={() => handleSort('hallucination')}>Hallucination ↓ {renderSortIcon('hallucination')}</TableHead>
            <TableHead className={getHeaderClass('averageScore')} onClick={() => handleSort('averageScore')}>평균 점수 {renderSortIcon('averageScore')}</TableHead>
          </TableRow>
        </TableHeader>
      <TableBody>
        {sortedData.map((item) => (
          <TableRow key={item.model}>
            <TableCell className="font-medium">{item.model}</TableCell>
            <TableCell>{item.truthfulqa.toFixed(1)}</TableCell>
            <TableCell>{item.mtbench.toFixed(1)}/10</TableCell>
            <TableCell>{item.toxicity.toFixed(1)}%</TableCell>
            <TableCell>{item.hallucination.toFixed(1)}%</TableCell>
            <TableCell className="font-medium text-primary-600">{item.averageScore.toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
} 