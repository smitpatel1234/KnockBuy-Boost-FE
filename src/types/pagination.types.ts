export interface Pagination {
  page: number;
  limit: number;
}

export interface Filter {
  column: string;
  value?: string;
  isSearchByNumber?: boolean;
  isSearchByDate?: boolean;
  upperBoundDate?: string
  lowerBoundDate?: string
  upperBoundNumber?: number
  lowerBoundNumber?: number
}

export interface SearchFilter {
  between?: [number, number];
  column: string;
  eq?: boolean | number | string;
  gt?: number | string;
  in?: (number | string)[];
  like?: string;
  lt?: number | string;
  isSearchByNumber?: boolean;
  isSearchByDate?: boolean;
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
    limit: number;
    page: number;
    total: number;
    totalPages: number;
    constraints: MaxMinConstraints[];
  };
}
export interface MaxMinConstraints {
  column: string;
  max: number | string;
  min: number | string;
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