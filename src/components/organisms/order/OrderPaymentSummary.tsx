import React from 'react'
import type { OrderDetail } from '@/types/order.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card'
import { Badge } from '@/components/atoms/Badge'
import { Separator } from '@/components/atoms/Separator'
export default function OrderPaymentSummary({ order }: {readonly order: OrderDetail }) {
  return (
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
                  ₹{Number.parseFloat(String(order.total_amount || 0)).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
  )
}
