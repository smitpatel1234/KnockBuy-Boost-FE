import type { Item } from '@/types/item.types'

export interface ProductListProps {
  products: Item[]
  title?: string
  subtitle?: string
  columns?: 2 | 3 | 4
}
