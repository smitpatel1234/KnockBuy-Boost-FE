import type React from "react";
import type { Filter, Sort, MaxMinConstraints , PageParams, PaginationResponse } from "./pagination.types";
export interface ColumnConfig {
   title: string;
   key: string;
   filterKey?: string;
   sortable?: boolean;
   searchable?: boolean;
   searchByDate?: boolean;
   searchByNumber?: boolean;
}

export interface GenericTableType<T> {
   dataOfColumn: ColumnConfig[];
   data?: T[];
   loading?: boolean;
   filters?: Filter[];
   sorts?: Sort[];
   onEdit?: (row: T) => void;
   onDelete?: (row: T) => void;
   onSort?: (column: string) => void;
   onFilterChange?: (column: string, { value, upperBoundDate, lowerBoundDate, upperBoundNumber, lowerBoundNumber }: Omit<Filter, 'column'>) => void;
   columnRenderers?: Record<string, (value: string, row: T) => React.ReactNode>;
   constraints?: MaxMinConstraints[];
}
export interface UseTableProps<T> {
  fetchData: (params: PageParams) => Promise<PaginationResponse<T>>;
  dataOfColumn: ColumnConfig[];
  initialLimit?: number;
}
