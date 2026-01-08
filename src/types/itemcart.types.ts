import type { Item } from "./item.types"
export interface ItemCartType {
    item: string,
    quantity: number,

}
export interface ItemCartUpdateType {
    cart_item_id: string,
    quantity: number,
    item:string
}
export interface ItemCartDeleteType {
    cart_item_id: string
}
export type GetAllItemCartType = {
    cart_item_id: string,
    quantity: number
    deleted_at: string | null,
    image_url?: string | null,
} & Pick<Item, 'item_id' | 'item_name' | 'item_price' | 'stock'>
export type UseCartItemResult = {
  totalPrice: number
}