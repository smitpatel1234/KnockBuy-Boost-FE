'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductList from '@/components/molecules/ProductList'
import { ChevronDown, Loader2 } from 'lucide-react'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import { searchItems } from '@/services/item.service'
import type { Item } from '@/types/item.types'
import type { SearchFilter, SearchPageParams } from '@/types/pagination.types'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const categoryParam = searchParams.get('category')
  const [expandedCategory, setExpandedCategory] = useState(true)
  const [products, setProducts] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)


  const [sidebarFilters, setSidebarFilters] = useState<any>({
    priceRange: [0, 500],
    selectedRating: '0',
    selectedColors: [],
    selectedSizes: []
  });

  // Dynamic Filters: Extract available variants from fetched products
  // Note: This matches "according to fetched items" requirement
  const { availableColors, availableSizes } = useMemo(() => {
    const colors = new Set<string>();
    const sizes = new Set<string>();

    products.forEach(product => {
      // Check variant_info if available (from new backend join)
      if (product.variant_info) {
        product.variant_info.forEach(v => {
          // Heuristic: Check property name (normalized)
          const prop = v.property.toLowerCase();
          if (prop.includes('color')) colors.add(v.value);
          if (prop.includes('size')) sizes.add(v.value);
        });
      }
      // Fallback or additional check if variants define these explicitly in other fields not shown
    });

    // If no variant_info (e.g. legacy data), we might want to default or show nothing.
    // However, the hardcoded sidebar had defaults. 
    // We will pass these sets converted to arrays.
    return {
      availableColors: Array.from(colors),
      availableSizes: Array.from(sizes)
    };
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const activeFilters: SearchFilter[] = [];

        // 1. Search Query
        if (query) {
          activeFilters.push({ column: 'item.item_name', like: query });
        }

        // 2. Category
        if (categoryParam && categoryParam !== 'all') {
          activeFilters.push({ column: 'category.category_id', eq: categoryParam });
        }

        // 3. Price Filter
        if (sidebarFilters.priceRange) {
          activeFilters.push({
            column: 'item.item_price',
            between: sidebarFilters.priceRange as [number, number],
          });
        }

        // 4. Rating Filter
        if (sidebarFilters.selectedRating && sidebarFilters.selectedRating !== '0') {
          activeFilters.push({
            column: 'item.rating',
            gt: Number(sidebarFilters.selectedRating),
          });
        }

        // 5. Variants (Color/Size)
        if (sidebarFilters.selectedColors?.length > 0) {
          activeFilters.push({
            column: 'variantValue.value',
            in: sidebarFilters.selectedColors,
          });
        }
        if (sidebarFilters.selectedSizes?.length > 0) {
          activeFilters.push({
            column: 'variantValue.value',
            in: sidebarFilters.selectedSizes,
          });
        }

        const searchParams: SearchPageParams = {
          pagination: { page: 1, limit: 100 },
          filters: activeFilters,
          sort: []
        };

        const response = await searchItems(searchParams);

        // Deduping on frontend if backend returns duplicates (distinctOn should handle it though)
        setProducts(response.data.data)
      } catch (error) {
        console.error('Failed to fetch products', error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce fetch if filters change rapidly? 
    // For now, useEffect dependency is fine, but sidebar might trigger frequent updates.
    // Sidebar usually has its own local state and triggers `onFilterChange` on commit (mouseup) or debounce.
    // FilterSidebar implementation updates on effect of local state.
    // We should probably debounce this effect or the handleFilterChange.
    const timer = setTimeout(() => {
      void fetchProducts()
    }, 300);

    return () => clearTimeout(timer);
  }, [])

  const handleFilterChange = (newFilters: any) => {
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
          {loading ? 'Searching...' : `${String(products.length)} ${products.length === 1 ? 'product' : 'products'} found`}
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

              {/* Dynamic Filter Sidebar */}
              {/* We pass the derived colors/sizes. If empty (initial load), it might show nothing or defaults depending on sidebar implementation. */}
              <FilterSidebar
                onFilterChange={handleFilterChange}
                dynamicOptions={{
                  colors: availableColors.length > 0 ? availableColors : undefined,
                  sizes: availableSizes.length > 0 ? availableSizes : undefined
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
