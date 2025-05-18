import { useState } from 'react'
import ModelTable from './ModelTable'
import ModelChart from './ModelChart'

interface ModelData {
  name: string
  truthfulQA: number
  mtBench: number
  toxicity: number
  hallucination: number
  averageScore: number
}

interface BenchmarkTabsProps {
  data: ModelData[]
}

export default function BenchmarkTabs({ data }: BenchmarkTabsProps) {
  const [activeTab, setActiveTab] = useState<'table' | 'chart'>('table')

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('table')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'table'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Table View
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'chart'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            Chart View
          </button>
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === 'table' ? (
          <ModelTable data={data} />
        ) : (
          <ModelChart data={data} />
        )}
      </div>
    </div>
  )
} 