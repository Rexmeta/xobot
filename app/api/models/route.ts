import { NextResponse } from 'next/server';
import { models } from '@/lib/data';

export async function GET() {
  return NextResponse.json(models);
} 