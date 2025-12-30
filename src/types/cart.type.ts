export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  originalPrice?: number
  category?: string
  description?: string
}

export interface CartState {
  items: CartItem[]
  promoCode: string
  discount: number
  subtotal: number
  shipping: number
  total: number
  discountAmount: number
}

export interface PricingBreakdown {
  subtotal: number
  discountAmount: number
  shipping: number
  total: number
  freeShippingThreshold: number
}

export interface CartItemProps {
  item: CartItem
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export interface PromoCodeProps {
  promoCode: string
  onPromoCodeChange: (code: string) => void
  onApplyPromoCode: () => void
  discount: number
  subtotal: number
}
