import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { ModelData } from '@/lib/types'

interface ModelChartProps {
  data: ModelData[]
}

export default function ModelChart({ data }: ModelChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="model" />
          <Tooltip />
          <Bar dataKey="truthfulqa" fill="#4f46e5" name="TruthfulQA" />
          <Bar dataKey="mtbench" fill="#16a34a" name="MT Bench" />
          <Bar dataKey="toxicity" fill="#f97316" name="Toxicity" />
          <Bar dataKey="hallucination" fill="#dc2626" name="Hallucination" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 