"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ModelTable from "@/components/ModelTable";
import ModelChart from "@/components/ModelChart";
import { ModelData } from '@/lib/types';

interface BenchmarkTabsProps {
  models: ModelData[];
}

export default function BenchmarkTabs({ models }: BenchmarkTabsProps) {
  return (
    <Tabs defaultValue="table">
      <TabsList className="mb-4">
        <TabsTrigger value="table">표 형식</TabsTrigger>
        <TabsTrigger value="chart">그래프 형식</TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <Card>
          <CardContent className="p-4">
            <ModelTable data={models} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="chart">
        <Card>
          <CardContent className="p-4 h-[400px]">
            <ModelChart data={models} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
} 