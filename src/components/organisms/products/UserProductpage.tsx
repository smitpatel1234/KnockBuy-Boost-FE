"use client";

import { useItemSlug } from "@/hooks/useItemSlug";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/molecules/ProductList";
import { useState, type MouseEvent, useCallback } from "react";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { VariantSection } from "./VariantSection";

export default function UserProductpage({
  slug,
}: {
  readonly slug: string;
}) {
  const { product, AddToCart, loading, varientp } = useItemSlug(slug);
  const { isItemInWishlist, toggleWishlist } = useWishlist();

  const [currentImage, setCurrentImage] = useState<string>();

  const isInWishlist = product ? isItemInWishlist(product.item_id) : false;
  const rating = product?.rating ?? 0;
  const inStock = product?.stock ?? 0;

  const handleImageHover = useCallback((e: MouseEvent<HTMLImageElement>) => {
    setCurrentImage(e.currentTarget.src);
  }, []);

  const handleWishlistToggle = useCallback(() => {
    if (product) {
      void toggleWishlist(product.item_id);
    }
  }, [product, toggleWishlist]);

  if (loading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <ProductImageGallery
          currentImage={currentImage}
          onImageHover={handleImageHover}
          productName={product?.item_name}
          productImages={product?.images}
        />

        <div className="lg:w-1/2 w-full space-y-6 flex flex-col">
          <ProductInfo
            productName={product?.item_name}
            sku={product?.sku}
            rating={rating}
            inStock={inStock}
            price={product?.item_price}
            isInWishlist={isInWishlist}
            onWishlistToggle={handleWishlistToggle}
            description={product?.description}
          />

          {/* Variants Section */}
          {varientp && varientp.length > 0 && (
            <VariantSection variantProperty={varientp} variants={product?.variant} />
          )}

          {/* Add to Cart Button */}
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

      {/* Recommended Products */}
      {product?.variant_collections && (
        <ProductList
          products={product.variant_collections}
          title="Recommended For You"
          subtitle="Handpicked selections based on this item"
          columns={4}
        />
      )}
    </div>
  );
}
