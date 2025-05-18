"use client";

import useSWR from "swr";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { ProviderSummary } from '@/lib/types'; // Import the type

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProviderModelTable() {
  const { data: providers, isLoading } = useSWR<ProviderSummary[]>("/api/providers", fetcher);

  if (isLoading) return <div>불러오는 중...</div>;
  if (!providers) return <div>데이터 없음</div>; // Handle no data case

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>제공업체</TableHead>
          <TableHead>보유 모델</TableHead>
          <TableHead>최신 모델</TableHead>
          <TableHead>업데이트 일자</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {providers.map((item) => (
          <TableRow key={item.provider}>
            <TableCell>{item.provider}</TableCell>
            <TableCell>{item.models.join(", ")}</TableCell>
            <TableCell>{item.latest}</TableCell>
            <TableCell>{item.updated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 