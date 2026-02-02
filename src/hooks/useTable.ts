"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import type {
  PageParams,
  Sort,
  Filter,
  MaxMinConstraints,
} from "../types/pagination.types";
import type { UseTableProps } from "../types/generic-table.types";
import { DateToTime } from "@/utils/common/formatDate";

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
    const baseFilters: Filter[] = dataOfColumn
      .filter((col) => col.searchByDate ?? col.searchByNumber)
      .map((col) => ({
        isSearchByDate: col.searchByDate,
        isSearchByNumber: col.searchByNumber,
        column: col.filterKey ?? col.key,
      }));

    if (!filters.length) {
      return baseFilters;
    }

    const activeFilters = filters
      .filter(
        (v) =>
          v.value !== "" ||
          v.lowerBoundDate != null ||
          v.upperBoundDate != null ||
          v.lowerBoundNumber != null ||
          v.upperBoundNumber != null,
      )
      .map((v) => {
        const col = dataOfColumn.find(
          (c) => c.key === v.column || c.filterKey === v.column,
        );

        return {
          ...v,
          lowerBoundDate: v.lowerBoundDate? DateToTime(v.lowerBoundDate) : undefined,
          upperBoundDate: v.upperBoundDate? DateToTime(v.upperBoundDate): undefined,
          isSearchByDate: col?.searchByDate,
          isSearchByNumber: col?.searchByNumber,
          column: col?.filterKey ?? v.column,
        };
      });
    return [...activeFilters, ...baseFilters.map((bf) => {
      if (!activeFilters.some((af) => af.column === bf.column)) {return bf;}
      return null;
    }).filter(Boolean) as Filter[]];
  }, [filters, dataOfColumn]);

  const formattedSorts: Sort[] = useMemo(() => {
    return sorts
      .filter((s) => s.order !== undefined)
      .map((s) => ({column:dataOfColumn.find((c) => c.key === s.column)?.filterKey ?? s.column, order: s.order, }));
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
      setConstraints(response.meta.constraints);
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      setLoading(false);
    }
  }, [params, fetchData]);

  const debouncedSetFilters = useMemo(
    () =>debounce((newFilters: Filter[]) => {
        setFilters(newFilters);
        setPage(1);}, 500),[]);
  useEffect(() => {
    return () => {
      debouncedSetFilters.cancel();
    };
  }, [debouncedSetFilters]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);};

  const handleFilterChange = (
    column: string,
    filterData: Omit<Filter, "column">,
  ) => {
    const index = localFilters.findIndex((v) => v.column === column);
    let nextFilters: Filter[];
    if (index === -1) {
      nextFilters = [...localFilters, { column, ...filterData }];
    } else {
      nextFilters = [...localFilters];
      nextFilters[index] = { ...nextFilters[index], ...filterData };
    }
   setLocalFilters(nextFilters);
    debouncedSetFilters(nextFilters);
  };

  const handleSort = (column: string) => {
    setSorts((prev) => {
      const existingIndex = prev.findIndex((s) => s.column === column);

      if (existingIndex === -1) {return [...prev, { column, order: "ASC" }];}

      const existing = prev[existingIndex];
      const newSorts = [...prev];

      if (existing.order === "ASC") {
        newSorts[existingIndex] = { column, order: "DESC" };
      } else {
        newSorts.splice(existingIndex, 1);
      }

      return newSorts;
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
