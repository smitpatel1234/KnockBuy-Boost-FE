"use client";

import React from "react";
import { useAdminOrderDetails } from "@/hooks/useAdminOrderDetails";
import { useRouter } from "next/navigation";
import type { OrderItem } from "@/types/order.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
}: OrderDetailsTemplateProps) {
  const router = useRouter();
  const { order, loading, statusLoading, handleStatusChange } =
    useAdminOrderDetails(orderId);

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
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Items purchased in this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.order_items.map((item: OrderItem) => (
                <div
                  key={item.order_items_id}
                  className="flex gap-4 py-2 border-b last:border-0 border-gray-100"
                >
                  <div className="h-20 w-20 relative bg-gray-50 rounded-md overflow-hidden shrink-0 border border-gray-100">
                    {item.item.images?.[0] ? (
                      <Image
                        src={item.item.images[0].image_URL}
                        alt={item.item.item_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full text-xs text-gray-400">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.item.item_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ID: {item.item.item_id}
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">
                        Qty: {item.item_quantity}
                      </span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="font-semibold">
                        ₹{item.item_purchase_price}
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-medium">
                    ₹
                    {(item.item_purchase_price * item.item_quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
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
                  <p>
                    {order.address.city}, {order.address.state}
                  </p>
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
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment Status</span>
                <Badge
                  variant="outline"
                  className={
                    order.payment_status === "paid"
                      ? "border-green-500 text-green-600"
                      : "border-yellow-500 text-yellow-600"
                  }
                >
                  {order.payment_status}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Method</span>
                <span className="font-medium">{order.payment_method}</span>
              </div>
              <Separator />
              {order.discount && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({order.discount.discount_code})</span>
                  <span>- {order.discount.discount_amount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>
                  ₹{parseFloat(String(order.total_amount || 0)).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
