"use client";

import useSWR from 'swr';
import Header from '@/components/Header';
import ModelTabs from '@/components/ModelTabs'; // Reuse ModelTabs component
import { ModelEvaluation, BenchmarkExplanation, UseCasePreset } from '@/lib/types';

// Import hardcoded explanations and presets for now
// Ideally, these would be fetched from the API or a central source
import { benchmarkExplanations as llmExplanations, useCasePresets as llmPresets } from '@/lib/data';
import { imageBenchmarkExplanations as imageExplanations, imageUseCasePresets as imagePresets } from '@/lib/image-data';
import { videoBenchmarkExplanations as videoExplanations, videoUseCasePresets as videoPresets } from '@/lib/video-data';
import { audioBenchmarkExplanations as audioExplanations, audioUseCasePresets as audioPresets } from '@/lib/audio-data';


const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ModelsComparisonPage() {
  // Fetch models data from respective API endpoints
  const { data: llmModels, error: llmError } = useSWR<ModelEvaluation[]>('/api/models', fetcher);
  const { data: imageModels, error: imageError } = useSWR<ModelEvaluation[]>('/api/image-models', fetcher);
  const { data: videoModels, error: videoError } = useSWR<ModelEvaluation[]>('/api/video-models', fetcher);
  const { data: audioModels, error: audioError } = useSWR<ModelEvaluation[]>('/api/audio-models', fetcher);


  if (llmError || imageError || videoError || audioError) return <div>데이터 로딩 실패</div>;
  if (!llmModels || !imageModels || !videoModels || !audioModels) return <div>데이터 로딩 중...</div>;

  // Combine all models and data
  const allModels: ModelEvaluation[] = [
    ...(llmModels || []),
    ...(imageModels || []),
    ...(videoModels || []),
    ...(audioModels || []),
  ];

  const allExplanations: BenchmarkExplanation[] = [
    ...(llmExplanations || []),
    ...(imageExplanations || []),
    ...(videoExplanations || []),
    ...(audioExplanations || []),
  ];

   const allPresets: UseCasePreset[] = [
    ...(llmPresets || []),
    ...(imagePresets || []),
    ...(videoPresets || []),
    ...(audioPresets || []),
  ];

  // Select a default use case or implement cross-type sorting logic
  const defaultUseCase = allPresets.length > 0 ? allPresets[0].id : '';


  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">AI 모델 종합 비교</h1>
        {/* Pass combined data and a selected use case to ModelTabs */}
        <ModelTabs
          evaluations={allModels}
          benchmarkExplanations={allExplanations}
          useCasePresets={allPresets}
          selectedUseCase={defaultUseCase} // Pass a selected use case for sorting
        />
      </main>
    </div>
  );
} 