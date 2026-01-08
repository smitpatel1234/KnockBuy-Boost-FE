import type { GetAllItemCartType,UseCartItemResult } from '@/types/itemcart.types'
export function useCartItem(cartitem: GetAllItemCartType): UseCartItemResult {
  const totalPrice = cartitem.deleted_at ? 0 : cartitem.item_price * cartitem.quantity
  return {
    totalPrice,
  }
}
