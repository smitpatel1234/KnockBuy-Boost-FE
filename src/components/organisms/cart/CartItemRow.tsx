import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { CartItemRowProps } from '@/types/cart.types'
import { useCartItem } from '@/hooks/useCartItem'

export default function CartItemRow({
  cartitem,
  onQuantityChange,
  onRemove,
}: Readonly<CartItemRowProps>) {
  const { totalPrice } = useCartItem(cartitem)

  return (
    <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 p-2 sm:p-0">
      {/* Deleted overlay */}
      {cartitem.deleted_at && (
        <div className="absolute inset-0 z-10 backdrop-blur-sm flex items-center justify-center">
          <Badge className="bg-red-100 text-red-700">
            Item Not Found
          </Badge>
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
        {cartitem.image_url ? (
          <Image
            src={cartitem.image_url}
            alt={cartitem.item_name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-2 sm:justify-between">
        <div>
          <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base">
            {cartitem.item_name}
          </h3>

          <span className="text-base sm:text-lg font-bold text-gray-900">
            ₹{cartitem.item_price.toFixed(2)}
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            disabled={!!cartitem.deleted_at || cartitem.quantity <= 1}
            variant="outline"
            size="sm"
            onClick={() => { onQuantityChange(cartitem, cartitem.quantity - 1) }}
            className="h-8 w-8 p-0"
          >
            <Minus className="w-4 h-4" />
          </Button>

          <Input
            type="number"
            min="1"
            disabled={!!cartitem.deleted_at}
            value={cartitem.quantity}
            onChange={(e) => {
              onQuantityChange(
                cartitem,
                Number.parseInt(e.target.value) || 1
              )
            }
            }
            className="w-16 sm:w-20 h-8 text-center"
          />

          <Button
            disabled={!!cartitem.deleted_at}
            variant="outline"
            size="sm"
            onClick={() => { onQuantityChange(cartitem, cartitem.quantity + 1) }
            }
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Total & Remove */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 sm:gap-0">
        <Button
          debounceMs={1000}
          variant="ghost"
          size="sm"
          onClick={() => { onRemove(cartitem.cart_item_id) }}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <div className="text-right">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-base sm:text-lg font-semibold text-gray-900">
            ₹{totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
