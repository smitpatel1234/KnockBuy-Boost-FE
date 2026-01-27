'use client'

import { useState } from 'react'
import ProductList from '@/components/molecules/ProductList'
import { ChevronDown, Loader2 } from 'lucide-react'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import Pagination from '@/components/molecules/Pagination'
import { useProductSearch } from '@/hooks/useProductSearch'
import type { FilterState } from '@/types/filter.types'

export default function SearchPage() {
  const [expandedCategory, setExpandedCategory] = useState(true)

  const {
    products,
    total,
    loading,
    setSidebarFilters,
    query,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    constraints,
    allVariantProperties
  } = useProductSearch()

  const handleFilterChange = (newFilters: FilterState) => {
    setSidebarFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {query ? `Search Results for "${query}"` : 'Browse Products'}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {loading ? 'Searching...' : `${total} ${total === 1 ? 'product' : 'products'} found`}
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Sidebar - Categories */}
          <div className="md:col-span-1">
            <div className="bg-white border border-slate-200 rounded-lg p-4 sticky top-4">
              <button
                onClick={() => { setExpandedCategory(!expandedCategory); }}
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

              <FilterSidebar
                onFilterChange={handleFilterChange}
                constraints={constraints}
                dynamicOptions={{
                  variantProperties: allVariantProperties && Object.keys(allVariantProperties).length > 0 ? allVariantProperties : undefined
                }}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <>
                <ProductList
                  products={products}
                  columns={3}
                />
                <div className="mt-8">
                  <Pagination
                    page={page}
                    limit={limit}
                    total={total}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
