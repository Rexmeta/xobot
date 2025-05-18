'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ModelEvaluation, BenchmarkResult, BenchmarkExplanation } from '@/lib/types';

interface ModelChartProps {
  evaluations: ModelEvaluation[];
  benchmarkExplanations: BenchmarkExplanation[];
}

export default function ModelChart({ evaluations, benchmarkExplanations }: ModelChartProps) {
  const isLoading = evaluations.length === 0;

  if (isLoading) return <div>차트 데이터 로딩 중...</div>;

  const allBenchmarkNames = Array.from(new Set(
    evaluations.flatMap(evalItem => evalItem.benchmarks.map(b => b.name))
  ));

  const chartData = evaluations.map(model => {
    const dataPoint: { [key: string]: string | number } = { model: model.model };
    model.benchmarks.forEach(benchmark => {
      const explanation = benchmarkExplanations.find(exp => exp.name === benchmark.name);
      const higherIsBetter = explanation ? explanation.higherIsBetter : true;

      if (typeof benchmark.score === 'number') {
        let scoreValue = benchmark.score;

        if (!higherIsBetter) {
          scoreValue = 100 - scoreValue;
        }

        dataPoint[benchmark.name] = scoreValue;
      } else {
        dataPoint[benchmark.name] = 0;
      }
    });
    return dataPoint;
  });

  const benchmarkBars = allBenchmarkNames.map(name => {
    let color = '#6b7280';
    switch (name) {
      case 'TruthfulQA': color = '#4f46e5'; break;
      case 'MT Bench': color = '#16a34a'; break;
      case 'Toxicity': color = '#f97316'; break;
      case 'Hallucination': color = '#dc2626'; break;
      case 'MMLU': color = '#0ea5e9'; break;
      case 'HumanEval': color = '#a855f7'; break;
      case 'FID': color = '#4f46e5'; break;
      case 'IS': color = '#16a34a'; break;
      case 'CLIP Score': color = '#f97316'; break;
      case 'LPIPS': color = '#dc2626'; break;
    }
    return <Bar key={name} dataKey={name} fill={color} name={name} />;
  });

  return (
    <ResponsiveContainer width="100%" height={Math.max(400, evaluations.length * 50)}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
        <XAxis type="number" domain={[0, 100]} />
        <YAxis type="category" dataKey="model" tickLine={false} axisLine={false} width={90} />
        <Tooltip formatter={(value: number, name: string) => {
          const explanation = benchmarkExplanations.find(exp => exp.name === name);
          const higherIsBetter = explanation ? explanation.higherIsBetter : true;

          const firstModelBenchmark = evaluations[0]?.benchmarks.find(b => b.name === name);
          const unit = firstModelBenchmark?.unit || '';

          if (!higherIsBetter) {
            return `${(100 - value).toFixed(2)}${unit}`;
          }

          if (name === 'MT Bench') {
            return `${(value / 10).toFixed(1)}${unit}`;
          }
          return `${value.toFixed(2)}${unit}`;
        }} />
        <Legend />
        {benchmarkBars}
      </BarChart>
    </ResponsiveContainer>
  );
} 