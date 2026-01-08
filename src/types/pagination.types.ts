export interface Pagination {
  page: number;
  limit: number;
}

export interface Filter {
  column: string;
  value: string
}

export interface SearchFilter {
  between?: [number, number];
  column: string;
  eq?: boolean | number | string;
  gt?: number | string;
  in?: (number | string)[];
  like?: string;
  lt?: number | string;
}

export interface Sort {
  column: string;
  order: "ASC" | "DESC" | undefined;
}

export interface PageParams {
  pagination: Pagination;
  filters: Filter[];
  sort: Sort[];
}

export interface SearchPageParams {
  pagination: Pagination;
  filters: SearchFilter[];
  sort: Sort[];
}

export interface PaginationResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TableState {
  page: number;
  limit: number;
  filters: Record<string, string>;
  sort: {
    column: string;
    order: "ASC" | "DESC" | undefined;
  };
}