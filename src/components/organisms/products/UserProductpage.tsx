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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RichDescription } from "./RichDescription";
import { ReviewSection } from "./ReviewSection";

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

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row p-8 gap-12">
            <ProductImageGallery
              currentImage={currentImage}
              onImageHover={handleImageHover}
              productName={product.item_name}
              productImages={product.images}
            />

            <div className="lg:w-1/2 flex flex-col justify-between py-4">
              <ProductInfo
                productName={product.item_name}
                sku={product.sku}
                rating={rating}
                inStock={inStock}
                price={product.item_price}
                isInWishlist={isInWishlist}
                onWishlistToggle={handleWishlistToggle}
              />

              <div className="mt-8 space-y-6">
                {/* Variants Section */}
                {varientp && varientp.length > 0 && (
                  <VariantSection variantProperty={varientp} variants={product.variant} />
                )}

                <div className="flex items-center gap-4 pt-4">
                  <Button
                    onClick={() => void AddToCart()}
                    disabled={!inStock}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-6 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <Tabs defaultValue="description" className="w-full">
            <div className="border-b border-gray-100 bg-gray-50/50 px-8">
              <TabsList className="h-16 bg-transparent gap-8">
                <TabsTrigger
                  value="description"
                  className="h-full bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-2 text-base font-semibold transition-all"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="ratings"
                  className="h-full bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-2 text-base font-semibold transition-all"
                >
                  Reviews & Ratings
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-8">
              <TabsContent value="description" className="mt-0 focus-visible:ring-0">
                <div className="max-w-4xl space-y-8">
                  <div className="prose prose-slate max-w-none">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Product Details</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </div>
                  {product.rich_description && (
                    <div className="border-t border-gray-100 pt-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Information</h3>
                      <RichDescription content={product.rich_description} />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="ratings" className="mt-0 focus-visible:ring-0">
                <ReviewSection itemId={product.item_id} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Recommended Products */}
        {product.variant_collections && product.variant_collections.length > 0 && (
          <div className="mt-16">
            <ProductList
              products={product.variant_collections}
              title="Recommended For You"
              subtitle="Handpicked selections based on this item"
              columns={4}
            />
          </div>
        )}
      </div>
    </div>
  );
}
