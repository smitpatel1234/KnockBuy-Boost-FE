
export type Pagination = {
  page: number;
  limit: number;
};

export type Filter = {
  column: string;
  value: string;
};

export type Sort = {
  column: string;
  order: "ASC" | "DESC" | undefined;
};

export type PageParams = {
  pagination: Pagination;
  filters: Filter[];
  sort: Sort[];
};

export interface PaginationResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Helper type for the useTable hook
export type TableState = {
  page: number;
  limit: number;
  filters: Record<string, string>;
  sort: {
    column: string;
    order: "ASC" | "DESC" | undefined;
  };
};