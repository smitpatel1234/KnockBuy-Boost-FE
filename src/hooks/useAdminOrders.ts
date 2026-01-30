import { useState, useEffect, useCallback } from "react";
import { getAllOrders, deleteOrder } from "@/services/order.service";
import { toast } from "sonner";
import type { OrderAllType } from "@/types/order.types";

export const useAdminOrders = () => {
    const [data, setData] = useState<OrderAllType[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllOrders({
                page,
                limit: 10,
                search: filters.username || filters.order_id || "",
            });
            const responseData = res.data.data as { data?: OrderAllType[]; meta?: { lastPage?: number } } | OrderAllType[];
            setData(Array.isArray(responseData) ? responseData : (responseData.data ?? []));
            const pageNum = !Array.isArray(responseData) && responseData.meta?.lastPage ? responseData.meta.lastPage : 1;
            setTotalPages(typeof pageNum === 'number' ? pageNum : 1);
        } catch (error) {
            const errorMsg = (error as { response?: { data?: { message?: string } } }).response?.data?.message ?? "Failed to fetch orders";
            console.error(JSON.stringify(error));
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [page, filters]);

    useEffect(() => {
        void fetchOrders();
    }, [fetchOrders]);

    const handleDelete = async (orderId: string) => {
        try {
            await deleteOrder(orderId);
            toast.success("Order deleted successfully");
            void fetchOrders();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete order");
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    return {
        data,
        loading,
        filters,
        page,
        totalPages,
        setPage,
        handleFilterChange,
        handleDelete,
        refresh: fetchOrders
    };
};
