import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProductInfoProps } from "@/types/product-display.types";

const STAR_COUNT = 5;

export function ProductInfo({
  productName,
  sku,
  rating,
  inStock,
  price,
  isInWishlist,
  onWishlistToggle,
  description,
}: Readonly<ProductInfoProps>) {
  const isAvailable = inStock > 0;

  return (
    <div className="lg:w-1/2 w-full space-y-6">
      {/* Header with name and wishlist */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {productName}
          </h2>
          {sku && <p className="text-sm text-gray-500 mt-1">SKU: {sku}</p>}
        </div>
        <button
          onClick={onWishlistToggle}
          className={`p-2 rounded-full border transition-colors ${
            isInWishlist
              ? "bg-red-50 border-red-200 text-red-500"
              : "bg-white border-gray-200 text-gray-400 hover:text-red-500"
          }`}
        >
          <Heart
            className={`w-6 h-6 ${isInWishlist ? "fill-current" : ""}`}
          />
        </button>
      </div>

      {/* Rating */}
      {rating >= 0 && (
        <div className="flex items-center gap-3">
          <div className="flex">
            {Array.from({ length: STAR_COUNT }).map((_, i) => (
              <Star
                key={`rating-star-${String(i)}`}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {String(rating)} / {String(STAR_COUNT)}
          </span>
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed">{description}</p>

      {/* Price + Stock */}
      <div className="flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            ₹{String(price ?? 0)}
          </p>
          <p
            className={`text-sm font-medium ${
              isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {isAvailable ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <Badge
          className={
            isAvailable
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }
        >
          {isAvailable ? "Available" : "Unavailable"}
        </Badge>
      </div>
    </div>
  );
}
