"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useHeader } from "@/hooks/useHeader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchUserProfile } from "@/redux/features/auth-slice";
import { useWishlist } from "@/hooks/useWishlist";
import { fetchCart } from "@/redux/features/cart-slice";
import SearchSection from "./header/SearchSection";
import HeaderActions from "./header/HeaderActions";

export default function Header() {
  const dispatch = useAppDispatch();
  const { items: wishlistItems, fetchWishlistByUser } = useWishlist();
  const { items: cartItems } = useAppSelector((state) => state.cart);

  useEffect(() => {
    void dispatch(fetchUserProfile());
    fetchWishlistByUser();
    void dispatch(fetchCart());
  }, [dispatch, fetchWishlistByUser]);


  const { user, loading } = useAppSelector((state) => state.auth)
  const router = useRouter();
  const { handleLogout, globalSearchChange, search } = useHeader(router);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full px-2 sm:px-4 lg:px-8">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-2 py-2">
          {/* Logo and Actions Row */}
          <div className="flex h-16 items-center justify-between gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Store
              </span>
            </Link>

            {/* Actions */}
            <HeaderActions
              wishlistCount={wishlistItems.length}
              cartCount={cartItems.length}
              user={user}
              loading={loading}
              handleLogout={handleLogout}
            />
          </div>

          {/* Search Row */}
          <SearchSection
            search={search}
            globalSearchChange={globalSearchChange}
          />
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex h-16 items-center justify-between gap-4 py-0">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Store
            </span>
          </Link>

          {/* Search & Category */}
          <SearchSection
            search={search}
            globalSearchChange={globalSearchChange}
          />

          {/* Cart & User Actions */}
          <HeaderActions
            wishlistCount={wishlistItems.length}
            cartCount={cartItems.length}
            user={user}
            loading={loading}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}

