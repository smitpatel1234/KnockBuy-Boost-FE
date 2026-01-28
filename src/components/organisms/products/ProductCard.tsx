"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProductCardProps } from "@/types/productcard.types";
import FallBackImage from "../../../../assets/dummy-product-placeholder.avif";
import { Button } from "@/components/ui/button";
import { useItemSlug } from "@/hooks/useItemSlug";
import { useWishlist } from "@/hooks/useWishlist";
import { createItemCart } from "@/services/cartitem.service";
import { fetchCart } from "@/redux/features/cart-slice";
import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";
export default function ProductCard({ product }: ProductCardProps) {
  const { isItemInWishlist, toggleWishlist } = useWishlist();
  const dispatch = useAppDispatch();
  const AddToCart = async () => {
    if (!product) {
      return toast.message("Product not found")
    }
    const item_id = product.item_id;
    try {
      await createItemCart({
        item: item_id,
        quantity: 1,
      });

      void dispatch(fetchCart());
      toast.success("Added to cart");
    } catch {
      toast.message("Failed to add to cart or out of stock");
    }
  };

  if (!product.slug) {
    return (
      <div className="flex justify-center  ">
        <Loader2 className="mt-20" />
      </div>
    );
  }

  const isInWishlist = isItemInWishlist(product.item_id);

  return (
    <div className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer h-full flex flex-col relative">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void toggleWishlist(product.item_id);
          }}
          className={`p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-colors duration-200 ${isInWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
        </button>
      </div>

      <Link href={`/product/${product.slug}`}>
        <div className="relative w-full h-40 bg-slate-100 overflow-hidden">
          <Image
            src={product.image_url  ?? FallBackImage}
            alt={product.item_name}
            fill
            className="object-cover"
          />


        </div>
      </Link>

      <div className="p-3 flex-1 flex flex-col">
        <Link href={`/product/${product.slug}`}>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
            {product.category_name}
          </p>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
            {product.item_name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${(product.rating ?? 0) >= i + 1
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-gray-900">
              ₹{product.item_price}
            </span>
          </div>
        </Link>
        <Button
          onClick={() => {
            void AddToCart();
          }}
          className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-xs font-medium flex items-center justify-center gap-1 transition-colors duration-200"
        >
          <ShoppingCart className="w-3 h-3" />
          <span>Add</span>
        </Button>
      </div>
    </div>
  );
}
