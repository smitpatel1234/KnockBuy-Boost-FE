"use client";

import React from "react";
import GenericTable from "@/components/molecules/GenericTable";
import Pagination from "@/components/molecules/Pagination";
import type { ColumnConfig } from "@/types/generic-table.types";
import { useTable } from "@/hooks/useTable";
import type { PageParams, PaginationResponse } from "@/types/pagination.types";

interface TableWithFilterProps<T> {
  data: Partial<T>[],
  dataOfColumn: ColumnConfig[];
  fetchData: (params: PageParams) => Promise<PaginationResponse<T>>;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  columnRenderers?: Record<string, (value: string | number | null | undefined, row: T) => React.ReactNode>;
  initialLimit?: number;
}

export default function TableWithFilter<T>({
  data,
  dataOfColumn,
  fetchData,
  onEdit,
  onDelete,
  columnRenderers,
  initialLimit = 10,
}: Readonly<TableWithFilterProps<T>>) {
  const {

    loading,
    total,
    page,
    limit,
    filters,
    sorts,
    handlePageChange,
    handleLimitChange,
    handleFilterChange,
    handleSort,
    constraints,
  } = useTable<T>({ fetchData, dataOfColumn, initialLimit });

  return (
    <div className="flex flex-col gap-2">
      <div className={`transition-opacity duration-300`}>
        <GenericTable
          dataOfColumn={dataOfColumn}
          data={data as T[]}
          loading={loading}
          filters={filters}
          sorts={sorts}
          onEdit={onEdit}
          onDelete={onDelete}
          onSort={handleSort}
          onFilterChange={handleFilterChange}
          columnRenderers={columnRenderers}
          constraints={constraints}
        />
      </div>

      <Pagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}
