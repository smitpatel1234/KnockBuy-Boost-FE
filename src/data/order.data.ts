import type { ColumnConfig } from "@/types/generic-table.types";
export const ORDER_COLUMNS:ColumnConfig[] = [
    { key: "order_id", title: "Order ID", sortable: false, searchable: true },
    { key: "order_date", title: "Date", sortable: true ,searchByDate:true},
    { key: "username", title: "Customer", sortable: true, searchable: true },
    { key: "total_amount", title: "Total", sortable: true,searchByNumber:true },
    { key: "status", title: "Status", sortable: true },
    { key: "payment_status", title: "Payment", sortable: true },
];

export const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};
