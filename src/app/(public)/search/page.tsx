'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductList from '@/components/molecules/ProductList'
import { ChevronDown, Loader2 } from 'lucide-react'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import { getPublicItems } from '@/services/item.service'
import { mapItemToProduct } from '@/utils/itemMapper'
import { Item } from '@/types/item.type'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category')
  const [expandedCategory, setExpandedCategory] = useState(true)
  const [products, setProducts] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const filters = []
        if (query) {
          filters.push({ column: 'item_name', value: query })
        }
        if (categoryParam) {
          filters.push({ column: 'category_name', value: categoryParam })
        }

        const response = await getPublicItems({
          pagination: { page: 1, limit: 100 },
          filters: filters,
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
  }, [query, categoryParam]) // Re-fetch when URL params change

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {query ? `Search Results for "${query}"` : 'Browse Products'}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {loading ? 'Searching...' : `${products.length} ${products.length === 1 ? 'product' : 'products'} found`}
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Sidebar - Categories */}
          <div className="md:col-span-1">
            <div className="bg-white border border-slate-200 rounded-lg p-4 sticky top-4">
              <button
                onClick={() => setExpandedCategory(!expandedCategory)}
                className="flex items-center justify-between w-full mb-4"
              >
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Categories
                </h3>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expandedCategory ? 'rotate-180' : ''
                    }`}
                />
              </button>

              <FilterSidebar />
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <ProductList
                products={products}
                columns={3}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
