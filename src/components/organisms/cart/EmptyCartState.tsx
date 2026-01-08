import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EmptyCartState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shopping
        </Link>

        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingCart className="w-16 h-16 text-slate-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to get started</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
