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
}: CartItemRowProps) {
  const {  totalPrice } = useCartItem(cartitem)

  return (
    <div className="flex gap-4">
      {cartitem.deleted_at && (
        <div className='absolute z-10 backdrop-blur-sm p-2 rounded-md w-32 h-12 flex items-center justify-center'>
          <Badge className="bg-red-100 text-red-700 self-start  ">Item Not Found</Badge>
        </div>
      )}
      {/* Product Image */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
        {cartitem.image_url ? (
          <Image
            src={cartitem.image_url}
            alt={cartitem.item_name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
        <div>
          <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors truncate text-base">
            {cartitem.item_name}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-gray-900">
              ₹{Number(cartitem.item_price).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            disabled={!!cartitem.deleted_at}
            variant="outline"
            size="sm"
            onClick={() => { onQuantityChange(cartitem, cartitem.quantity - 1); }}
            className="h-8 w-8 p-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            min="1"
            disabled={!!cartitem.deleted_at}
            value={cartitem.quantity}
            onChange={(e) => { onQuantityChange(cartitem, parseInt(e.target.value) || 1); }}
            className="w-20 h-8 text-center"
          />
          <Button
            disabled={!!cartitem.deleted_at}
            variant="outline"
            size="sm"
            onClick={() => { onQuantityChange(cartitem, cartitem.quantity + 1); }}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Total & Remove */}
      <div className="flex flex-col items-end justify-between">
        <Button
          debounceMs={1000}
          variant="ghost"
          size="sm"
          onClick={() => { onRemove(cartitem.cart_item_id); }}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <div className="text-right">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-semibold text-gray-900">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
