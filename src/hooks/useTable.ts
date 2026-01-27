"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import type {
  PageParams,
  Sort,
  Filter,
  PaginationResponse,
  MaxMinConstraints,
} from "../types/pagination.types";
import type { ColumnConfig } from "../types/generic-table.types";
import { DateToTime } from "@/utils/common/formatDate";

interface UseTableProps<T> {
  fetchData: (params: PageParams) => Promise<PaginationResponse<T>>;
  dataOfColumn: ColumnConfig[];
  initialLimit?: number;
}

export const useTable = <T>({
  fetchData,
  dataOfColumn,
  initialLimit = 10,
}: UseTableProps<T>) => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [localFilters, setLocalFilters] = useState<Filter[]>([]);
  const [sorts, setSorts] = useState<Sort[]>([]);
  const [constraints, setConstraints] = useState<MaxMinConstraints[]>([]);

  const formattedFilters: Filter[] = useMemo(() => {
    if (!filters.length) {
      return filters.concat(
        ...dataOfColumn.map((col) => {
          return {
            isSearchByDate: col?.searchByDate,
            isSearchByNumber: col?.searchByNumber,
            column: col?.filterKey ?? col.key,
          };
        }),
      );
    }
    return filters
      .filter(
        (v) =>
          v.value !== "" ||
          v.lowerBoundDate ||
          v.upperBoundDate ||
          v.lowerBoundNumber ||
          v.upperBoundNumber ||
          v.isSearchByNumber ||
          v.isSearchByDate,
      )
      .map((v) => {
        const col = dataOfColumn.find(
          (c) => c.key === v.column || c.searchByDate || c.searchByNumber,
        );
        return {
          ...v,
          lowerBoundDate: DateToTime(v.lowerBoundDate),
          upperBoundDate: DateToTime(v.upperBoundDate),
          isSearchByDate: col?.searchByDate,
          isSearchByNumber: col?.searchByNumber,
          column: col?.filterKey ?? v.column,
        };
      });
  }, [filters, dataOfColumn]);

  const formattedSorts: Sort[] = useMemo(() => {
    return sorts
      .filter((s) => s.order !== undefined)
      .map((s) => ({
        column:
          dataOfColumn.find((c) => c.key === s.column)?.filterKey ?? s.column,
        order: s.order,
      }));
  }, [sorts, dataOfColumn]);

  const params: PageParams = useMemo(
    () => ({
      pagination: { page, limit },
      filters: formattedFilters,
      sort: formattedSorts,
    }),
    [page, limit, formattedFilters, formattedSorts],
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchData(params);
      setTotal(response.meta.total);
      if (response.meta.constraints) {
        setConstraints(response.meta.constraints);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      setLoading(false);
    }
  }, [params, fetchData]);

  const debouncedSetFilters = useMemo(
    () =>
      debounce((newFilters: Filter[]) => {
        setFilters(newFilters);
        setPage(1);
      }, 500),
    [],
  );

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleFilterChange = (
    column: string,
    filterData: Omit<Filter, "column">,
  ) => {
    let index = localFilters.findIndex((v) => v.column === column);
    let nextFilters: Filter[];

    if (index !== -1) {
      nextFilters = [...localFilters];
      nextFilters[index] = { ...nextFilters[index], ...filterData };
    } else {
      nextFilters = [...localFilters, { column, ...filterData }];
    }

    setLocalFilters(nextFilters);
    debouncedSetFilters(nextFilters);
  };

  const handleSort = (column: string) => {
    setSorts((prev) => {
      const existingIndex = prev.findIndex((s) => s.column === column);

      if (existingIndex !== -1) {
        const existing = prev[existingIndex];
        const newSorts = [...prev];

        if (existing.order === "ASC") {
          newSorts[existingIndex] = { column, order: "DESC" };
        } else if (existing.order === "DESC") {
          newSorts.splice(existingIndex, 1);
        }

        return newSorts;
      } else {
        return [...prev, { column, order: "ASC" }];
      }
    });
    setPage(1);
  };

  return {
    loading,
    total,
    page,
    limit,
    filters: localFilters,
    sorts,
    handlePageChange,
    handleLimitChange,
    handleFilterChange,
    handleSort,
    refresh: loadData,
    constraints,
  };
};
