"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { ShoppingCart, LogOut, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import CategorySlider from "./CategorySlider";
import { useHeader } from "@/hooks/useHeader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchUserProfile } from "@/redux/features/auth-slice";
import { SpinnerCustom } from "../ui/loading";
import { SheetForcart } from "./SheetForcart";
import { useWishlist } from "@/hooks/useWishlist";

export default function Header() {
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useWishlist();
  useEffect(() => {
    void dispatch(fetchUserProfile());
  }, [dispatch]);
  const { user, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { handleLogout, globalSearchChange, search } = useHeader(router);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row h-auto md:h-16 items-center justify-between gap-4 py-3">
          {/* --- Logo --- */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Store
              </span>
            </Link>
          </div>
          <SheetForcart />
          {/* --- Search & Category --- */}
          <div className="flex w-full md:flex-1 gap-2 items-center">
            <CategorySlider />

            {/* Search Input */}
            <Input
              placeholder="Search products, brands, and more "
              className="flex-1 bg-white "
              value={search}
              onChange={globalSearchChange}
            />
          </div>

          {/* --- Cart & User Actions --- */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="My Wishlist"
            >
              <Heart className="h-5 w-5 text-gray-700" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {/* Uncomment to show count
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
                0
              </span>
              */}
            </Link>

            {/* Auth */}
            {loading ? (
              <SpinnerCustom />
            ) : (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full border border-transparent hover:border-gray-200 transition-all"
                    >
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {user.username?.[0]?.toUpperCase() ?? "U"}
                      </div>
                      <span className="text-sm font-medium text-gray-700 hidden sm:block">
                        {user.username}
                      </span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full transition-colors"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
