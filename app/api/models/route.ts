import { NextResponse } from 'next/server';
import { evaluations } from '@/lib/data';

export async function GET() {
  return NextResponse.json(evaluations);
} 