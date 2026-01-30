'use client';

import React, { useState, useCallback } from "react";
import TableWithFilter from "@/components/organisms/TableWithFilter";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ORDER_COLUMNS, STATUS_COLORS } from "@/data/order.data";
import { getAllOrders, deleteOrder } from "@/services/order.service";
import type { OrderAllType } from "@/types/order.types";
import type { PageParams, PaginationResponse } from "@/types/pagination.types";
import { toast } from "sonner";
import { formatDate } from "@/utils/common/formatDate";

export default function OrderTemplate() {
    const router = useRouter();
    const [data, setData] = useState<OrderAllType[]>([]);
    const fetchOrders = useCallback(async (params: PageParams): Promise<PaginationResponse<OrderAllType>> => {
        try {
            const res = await getAllOrders(params);
            const responseData = res.data.data;
            setData(responseData.data);
            return responseData as PaginationResponse<OrderAllType>;
        } catch (error) {
            console.error(JSON.stringify(error));
            toast.error("Failed to fetch orders");
            return { data: [], meta: {constraints:[], total: 0, page: 1, limit: 10, totalPages: 0 } };
        }
    }, []);

    const handleDelete =  (order: OrderAllType) => {
        try {
             deleteOrder(order.order_id).catch(((error : unknown) => {
                console.error(JSON.stringify(error));
                toast.error("Failed to delete order");
             }));
            toast.success("Order deleted successfully");
            globalThis.window.location.reload();
        } catch (error) {
            console.error(JSON.stringify(error));
            toast.error("Failed to delete order");
        }
    };

    const columnRenderers: Record<string, (val: string | number | null | undefined) => React.ReactNode> = {
        order_date: (val: string | number | null | undefined) =>    
            val ? formatDate(val) : "-",
        total_amount: (val: string | number | null | undefined) =>
            `₹${Number.parseFloat(String(val ?? 0)).toFixed(2)}`,
        status: (val: string | number | null | undefined) => (
            <Badge className={STATUS_COLORS[String(val ?? "").toLowerCase()] || "bg-gray-100 text-gray-800"}>
                {val}
            </Badge>
        ),
        payment_status: (val: string | number | null | undefined) => (
            <Badge variant="outline" className={val === "paid" ? "border-green-500 text-green-600" : "border-yellow-500 text-yellow-600"}>
                {val}
            </Badge>
        ),
    };

    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Orders Management</h1>
                    <p className="text-sm text-slate-500">View and manage customer orders.</p>
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <TableWithFilter<OrderAllType>
                    data={data}
                    dataOfColumn={ORDER_COLUMNS}
                    fetchData={fetchOrders}
                    onEdit={(row) => { router.push(`/adminLogin/admin/order/${row.order_id}`); }}
                    onDelete={handleDelete}
                    columnRenderers={columnRenderers}
                />
            </div>
        </div>
    );
}
