"use client";

import ProductList from "@/components/molecules/ProductList";
import { useWishlist } from "@/hooks/useWishlist";
import { Loader2, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function WishlistPage() {
    const { items, loading } = useWishlist();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
                <p className="text-gray-500">Loading your wishlist...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-2 border-b pb-4">
                <Heart className="h-6 w-6 text-red-500 fill-current" />
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {items.length} items
                </span>
            </div>

            {items.length > 0 ? (
                <ProductList
                    products={items.map((item) => ({
                        ...item,
                        rating: item.rating ?? 0,
                        image_url: item.image_url ?? "",
                        category_name: item.category_name ?? "General",
                    }))}
                    columns={4}
                />
            ) : (
                <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-4">
                    <div className="bg-red-50 p-6 rounded-full mb-4">
                        <Heart className="h-12 w-12 text-red-300" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Your wishlist is empty
                    </h2>
                    <p className="text-gray-500 mb-6 max-w-sm">
                        Save items you like to your wishlist so you can easily find them later.
                    </p>
                    <Link href="/">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                            Start Shopping
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
