import React from 'react'
import { SiteHeader } from "@/components/site-header";
import OrderDiscription from '@/components/organisms/order/OrderDiscription'
export default function OrderDetails() {
  return (
    <>
    <SiteHeader title="Order Details" />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  <OrderDiscription />
                </div>
              </div>
            </div>
          </div>
        </>
  )
}
