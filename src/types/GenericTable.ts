import React from "react";
import { Sort } from "./pagination.type";

export type ColumnConfig = {
   title: string;
   key: string;
   filterKey?: string;
   sortable?: boolean;
   searchable?: boolean;
};

export type GenericTableType = {
   dataOfColumn: ColumnConfig[];
   data?: any[];
   loading?: boolean;
   filters?: Record<string, string>;
   sorts?: Sort[];
   onEdit?: (row: any) => void;
   onDelete?: (row: any) => void;
   onSort?: (column: string) => void;
   onFilterChange?: (column: string, value: string) => void;
   columnRenderers?: Record<string, (value: any, row: any) => React.ReactNode>;
};