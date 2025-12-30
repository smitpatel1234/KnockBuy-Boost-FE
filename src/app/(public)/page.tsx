'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductList from '@/components/molecules/ProductList'
import { getPublicItems } from '@/services/item.service'
import { mapItemToProduct } from '@/utils/itemMapper'
import { Loader2 } from 'lucide-react'
import { Item } from '@/types/item.type'

export default function Home() {
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
        const mappedProducts = response.data.data.map(mapItemToProduct)
        setProducts(mappedProducts)
      } catch (error) {
        console.error('Failed to fetch products', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const recommendedProducts = products.slice(0, 4)
  const trendingProducts = products.slice(4, 8)
  const randomProducts = products.slice(8, 12)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">

        {/* Recommended Section */}
        <div>
          <ProductList
            products={recommendedProducts}
            title="Recommended For You"
            subtitle="Handpicked selections based on popular choices"
            columns={4}
          />
        </div>

        {/* Trending Section */}
        <div className="border-t border-slate-200 pt-8">
          <ProductList
            products={trendingProducts}
            title="Trending Now"
            subtitle="Most popular products this week"
            columns={4}
          />
        </div>

        {/* Random/Other Section */}
        <div className="border-t border-slate-200 pt-8">
          <ProductList
            products={randomProducts}
            title="Explore More"
            subtitle="Discover other great products"
            columns={4}
          />
        </div>

        {/* View All Button */}
        <div className="flex justify-center py-8 border-t border-slate-200">
          <Link
            href="/search"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  )
}
