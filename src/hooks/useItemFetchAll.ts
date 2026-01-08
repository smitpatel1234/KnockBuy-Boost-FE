import { useEffect, useState } from 'react'

import { getPublicItems } from '@/services/item.service'
import type { Item } from '@/types/item.types'


export const useItemFetchAll = () => {

  const [products, setProducts] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getPublicItems({
          pagination: { page: 1, limit: 12 },
          filters: [],
          sort: []
        })
        setProducts(response.data.data)
      } catch (error) {
        console.error('Failed to fetch products', error)
      } finally {
        setLoading(false)
      }
    }
    void fetchProducts()
  }, [])
  return { products, loading }
}