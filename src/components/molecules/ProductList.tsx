'use client'

import React from 'react'
import ProductCard from '@/components/atoms/ProductCard'
import { Item } from '@/types/item.type'

interface ProductListProps {
  products: Item[]
  title?: string
  subtitle?: string
  columns?: 2 | 3 | 4
}

export default function ProductList({
  products,
  title,
  subtitle,
  columns = 3
}: ProductListProps) {
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className="space-y-4">
      {(title || subtitle) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={`grid ${gridClass[columns]} gap-3 md:gap-4`}>
        {products.map(product => (
          <ProductCard key={product.item_id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-lg">
          <p className="text-gray-600">No products found</p>
        </div>
      )}
    </div>
  )
}
