import { useCallback, useMemo, useState } from 'react'
import { CartItem } from '@/types/cart.type'


export function useCart(initialItems: CartItem[] = []) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const removeItem = useCallback((id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }, [removeItem])

  // Apply promo code
  const applyPromoCode = useCallback(() => {
    const code = promoCode.toUpperCase()
    if (code === 'SAVE10') {
      setDiscount(0.1)
    } else if (code === 'SAVE20') {
      setDiscount(0.2)
    } else {
      setDiscount(0)
    }
  }, [promoCode])

  // Calculate pricing
  const pricing = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discountAmount = subtotal * discount
    const shipping = subtotal > 100 ? 0 : 9.99
    const total = subtotal - discountAmount + shipping

    return {
      subtotal,
      discountAmount,
      shipping,
      total,
      freeShippingThreshold: 100,
    }
  }, [cartItems, discount])

  return {
    cartItems,
    promoCode,
    setPromoCode,
    discount,
    updateQuantity,
    removeItem,
    applyPromoCode,
    ...pricing,
  }
}
