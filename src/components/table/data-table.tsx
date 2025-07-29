"use client";

//hooks
import { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table";

//shadcn components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

//icons
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [tableEntries, setTableEntries] = useState(10);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: tableEntries
      }
    }
  });

  useEffect(() => {
    table.setPageSize(tableEntries);
  }, [tableEntries, table]);

  const handleEntries = (value: string) => {
    setTableEntries(parseInt(value));
  };

  return (
    <div className="bg-table">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-muted-foreground bg-table-head text-left text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex h-15 items-center justify-end gap-2 rounded-b-sm border-t pe-2">
        <div>
          <Select defaultValue="10" onValueChange={handleEntries}>
            <SelectTrigger className="w-[130px] cursor-pointer !bg-transparent font-semibold !text-white !outline-none">
              <SelectValue placeholder="Entries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 Entries</SelectItem>
              <SelectItem value="25">25 Entries</SelectItem>
              <SelectItem value="50">50 Entries</SelectItem>
              <SelectItem value="100">100 Entries</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button
            variant="ghost"
            className="border-border cursor-pointer gap-2 rounded-none rounded-l-lg border-r px-6"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer gap-2 rounded-none rounded-r-lg px-6"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
