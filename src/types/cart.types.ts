import type { GetAllItemCartType } from './itemcart.types'

export interface CartItemRowProps {
  cartitem: GetAllItemCartType
  onQuantityChange: (cart_item:GetAllItemCartType, quantity: number) => void
  onRemove: (id: string) => void
}

export interface CartItemsListProps {
  items: GetAllItemCartType[]
  onQuantityChange: (cart_item:GetAllItemCartType, quantity: number) => void
  onRemove: (id: string) => void
}

export interface PromoCodeProps {
  promoCode: string
  onPromoCodeChange: (code: string) => void
  onApplyPromoCode: () => void | Promise<void>
  discount: number
}

export interface PricingSummaryProps extends PromoCodeProps {
  subtotal: number
}
