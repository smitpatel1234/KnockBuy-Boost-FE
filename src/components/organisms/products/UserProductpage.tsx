"use client";

import { useItemSlug } from "@/hooks/useItemSlug";
import { Star, ShoppingCart, Heart, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CarouselBox from "../../molecules/CarouselBox";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/molecules/ProductList";
import { useState, type MouseEvent, useRef } from "react";
import { useWishlist } from "@/hooks/useWishlist";
import { useMouseOverZoom } from "@/hooks/useMouseOverZoom";
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
    setCurrentImage(e.target.src);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2 w-full  relative">
          {isA && <canvas
            ref={target}
            width={300}
            height={300}
            className="absolute left-full ml-4 z-50 border bg-white"
          />
          }
          <div className="bg-white w-full rounded-xl shadow-sm border p-1 flex justify-center h-80 relative overflow-hidden">
            <div
              ref={cursor}
              className="absolute pointer-events-none border-2 border-sky-500 bg-sky-400/20"
            />

            <img
              ref={source}
              src={
                CurrentImage ??
                product?.images?.[0] ??
                "../../../stories/assets/download.jpg"
              }
              alt={"ok"}
              className="w-full h-full bg-gray-100 cursor-crosshair object-cover"
            />
          </div>


          <div className="h-20 w-full">
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
            <div>
              <h3 className="text-base font-semibold mb-2 text-gray-800">
                Variants
              </h3>
              <div className="flex flex-wrap gap-2">
                {varientp?.map((v) => (
                  <div key={v}>
                    {
                      product.variant?.find((vo) => vo.variantProperty_id === v)
                        ?.property_name
                    }
                    {product.variant?.map((variant) => (
                      <div key={variant.variantValue_id}>
                        {variant.variantProperty_id === v && (
                          <>{variant.variant_value}</>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
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
