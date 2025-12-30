import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CartItemRow from './CartItemRow'
import { CartItem } from '@/types/cart.type'

interface CartItemsListProps {
  items: CartItem[]
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

/**
 * CartItemsList Component
 * Displays all cart items in a scrollable list format
 * 
 * Responsibility:
 * - Render multiple CartItemRow components
 * - Display item count
 * - Handle empty state with continue shopping link
 * - Pass callbacks to child components
 */
export default function CartItemsList({
  items,
  onQuantityChange,
  onRemove,
}: CartItemsListProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {items.length} item{items.length !== 1 ? 's' : ''} in cart
      </h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id}>
            <CartItemRow
              item={item}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
            <Separator className="mt-4" />
          </div>
        ))}
      </div>

      {/* Continue Shopping Link */}
      <Link href="/" className="inline-block mt-6">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}
