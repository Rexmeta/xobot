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

interface ModelData {
  name: string
  truthfulQA: number
  mtBench: number
  toxicity: number
  hallucination: number
  averageScore: number
}

interface ModelChartProps {
  data: ModelData[]
}

export default function ModelChart({ data }: ModelChartProps) {
  const chartData = data.map(model => ({
    name: model.name,
    'TruthfulQA': model.truthfulQA,
    'MT Bench': model.mtBench,
    'Toxicity': model.toxicity,
    'Hallucination': model.hallucination,
    'Average': model.averageScore
  }))

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TruthfulQA" fill="#0ea5e9" />
          <Bar dataKey="MT Bench" fill="#10b981" />
          <Bar dataKey="Toxicity" fill="#ef4444" />
          <Bar dataKey="Hallucination" fill="#f59e0b" />
          <Bar dataKey="Average" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 