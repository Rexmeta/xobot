'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ModelEvaluation, BenchmarkResult } from '@/lib/types';

interface ModelChartProps {
  evaluations: ModelEvaluation[];
}

export default function ModelChart({ evaluations }: ModelChartProps) {
  const chartBenchmarkNames = ['TruthfulQA', 'MT Bench', 'Toxicity', 'Hallucination', 'MMLU', 'HumanEval'];

  const chartData = evaluations.map(evaluation => {
    const dataPoint: { [key: string]: string | number } = { model: evaluation.model };
    evaluation.benchmarks.forEach(benchmark => {
      if (chartBenchmarkNames.includes(benchmark.name) && typeof benchmark.score === 'number') {
        dataPoint[benchmark.name] = benchmark.score;
      }
    });
    return dataPoint;
  });

  const benchmarkColors: { [key: string]: string } = {
    'TruthfulQA': '#4f46e5',
    'MT Bench': '#16a34a',
    'Toxicity': '#f97316',
    'Hallucination': '#dc2626',
    'MMLU': '#0ea5e9',
    'HumanEval': '#6366f1',
  };

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="model" />
          <YAxis />
          <Tooltip />
          <Legend />
          {chartBenchmarkNames.map(name => {
            if (chartData.some(dataPoint => typeof dataPoint[name] === 'number')) {
               return <Bar key={name} dataKey={name} fill={benchmarkColors[name] || '#cccccc'} name={name} />;
            }
            return null;
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 