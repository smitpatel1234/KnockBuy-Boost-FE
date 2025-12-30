"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getProductById, mockProducts } from "@/data/mockProducts";
import DEFAULT_PRODUCT from "../../../data/defualtProduct";
import ProductList from "@/components/molecules/ProductList";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductById(params.id) ?? DEFAULT_PRODUCT;
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Product not found</p>
        <Link href="/" className="text-blue-600 hover:text-blue-700">
          Back to home
        </Link>
      </div>
    );
  }

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />

            {product.badge && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-blue-600 text-white capitalize">
                  {product.badge}
                </Badge>
              </div>
            )}

            {discountPercent > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-sm">
                -{discountPercent}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <p
                className={`text-sm font-medium ${
                  product.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase mb-2">
                  Description
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-slate-100"
                >
                  −
                </button>
                <span className="px-4 py-2 text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Link
              href="/cart"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400
                         text-white py-3 rounded-lg font-semibold
                         flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Link>

            {/* Extra Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div>
                <p className="text-xs text-gray-500 uppercase">Shipping</p>
                <p className="text-sm font-medium">Free shipping</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Returns</p>
                <p className="text-sm font-medium">30 days easy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related + Similar */}
        <div className="mt-12 pt-12 border-t border-slate-200 space-y-12">
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} className="group">
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md">
                      <div className="relative aspect-[4/3] bg-slate-100">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-gray-500 uppercase mb-1">
                          {p.category}
                        </p>
                        <h3 className="text-sm font-semibold line-clamp-2">
                          {p.name}
                        </h3>
                        <p className="text-sm font-bold">${p.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <ProductList
            products={mockProducts}
            title="Similar Products"
            subtitle="You may also like these products"
            columns={4}
          />
        </div>
      </div>
    </div>
  );
}
