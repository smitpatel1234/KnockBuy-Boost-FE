'use client'
import CartLayout from '@/components/templates/CartLayout'
import EmptyCartState from '@/components/organisms/cart/EmptyCartState'
import { useCart } from '@/hooks/useCart'
export default function CartPage() {
  const {
    cartItems,
    promoCode,
    setPromoCode,
    discountAmount,
    discountData,
    updateQuantity,
    removeItem,
    applyPromoCode,
  } = useCart()

  if (cartItems.length === 0) {
    return <EmptyCartState />
  }
  return (
    <CartLayout
      items={cartItems}
      promoCode={promoCode}
      discount={discountAmount}
      onQuantityChange={updateQuantity}
      onRemove={removeItem}
      onPromoCodeChange={setPromoCode}
      onApplyPromoCode={applyPromoCode}
      discountData={discountData}
    />
  )
}
