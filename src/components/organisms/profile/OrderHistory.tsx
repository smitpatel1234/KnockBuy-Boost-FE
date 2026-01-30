"use client";

import React, { useEffect, useState } from "react";
import { getOrderHistory } from "@/services/order.service";
import type { OrderAllType } from "@/types/order.types";
import { Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
export default function OrderHistory({router}:{readonly router:AppRouterInstance}) {
    const [orders, setOrders] = useState<OrderAllType[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrderHistory();
                setOrders(res.data.data);
            } catch (error) {
                console.error("Failed to fetch order history", error);
            } finally {
                setLoading(false);
            }
        };
        void fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <Package className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-500 font-medium">No orders found</p>
            </div>
        );
    }
   const applyStatusStyles = (status: string) => {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-700";
        case "cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-yellow-100 text-yellow-700";
    }
  };
    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <div
                    key={order.order_id}
                    className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-200 transition-colors"
                >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900">Order #{order.order_id.slice(0, 8)}</h3>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${applyStatusStyles(order.status)}`}>
                                    {order.status.toUpperCase()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">
                                Date: {new Date(order.order_date).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="font-bold text-gray-900 text-lg">₹{order.total_amount}</p>
                            <p className="text-xs text-gray-500">{order.payment_method} - {order.payment_status}</p>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            router.push(`/profile/${order.order_id}`);
                          }}
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
