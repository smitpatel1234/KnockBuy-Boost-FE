"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Item } from "@/types/item.type";

interface ProductCardProps {
  product: Item;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
   
      <div className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer h-full flex flex-col">
        {/* Image Container*/}
        <div className="relative w-full h-40 bg-slate-100 overflow-hidden">
          {/* <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.badge && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-blue-600 text-white capitalize text-xs">
                {product.badge}
              </Badge>
            </div>
          )}
          {product.item_price && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
               {product.item_price}
            </div>
          )} */}
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
            {product.category_name}
          </p>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
            {product.item_name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {product.rating &&
                Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      product.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-gray-900">
              ${product.item_price}
            </span>
            {product.item_price && (
              <span className="text-xs text-gray-500 line-through">
                ${product.item_price}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-xs font-medium flex items-center justify-center gap-1 transition-colors duration-200"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    
  );
}
