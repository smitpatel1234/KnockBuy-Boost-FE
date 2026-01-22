"use client";

import Link from "next/link";
import { ShoppingCart, LogOut, Heart } from "lucide-react";
import { SpinnerCustom } from "../../ui/loading";
import type { AuthUser } from "@/types/auth.types";

interface HeaderActionsProps {
    wishlistCount: number;
    cartCount: number;
    user: AuthUser | null;
    loading: boolean;
    handleLogout: () => void;
}

export default function HeaderActions({
    wishlistCount,
    cartCount,
    user,
    loading,
    handleLogout,
}: HeaderActionsProps) {
    return (
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Wishlist */}
            <Link
                href="/wishlist"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                title="My Wishlist"
            >
                <Heart className="h-5 w-5 text-gray-700" />
                {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                        {wishlistCount}
                    </span>
                )}
            </Link>

            {/* Cart */}
            <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                title="My Cart"
            >
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {cartCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </Link>

            {/* Auth */}
            {loading ? (
                <SpinnerCustom />
            ) : (
                <>
                    {user ? (
                        <div className="flex items-center gap-2 md:gap-4">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full border border-transparent hover:border-gray-200 transition-all flex-shrink-0"
                            >
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                    {user.username?.[0]?.toUpperCase() ?? "U"}
                                </div>
                                <span className="text-xs md:text-sm font-medium text-gray-700 hidden md:block">
                                    {user.username}
                                </span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full transition-colors flex-shrink-0"
                                title="Logout"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center justify-center h-8 md:h-9 px-3 md:px-4 rounded-full bg-blue-600 text-white text-xs md:text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex-shrink-0"
                        >
                            Sign In
                        </Link>
                    )}
                </>
            )}
        </div>
    );
}
