import React from 'react'
import type { OrderItem } from '@/types/order.types' 
import { Card, CardHeader, CardTitle , CardDescription ,CardContent} from '@/components/atoms/Card'
import Image from 'next/image'
export default function OrderDetaItemPage({order_items}: {readonly order_items: OrderItem[]}) {
  return (
    <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Items purchased in this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {order_items.map((item: OrderItem) => (
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
  )
}
