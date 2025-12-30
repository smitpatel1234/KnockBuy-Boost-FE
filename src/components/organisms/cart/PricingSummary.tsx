import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PromoCodeProps } from '@/types/cart.type'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/**
 * PricingSummary Component
 * Displays order breakdown including subtotal, shipping, discount, and total
 * Also includes promo code input and trust badges
 * 
 * Responsibility:
 * - Show pricing breakdown
 * - Handle promo code application
 * - Display discount information
 * - Show shipping cost and free shipping threshold
 * - Display trust badges (secure checkout, free returns)
 */
export default function PricingSummary({
  promoCode,
  onPromoCodeChange,
  onApplyPromoCode,
  discount,
  subtotal,
}: PromoCodeProps & { subtotal: number }) {
  const discountAmount = subtotal * discount
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal - discountAmount + shipping
  const freeShippingThreshold = 100

  return (
    <div className="space-y-4">
      {/* Subtotal */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Shipping</span>
        <span className="font-medium text-gray-900">
          {shipping === 0 ? (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Free
            </Badge>
          ) : (
            `$${shipping.toFixed(2)}`
          )}
        </span>
      </div>

      {shipping > 0 && (
        <p className="text-xs text-green-600">
          Free shipping on orders over ${freeShippingThreshold}!
        </p>
      )}

      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-green-600">
            -${discountAmount.toFixed(2)}
          </span>
        </div>
      )}

      <Separator />

      {/* Total */}
      <div className="flex justify-between text-lg">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="font-bold text-blue-600">${total.toFixed(2)}</span>
      </div>

      {/* Promo Code */}
      <div className="space-y-2 pt-4 border-t border-slate-200">
        <label className="text-sm font-medium text-gray-700">Promo Code</label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter code"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={onApplyPromoCode}
            className="px-4"
          >
            Apply
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Try: <span className="font-medium">SAVE10</span> or <span className="font-medium">SAVE20</span>
        </p>
        {discount > 0 && (
          <Badge className="bg-green-100 text-green-700">
            {Math.round(discount * 100)}% discount applied!
          </Badge>
        )}
      </div>

      {/* Checkout Button */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 mt-6">
        Proceed to Checkout
      </Button>

      {/* Trust Badges */}
      <div className="space-y-2 pt-4 border-t border-slate-200 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1V3a1 1 0 011-1h4a1 1 0 011 1v1h1V3a1 1 0 011-1h2a2 2 0 012 2v2h1.586l-1.293 1.293a1 1 0 001.414 1.414L20.414 5H21a1 1 0 110 2h-.586l1.293 1.293a1 1 0 01-1.414 1.414L19 7.414V8a1 1 0 11-2 0V6.414l-1.293 1.293a1 1 0 01-1.414-1.414L16.586 5H4.414l1.293 1.293a1 1 0 01-1.414 1.414L1.586 5H1a1 1 0 110-2h.586L.293 1.707A1 1 0 011.707.293L3 1.586V1a1 1 0 011-1h2a1 1 0 011 1v1h1V1a1 1 0 011-1h4a1 1 0 011 1v1h1V1a1 1 0 011-1h2a2 2 0 012 2v2h1.586l-1.293-1.293a1 1 0 011.414-1.414L20.414 3H21a1 1 0 110-2h-.586l1.293-1.293a1 1 0 01-1.414-1.414L19 1.586V1a1 1 0 11-2 0v1.586l-1.293-1.293a1 1 0 01-1.414 1.414L16.586 3H4.414l1.293-1.293a1 1 0 01-1.414-1.414L1.586 3H1a1 1 0 110-2h.586L.293.707A1 1 0 011.707-.707L3 .586V-1a1 1 0 011-1h2a1 1 0 011 1z" clipRule="evenodd" />
          </svg>
          Secure checkout
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Free returns
        </div>
      </div>
    </div>
  )
}
