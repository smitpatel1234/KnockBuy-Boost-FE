import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CartItemProps } from '@/types/cart.type'

export default function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const discountPercent = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0

  return (
    <div className="flex gap-4">
      {/* Product Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors truncate">
          {item.name}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-semibold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
          {item.originalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                Save {discountPercent}%
              </Badge>
            </>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="h-8 w-8 p-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 1)}
            className="w-12 h-8 text-center"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Total & Remove */}
      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <div className="text-right">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
