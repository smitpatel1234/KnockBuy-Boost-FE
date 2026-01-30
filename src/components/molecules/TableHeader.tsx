import React from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/atoms/Table";
import { Input } from "@/components/atoms/Input";
import {
  SearchIcon,
  CircleX,
} from "lucide-react";
import { DateRangePicker } from "./DateRangePicker";
import { formatDate } from "@/utils/common/formatDate";
import SliderRange from "./SliderRange";
import type { GenericTableType } from "@/types/generic-table.types";
import { cn } from "@/lib/utils";

interface TableHeaderRowProps<T> {
  dataOfColumn: GenericTableType<T>['dataOfColumn'];
  sorts: GenericTableType<T>['sorts'];
  filters: GenericTableType<T>['filters'];
  constraints: GenericTableType<T>['constraints'];
  onSort?: (key: string) => void;
  onFilterChange?: (key: string, filter: Record<string, unknown>) => void;
  renderSortIcon: (columnKey: string, sorts?: GenericTableType<T>['sorts']) => React.ReactNode;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function TableHeaderRow<T>({
  dataOfColumn,
  sorts,
  filters,
  constraints,
  onSort,
  onFilterChange,
  renderSortIcon,
  onEdit,
  onDelete,
}: Readonly<TableHeaderRowProps<T>>) {
  return (
    <TableHeader className="bg-slate-50/80 backdrop-blur-sm sticky top-0 border-b border-slate-200">
      <TableRow className="max-h-[10vh] hover:bg-transparent border-none">
        {dataOfColumn.map((col) => (
          <TableHead className="py-4 px-6 align-bottom max-w-[180px]" key={col.key}>
            <div className="flex flex-col gap-3">
              <button type="button" disabled={!col.sortable} className={cn("flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider transition-colors group", col.sortable ? "cursor-pointer hover:text-slate-900" : "cursor-default")} onClick={() => col.sortable && onSort?.(col.key)}>
                {col.title}
                {col.sortable && renderSortIcon(col.key, sorts)}
              </button>

              {col.searchable && (
                <div className="relative group/input max-w-[180px]">
                  <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-hover/input:text-slate-600 transition-colors" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="h-8 pl-9 pr-3 text-xs bg-white/50 border-slate-200 hover:border-slate-300 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all rounded-md shadow-none"
                    value={filters?.find((v) => v.column === col.key)?.value ?? ""}
                    onChange={(e) => onFilterChange?.(col.key, { value: e.target.value })}
                  />
                </div>
              )}
              {col.searchByDate && (
                <div className="relative group/input max-w-[200px]">
                  <div className="mt-1 flex flex-row center">
                    <DateRangePicker
                      onUpdate={(values) => {
                        onFilterChange?.(col.key, {
                          lowerBoundDate: formatDate(values.range.from),
                          upperBoundDate: formatDate(values.range.to),
                        });
                      }}
                      initialDateFrom="2023-01-01"
                      initialDateTo="2023-12-31"
                      align="center"
                      locale="en-IN"
                      showCompare={false}
                    />
                    <CircleX size={32} onClick={() => onFilterChange?.(col.key, { lowerBoundDate: undefined, upperBoundDate: undefined })} />
                  </div>
                </div>
              )}
              {col.searchByNumber && (
                <div className="relative group/input max-w-[200px]">
                  <SliderRange
                    min={(constraints ?? []).find((c) => c.column === col.key || c.column === col.filterKey)?.min ? Number((constraints ?? []).find((c) => c.column === col.key || c.column === col.filterKey)?.min) : undefined}
                    max={(constraints ?? []).find((c) => c.column === col.key || c.column === col.filterKey)?.max ? Number((constraints ?? []).find((c) => c.column === col.key || c.column === col.filterKey)?.max) : undefined}
                    onChange={(e) => onFilterChange?.(col.key, { lowerBoundNumber: e[0], upperBoundNumber: e[1] })}
                  />
                </div>
              )}
            </div>
          </TableHead>
        ))}
        {onEdit || onDelete ? (<TableHead className="py-4 px-6 font-bold text-slate-500 uppercase tracking-wider text-xs align-bottom text-right">Actions</TableHead>) : null}
      </TableRow>
    </TableHeader>
  );
}
