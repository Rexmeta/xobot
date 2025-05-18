import { useState } from 'react'

interface ModelData {
  name: string
  truthfulQA: number
  mtBench: number
  toxicity: number
  hallucination: number
  averageScore: number
}

interface ModelTableProps {
  data: ModelData[]
}

export default function ModelTable({ data }: ModelTableProps) {
  const [sortField, setSortField] = useState<keyof ModelData>('averageScore')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSort = (field: keyof ModelData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    return sortDirection === 'asc' 
      ? (aValue > bValue ? 1 : -1)
      : (aValue < bValue ? 1 : -1)
  })

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Model Name
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('truthfulQA')}
            >
              TruthfulQA
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('mtBench')}
            >
              MT Bench
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('toxicity')}
            >
              Toxicity ↓
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('hallucination')}
            >
              Hallucination ↓
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('averageScore')}
            >
              Average Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((model, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {model.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {model.truthfulQA.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {model.mtBench.toFixed(1)}/10
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {model.toxicity.toFixed(1)}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {model.hallucination.toFixed(1)}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                {model.averageScore.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 