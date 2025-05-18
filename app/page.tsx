import Header from '../components/Header'
import BenchmarkTabs from '@/components/BenchmarkTabs'
import { fetchModels } from '@/lib/fetchers'

export default async function Home() {
  const models = await fetchModels();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              AI Model Performance Comparison
            </h1>
            <BenchmarkTabs models={models} />
          </div>
        </div>
      </main>
    </div>
  )
} 