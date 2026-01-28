"use client";

import { useItemSlug } from "@/hooks/useItemSlug";
import { Star, ShoppingCart, Heart, Loader2, Package, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CarouselBox from "../../molecules/CarouselBox";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/molecules/ProductList";
import { useState, type MouseEvent, useRef } from "react";
import { useWishlist } from "@/hooks/useWishlist";
import { useMouseOverZoom } from "@/hooks/useMouseOverZoom";
import Image from "next/image";
export default function UserProductpage({ slug }: { slug: string }) {
  const { product, AddToCart, loading, varientp } = useItemSlug(slug);
  const { isItemInWishlist, toggleWishlist } = useWishlist();

  const rating = product?.rating ?? 0;
  const inStock = product?.stock ?? 0;
  const [CurrentImage, setCurrentImage] = useState<string>();
  const source = useRef<HTMLImageElement>(null);
  const target = useRef<HTMLCanvasElement>(null);
  const cursor = useRef<HTMLDivElement>(null); // new
  const isA = useMouseOverZoom(source, target, cursor, 20);

  if (loading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const isInWishlist = product ? isItemInWishlist(product.item_id) : false;

  const HoverHandel = (e: MouseEvent<HTMLImageElement>) => {
    setCurrentImage(e.target.src as string);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2 w-full  relative">
          {isA && <canvas
            ref={target}
            width={700}
            height={700}
            className="absolute left-full ml-4 z-50 border-2 border-indigo-200 bg-white rounded-xl shadow-2xl"
          />
          }
          <div className="bg-white w-full rounded-2xl shadow-xl border-2 border-indigo-100 p-4 relative overflow-hidden group transition-all duration-300 hover:shadow-2xl">
            {/* Hover to Zoom Indicator */}
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Hover to zoom
            </div>

            {/* Dynamic aspect ratio container */}
            <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
              <div
                ref={cursor}
                className="absolute pointer-events-none border-2 border-indigo-500 bg-indigo-400/20 rounded-lg z-10"
              />

              <Image
                ref={source}
                src={
                  CurrentImage ??
                  product?.images?.[0] ??
                  "http://localhost:5000/uploads/dummy-product-placeholder.avif"
                }
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={product?.item_name ?? "Product"}
                className="object-contain cursor-crosshair transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </div>


          <div className="h-24 w-full mt-4">
            <CarouselBox
              HandelOnhover={HoverHandel}
              carousel_images={product?.images}
            />
          </div>
        </div>

        <div className="lg:w-1/2 w-full space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {product?.item_name}
              </h2>
              {product?.sku && (
                <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
              )}
            </div>
            <button
              onClick={() => product && void toggleWishlist(product.item_id)}
              className={`p-2 rounded-full border transition-colors ${isInWishlist
                ? "bg-red-50 border-red-200 text-red-500"
                : "bg-white border-gray-200 text-gray-400 hover:text-red-500"
                }`}
            >
              <Heart
                className={`w-6 h-6 ${isInWishlist ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {rating >= 0 && (
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{rating} / 5</span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed">
            {product?.description}
          </p>

          {/* Price + Stock */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ₹{product?.item_price}
              </p>
              <p
                className={`text-sm font-medium ${inStock ? "text-green-600" : "text-red-600"
                  }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            <Badge
              className={
                inStock ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }
            >
              {inStock ? "Available" : "Unavailable"}
            </Badge>
          </div>

          {/* Variants */}
          {product?.variant && product.variant.length > 0 && (
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Available Variants
              </h3>
              <div className="space-y-5">
                {varientp?.map((v) => {
                  const propertyName = product.variant?.find((vo) => vo.variantProperty_id === v)?.property_name;
                  const propertyValues = product.variant?.filter((variant) => variant.variantProperty_id === v);

                  return (
                    <div key={v} className="space-y-3">
                      {/* Property Name */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                          {propertyName}:
                        </span>
                      </div>

                      {/* Property Values */}
                      <div className="flex flex-wrap gap-3">
                        {propertyValues?.map((variant) => (
                          <button
                            key={variant.variantValue_id}
                            className="group relative px-5 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-800 hover:border-indigo-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          >
                            <span className="relative z-10">{variant.variant_value}</span>
                            {/* Subtle gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 rounded-lg transition-all duration-200"></div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={() => void AddToCart()}
              disabled={!inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div>
        {product?.variant_collections && (
          <ProductList
            products={product.variant_collections}
            title="Recommended For You"
            subtitle="Handpicked selections based on with this item"
            columns={4}
          />
        )}
      </div>
    </div>
  );
}
