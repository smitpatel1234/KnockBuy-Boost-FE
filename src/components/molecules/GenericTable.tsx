"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/atoms/Table";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  EditIcon,
  Trash2Icon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SearchIcon,
  InboxIcon,
} from "lucide-react";
import { GenericTableType } from "@/types/GenericTable";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function GenericTable({
  dataOfColumn,
  data,
  loading = false,
  filters = {},
  sorts,
  onEdit,
  onDelete,
  onSort,
  onFilterChange,
  columnRenderers,
}: GenericTableType) {
  const [deleteId, setDeleteId] = useState<any | null>(null);

  const handleDeleteClick = (row: any) => {
    setDeleteId(row);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete?.(deleteId);
      setDeleteId(null);
    }
  };

  const renderSortIcon = (columnKey: string) => {
    const sortIndex = sorts?.findIndex(s => s.column === columnKey) ?? -1;
    const sortItem = sortIndex !== -1 ? sorts?.[sortIndex] : null;

    if (!sortItem) {
      return <ArrowUpDownIcon className="ml-2 w-3.5 h-3.5 opacity-30 hover:opacity-100 transition-opacity" />;
    }

    const priorityNumber = sorts && sorts.length > 1 ? sortIndex + 1 : null;

    return (
      <div className="flex items-center ml-2 gap-0.5">
        {sortItem.order === "ASC" ? (
          <ArrowUpIcon className="w-3.5 h-3.5 text-primary" />
        ) : (
          <ArrowDownIcon className="w-3.5 h-3.5 text-primary" />
        )}
        {priorityNumber && (
          <span className="text-[10px] font-bold text-primary">{priorityNumber}</span>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
      <div className="overflow-x-auto overflow-y-hidden">
        <Table className="w-full border-collapse">
          {/* ---------- HEADER ---------- */}
          <TableHeader className="bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200">
            <TableRow className="hover:bg-transparent border-none">
              {dataOfColumn.map((col) => (
                <TableHead className="py-4 px-6 align-bottom min-w-[150px]" key={col.key}>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      disabled={!col.sortable}
                      className={cn(
                        "flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider transition-colors group",
                        col.sortable ? "cursor-pointer hover:text-slate-900" : "cursor-default"
                      )}
                      onClick={() => col.sortable && onSort?.(col.key)}
                    >
                      {col.title}
                      {col.sortable && renderSortIcon(col.key)}
                    </button>

                    {col.searchable && (
                      <div className="relative group/input max-w-[180px]">
                        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-hover/input:text-slate-600 transition-colors" />
                        <Input
                          type="text"
                          placeholder="Search..."
                          className="h-8 pl-9 pr-3 text-xs bg-white/50 border-slate-200 hover:border-slate-300 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all rounded-md shadow-none"
                          value={filters[col.key] || ""}
                          onChange={(e) => onFilterChange?.(col.key, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
              {(onEdit || onDelete) && (
                <TableHead className="py-4 px-6 font-bold text-slate-500 uppercase tracking-wider text-xs align-bottom text-right">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`} className="border-b border-slate-100 last:border-0">
                  {dataOfColumn.map((col, index) => (
                    <TableCell key={`skeleton-${i}-${index}`} className="py-4 px-6">
                      <Skeleton className="h-4 w-[80%] bg-slate-100" />
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-8 rounded-full bg-slate-100" />
                        <Skeleton className="h-8 w-8 rounded-full bg-slate-100" />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow
                  className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0"
                  key={row.id || rowIndex}
                >
                  {dataOfColumn.map((col) => (
                    <TableCell className="py-4 px-6 text-sm text-slate-700 font-medium" key={`${row.id || rowIndex}-${col.key}`}>
                      {columnRenderers?.[col.key]
                        ? columnRenderers[col.key](row[col.key], row)
                        : (row[col.key] === null || row[col.key] === undefined) ? '-' : String(row[col.key])}
                    </TableCell>
                  ))}

                  {(onEdit || onDelete) && (
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2.5">
                        {onEdit && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100 shadow-sm"
                            onClick={() => onEdit(row)}
                            title="Edit"
                          >
                            <EditIcon className="w-4 h-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-full hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100 shadow-sm"
                            onClick={() => handleDeleteClick(row)}
                            title="Delete"
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={dataOfColumn.length + (onEdit || onDelete ? 1 : 0)} className="h-[300px] border-none">
                  <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                    <div className="p-4 rounded-full bg-slate-50 border border-slate-100 shadow-inner">
                      <InboxIcon className="w-10 h-10 opacity-20" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-500">No results found</p>
                      <p className="text-xs text-slate-400">Try adjusting your filters or search terms.</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmationDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this record? This action is permanent and cannot be undone."
      />
    </div>
  );
}
