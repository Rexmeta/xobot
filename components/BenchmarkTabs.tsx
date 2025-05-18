"use client";

import { useState } from 'react';
import ModelTable from "./ModelTable";
import ModelChart from "./ModelChart";
import { ModelEvaluation } from '@/lib/types';
import clsx from 'clsx';

interface BenchmarkTabsProps {
  evaluations: ModelEvaluation[];
}

export default function BenchmarkTabs({ evaluations }: BenchmarkTabsProps) {
  const [activeTab, setActiveTab] = useState<'table' | 'chart'>('table');

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('table')}
            className={clsx(
              `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out`,
              activeTab === 'table'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            표 형식
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={clsx(
               `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out`,
              activeTab === 'chart'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            그래프 형식
          </button>
        </nav>
      </div>

      <div className="mt-4">
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'table' ? (
            <ModelTable evaluations={evaluations} />
          ) : (
            <ModelChart evaluations={evaluations} />
          )}
        </div>
      </div>
    </div>
  );
} 