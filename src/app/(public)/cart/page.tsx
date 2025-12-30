'use client'

import CartLayout from '@/components/templates/CartLayout'
import EmptyCartState from '@/components/organisms/cart/EmptyCartState'
import { useCart } from '@/hooks/useCart'

export default function CartPage() {
  const mockCartItems = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      quantity: 1,
      category: 'Electronics',
      description: 'Noise-cancelling over-ear headphones'
    },
    {
      id: '2',
      name: 'Classic Cotton T-Shirt',
      price: 19.99,
      originalPrice: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      quantity: 2,
      category: 'Clothing',
      description: 'Soft, breathable cotton shirt'
    },
    {
      id: '3',
      name: 'Stainless Water Bottle',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1602143407151-7e36dd5f5a0e?w=400&h=400&fit=crop',
      quantity: 1,
      category: 'Home & Kitchen',
      description: 'Keeps liquids cold for 24 hours'
    }
  ]

  const {
    cartItems,
    promoCode,
    setPromoCode,
    discount,
    updateQuantity,
    removeItem,
    applyPromoCode,
  } = useCart(mockCartItems)

  // Show empty state if no items
  if (cartItems.length === 0) {
    return <EmptyCartState />
  }

  return (
    <CartLayout
      items={cartItems}
      promoCode={promoCode}
      discount={discount}
      onQuantityChange={updateQuantity}
      onRemove={removeItem}
      onPromoCodeChange={setPromoCode}
      onApplyPromoCode={applyPromoCode}
    />
  )
}
