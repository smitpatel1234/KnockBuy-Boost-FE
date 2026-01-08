import { ShoppingCart } from 'lucide-react'
import CartItemsList from '@/components/organisms/cart/CartItemsList'
import PricingSummary from '@/components/organisms/cart/PricingSummary'
import type { GetAllItemCartType } from '@/types/itemcart.types'
import type { Discount } from '@/types/discount.types'

interface CartLayoutProps {
  items: GetAllItemCartType[]
  promoCode: string
  discount: number
  onQuantityChange: (cart_item:GetAllItemCartType, quantity: number) => void | Promise<void>
  onRemove: (id: string) => void | Promise<void>
  onPromoCodeChange: (code: string) => void
  onApplyPromoCode: (() => void | Promise<void>) 
  discountData?: Discount | null
}


export default function CartLayout({
  items,
  promoCode,
  discount,
  discountData,
  onQuantityChange,
  onRemove,
  onPromoCodeChange,
  onApplyPromoCode,
}: CartLayoutProps) {
  const subtotal = items.reduce((sum, item) => {
    if (item.deleted_at) return sum;
    return sum + (item.item_price * item.quantity);
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <p className="text-gray-600">Review and manage your items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <CartItemsList
              items={items}
              onQuantityChange={(id, quantity) => void onQuantityChange(id, quantity)}
              onRemove={(id) => void onRemove(id)}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-4 sticky top-4">
              <PricingSummary
                promoCode={promoCode}
                onPromoCodeChange={onPromoCodeChange}
                onApplyPromoCode={onApplyPromoCode}
                discount={discount}
                subtotal={subtotal}
                discountData={discountData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
