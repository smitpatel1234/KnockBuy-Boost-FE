import { ShoppingCart } from 'lucide-react'
import CartItemsList from '@/components/organisms/cart/CartItemsList'
import PricingSummary from '@/components/organisms/cart/PricingSummary'
import { CartItem } from '@/types/cart.type'

interface CartLayoutProps {
  items: CartItem[]
  promoCode: string
  discount: number
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onPromoCodeChange: (code: string) => void
  onApplyPromoCode: () => void
}


export default function CartLayout({
  items,
  promoCode,
  discount,
  onQuantityChange,
  onRemove,
  onPromoCodeChange,
  onApplyPromoCode,
}: CartLayoutProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <p className="text-gray-600">Review and manage your items</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - 2 columns */}
          <div className="lg:col-span-2">
            <CartItemsList
              items={items}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
          </div>

          {/* Order Summary - 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-4 sticky top-4">
              <PricingSummary
                promoCode={promoCode}
                onPromoCodeChange={onPromoCodeChange}
                onApplyPromoCode={onApplyPromoCode}
                discount={discount}
                subtotal={subtotal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
