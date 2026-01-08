import { useState, useEffect, useCallback } from "react";
import { getOrderById, updateOrder } from "@/services/order.service";
import { toast } from "sonner";
import type { OrderDetail } from "@/types/order.types";

export const useAdminOrderDetails = (orderId: string) => {
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(false);

    const fetchOrder = useCallback(async () => {
        try {
            const res = await getOrderById(orderId);
            setOrder(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load order details");
        } finally {
            setLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        if (orderId) {
            void fetchOrder();
        }
    }, [fetchOrder, orderId]);

    const handleStatusChange = async (newStatus: string) => {
        if (!order) return;
        setStatusLoading(true);
        try {
            await updateOrder(order.order_id, { status: newStatus });
            toast.success(`Order status updated to ${newStatus}`);
            void fetchOrder();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        } finally {
            setStatusLoading(false);
        }
    };

    return {
        order,
        loading,
        statusLoading,
        handleStatusChange
    };
};
