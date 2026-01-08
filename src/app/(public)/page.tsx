'use client'

import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import ProductList from '@/components/molecules/ProductList'
import { useItemFetchAll } from '@/hooks/useItemFetchAll'
import { useWishlist } from '@/hooks/useWishlist'
export default function Home() {
  const { products, loading } = useItemFetchAll()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        No products available
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <ProductList
          products={products}
          title="Recommended For You"
          subtitle="Handpicked selections based on popular choices"
          columns={4}
        />
        <div className="border-t border-slate-200 pt-8">
          <ProductList
            products={products}
            title="Trending Now"
            subtitle="Most popular products this week"
            columns={4}
          />
        </div>
        <div className="border-t border-slate-200 pt-8">
          <ProductList
            products={products}
            title="Explore More"
            subtitle="Discover other great products"
            columns={4}
          />
        </div>
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
