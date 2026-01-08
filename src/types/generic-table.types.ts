import type React from "react";
import type { Sort } from "./pagination.types";

export interface ColumnConfig {
   title: string;
   key: string;
   filterKey?: string;
   sortable?: boolean;
   searchable?: boolean;
}

export interface GenericTableType<T> {
   dataOfColumn: ColumnConfig[];
   data?: T[];
   loading?: boolean;
   filters?: Record<string, string>;
   sorts?: Sort[];
   onEdit?: (row: T) => void;
   onDelete?: (row: T) => void;
   onSort?: (column: string) => void;
   onFilterChange?: (column: string, value: string) => void;
   columnRenderers?: Record<string, (value: string, row: T) => React.ReactNode>;
}