import React from "react";
import {
  Table,
} from "@/components/atoms/Table";
import type { GenericTableType } from "@/types/generic-table.types";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";
import { useTableDelete } from "@/hooks/useTableDelete";
import {
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import { TableHeaderRow } from "./TableHeader";
import { TableBodyComponent } from "./TableBody";

interface SortItem {
  column: string;
  order: "ASC" | "DESC" | undefined;
}

function renderSortIcon(columnKey: string, sorts?: SortItem[]) {
  const sortIndex = sorts?.findIndex((s) => s.column === columnKey) ?? -1;
  const sortItem = sortIndex === -1 ? null : sorts?.[sortIndex];

  if (!sortItem) {
    return (
      <ArrowUpDownIcon className="ml-2 w-3.5 h-3.5 opacity-30 hover:opacity-100 transition-opacity" />
    );
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
        <span className="text-[10px] font-bold text-primary">
          {priorityNumber}
        </span>
      )}
    </div>
  );
}

export default function GenericTable<T>({
  dataOfColumn,
  data,
  loading = false,
  filters,
  sorts,
  onEdit,
  onDelete,
  onSort,
  onFilterChange,
  columnRenderers,
  constraints = [],
}: Readonly<GenericTableType<T>>) {
  const { deleteId, handleDeleteClick, setDeleteId } = useTableDelete();

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete?.(deleteId as T);
      setDeleteId(null);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
      <div className="overflow-x-auto overflow-y-hidden">
        <Table className="w-full border-collapse">
          <TableHeaderRow
            dataOfColumn={dataOfColumn}
            sorts={sorts}
            filters={filters}
            constraints={constraints}
            onSort={onSort}
            onFilterChange={onFilterChange}
            renderSortIcon={renderSortIcon}
            onEdit={onEdit}
            onDelete={onDelete}
          />

          <TableBodyComponent
            dataOfColumn={dataOfColumn}
            data={data ?? []}
            loading={loading}
            columnRenderers={columnRenderers}
            onEdit={onEdit}
            onDelete={onDelete}
            onDeleteClick={handleDeleteClick as (row: T) => void}
          />
        </Table>
      </div>

      <ConfirmationDialog
        isOpen={!!deleteId}
        onClose={() => {
          setDeleteId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this record? This action is permanent and cannot be undone."
      />
    </div>
  );
}
