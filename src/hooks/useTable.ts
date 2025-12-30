"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import { PageParams, PaginationResponse, Sort, Filter } from "../types/pagination.type";
import { ColumnConfig } from "../types/GenericTable";
interface UseTableProps<T> {
    fetchData: (params: PageParams) => Promise<number>;
    dataOfColumn: ColumnConfig[];
    initialLimit?: number;
}

export const useTable = <T>({ fetchData, dataOfColumn, initialLimit = 10 }: UseTableProps<T>) => {
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(initialLimit);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [localFilters, setLocalFilters] = useState<Record<string, string>>({});
    const [sorts, setSorts] = useState<Sort[]>([]);
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const formattedFilters: Filter[] = Object.entries(filters)
                .filter(([, value]) => value !== "")
                .map(([key, value]) => {
                    const col = dataOfColumn.find(c => c.key === key);
                    return {
                        column: col?.filterKey || key,
                        value
                    };
                });

            const formattedSorts: Sort[] = sorts
                .filter(s => s.order !== undefined)
                .map(s => ({
                    column: dataOfColumn.find(c => c.key === s.column)?.filterKey || s.column,
                    order: s.order
                }));

            const params: PageParams = {
                pagination: { page, limit },
                filters: formattedFilters,
                sort: formattedSorts,
            };

               const totalentry = await fetchData(params);
              setTotal(totalentry);
        } catch (error) {
            console.error("Error fetching table data:", error);
        } finally {
            setLoading(false);
        }
    }, [fetchData, dataOfColumn, page, limit, filters, sorts]);

    const debouncedSetFilters = useMemo(
        () => debounce((newFilters: Record<string, string>) => {
            setFilters(newFilters);
            setPage(1);
        }, 500),
        []
    );

    useEffect(() => {
        console.log("Filters changed:");
        loadData();
    }, [loadData]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    const handleFilterChange = (column: string, value: string) => {
        const nextFilters = { ...localFilters, [column]: value };
        setLocalFilters(nextFilters);
        debouncedSetFilters(nextFilters);
    };

    const handleSort = (column: string) => {
        setSorts(prev => {
            const existingIndex = prev.findIndex(s => s.column === column);

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
    };
};
