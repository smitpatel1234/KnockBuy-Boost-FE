"use client";

import React from "react";
import { useAdminOrderDetails } from "@/hooks/useAdminOrderDetails";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrderDetaItemPage from "../organisms/order/OrderDetaItemPage";
import OrderPaymentSummary from "../organisms/order/OrderPaymentSummary";
const ORDER_STATUSES = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
] as const;

interface OrderDetailsTemplateProps {
  orderId: string;

}

export default function OrderDetailsTemplate({
  orderId,
}: Readonly<OrderDetailsTemplateProps>) {
  const router = useRouter();
  const { order, loading, statusLoading, handleStatusChange } = useAdminOrderDetails(orderId);
  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">
        Loading order details...
      </div>
    );
  if (!order)
    return <div className="p-8 text-center text-red-500">Order not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              router.back();
            }}
          >
            ← Back
          </Button>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.order_id.slice(0, 8)}
            </h1>
          </div>

          <p className="text-gray-500 mt-1 ">
            Placed on {new Date(order.order_date).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="text-base px-3 py-1">{order.status}</Badge>
          <Select
            disabled={statusLoading}
            value={order.status.toUpperCase()}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Items */}
        <div className="lg:col-span-2 space-y-6">
          <OrderDetaItemPage order_items={order.order_items} />
        </div>

        {/* Right Column: Customer & Payment Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 block">Name</span>
                <span className="font-medium">{order.user.username}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Email</span>
                <span className="font-medium">{order.user.email}</span>
              </div>
              <div>
                <span className="text-gray-500 block">User ID</span>
                <span className="font-mono text-xs">{order.user.user_id}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              {order.address ? (
                <>
                  <p className="font-medium">{order.address.address_line1}</p>
                  {order.address.address_line2 && (
                    <p>{order.address.address_line2}</p>
                  )}
                  <p> {order.address.city}, {order.address.state} </p>
                  <p>{order.address.pincode}</p>
                  <p>Ph: {order.user.phone_number}</p>
                </>
              ) : (
                <p className="text-gray-500 italic">
                  No shipping address provided
                </p>
              )}
            </CardContent>
          </Card>
          {/* Payment Summary */}
           <OrderPaymentSummary order={order} />
        </div>
      </div>
    </div>
  );
}
