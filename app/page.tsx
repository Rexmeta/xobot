import Header from '../components/Header'
import BenchmarkTabs from '../components/BenchmarkTabs'

// Sample data - in a real app, this would come from an API
const sampleData = [
  {
    name: 'GPT-4',
    truthfulQA: 88.1,
    mtBench: 9.6,
    toxicity: 3.1,
    hallucination: 7.2,
    averageScore: 93.7
  },
  {
    name: 'Claude 3',
    truthfulQA: 85.4,
    mtBench: 9.2,
    toxicity: 2.4,
    hallucination: 6.9,
    averageScore: 91.8
  },
  {
    name: 'LLaMA 3 70B',
    truthfulQA: 76.0,
    mtBench: 8.1,
    toxicity: 7.3,
    hallucination: 12.1,
    averageScore: 84.5
  },
  {
    name: 'Gemini 1.5',
    truthfulQA: 82.9,
    mtBench: 9.1,
    toxicity: 4.6,
    hallucination: 9.3,
    averageScore: 89.3
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              AI Model Performance Comparison
            </h1>
            <BenchmarkTabs data={sampleData} />
          </div>
        </div>
      </main>
    </div>
  )
} 