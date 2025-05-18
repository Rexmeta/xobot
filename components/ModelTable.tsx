import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { ModelData } from '@/lib/types';

interface ModelTableProps {
  data: ModelData[];
}

export default function ModelTable({ data }: ModelTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>모델</TableHead>
          <TableHead>TruthfulQA</TableHead>
          <TableHead>MT Bench</TableHead>
          <TableHead>Toxicity ↓</TableHead>
          <TableHead>Hallucination ↓</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.model}>
            <TableCell>{item.model}</TableCell>
            <TableCell>{item.truthfulqa}</TableCell>
            <TableCell>{item.mtbench}</TableCell>
            <TableCell>{item.toxicity}%</TableCell>
            <TableCell>{item.hallucination}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 