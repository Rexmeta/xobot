import { ModelEvaluation } from '@/lib/types';

export async function fetchModels(): Promise<ModelEvaluation[]> {
  const res = await fetch('/api/models');
  if (!res.ok) {
    throw new Error('Failed to fetch models');
  }
  return res.json();
} 