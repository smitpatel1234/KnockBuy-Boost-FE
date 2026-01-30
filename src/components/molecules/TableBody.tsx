import React from "react";
import {
  TableBody,
  TableRow,
  TableCell,
} from "@/components/atoms/Table";
import { Button } from "@/components/atoms/Button";
import {
  EditIcon,
  Trash2Icon,
  InboxIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { GenericTableType } from "@/types/generic-table.types";

interface TableBodyProps<T> {
  dataOfColumn: GenericTableType<T>['dataOfColumn'];
  data: T[];
  loading: boolean;
  columnRenderers?: GenericTableType<T>['columnRenderers'];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onDeleteClick: (row: T) => void;
}

function getCellDisplayValue<T>(cellValue: unknown, columnRenderer: ((value: string, row: T) => React.ReactNode) | undefined, row: T): React.ReactNode {
  if (columnRenderer) {
    const valueStr = typeof cellValue === 'string' || typeof cellValue === 'number' ? String(cellValue) : "";
    return columnRenderer(valueStr, row);
  }
  if (cellValue === null || cellValue === undefined) return "-";
  if (typeof cellValue === 'string' || typeof cellValue === 'number') return String(cellValue);
  return "[Object]";
}

function getIdString(id: unknown): string {
  if (typeof id === 'string') return id;
  if (typeof id === 'number') return String(id);
  return "unknown";
}

export function TableBodyComponent<T>({
  dataOfColumn,
  data,
  loading,
  columnRenderers,
  onEdit,
  onDelete,
  onDeleteClick,
}: Readonly<TableBodyProps<T>>) {
  const hasActions = onEdit ?? onDelete;
  const colsWithActions = dataOfColumn.length + (hasActions ? 1 : 0);
  
  const skeletonRows = Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={`skeleton-${String(i)}`} className="border-b border-slate-100 last:border-0">
      {dataOfColumn.map((col, index) => (<TableCell key={`skeleton-${String(i)}-${String(index)}`} className="py-4 px-6"><Skeleton className="h-4 w-[80%] bg-slate-100" /></TableCell>))}
      {hasActions ? (<TableCell className="py-4 px-6 text-right"><div className="flex justify-end gap-2"><Skeleton className="h-8 w-8 rounded-full bg-slate-100" /><Skeleton className="h-8 w-8 rounded-full bg-slate-100" /></div></TableCell>) : null}
    </TableRow>
  ));

  const emptyState = (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={colsWithActions} className="h-[300px] border-none">
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
  );

  const dataRows = data.map((row, rowIndex) => {
    const id = (row as Record<string, unknown>).id ?? "";
    const idString = getIdString(id);
    const rowKey = `row-${String(rowIndex)}-${idString}`;
    
    const editButton = onEdit ? (<Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100 shadow-sm" onClick={() => { onEdit(row); }} title="Edit"><EditIcon className="w-4 h-4" /></Button>) : null;
    const deleteButton = onDelete ? (<Button debounceMs={1000} size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100 shadow-sm" onClick={() => { onDeleteClick(row); }} title="Delete"><Trash2Icon className="w-4 h-4" /></Button>) : null;
    const actionsCell = hasActions ? (<TableCell className="py-4 px-6 text-right"><div className="flex justify-end gap-2.5">{editButton}{deleteButton}</div></TableCell>) : null;
    
    return (
      <React.Fragment key={rowKey}>
        <TableRow className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
          {dataOfColumn.map((col) => {
            const cellValue = (row as Record<string, unknown>)[col.key];
            const isNew = (row as Record<string, unknown>).isNew === true;
            const shouldShowNew = isNew && col.key === "order_id";
            const displayValue = getCellDisplayValue(cellValue, columnRenderers?.[col.key], row);
            return (
              <TableCell className="relative py-4 px-6 text-sm text-slate-700 font-medium" key={`${idString}-${col.key}`}>
                {shouldShowNew ? (<span className="absolute font-bold text-red-500 text-xs z-50 top-0 left-0">New!!</span>) : null}
                {displayValue}
              </TableCell>
            );
          })}
          {actionsCell}
        </TableRow>
      </React.Fragment>
    );
  });

  const getBodyContent = () => {
    if (loading) return skeletonRows;
    if (data.length > 0) return dataRows;
    return emptyState;
  };

  const bodyContent = getBodyContent();

  return <TableBody>{bodyContent}</TableBody>;
}
