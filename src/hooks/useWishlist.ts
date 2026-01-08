"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchWishlist, toggleWishlist } from "@/redux/features/wishlist-slice";
import { useCallback } from "react";
import { toast } from "sonner";

export const useWishlist = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.wishlist);
    const { user } = useAppSelector((state) => state.auth);
    const fetchWishlistByUser = useCallback(() => { void dispatch(fetchWishlist()); }, [dispatch]);
    const handleToggleWishlist = useCallback(async (item_id: string) => {
        if (!user) {
            toast.error("Please login to manage your wishlist");
            return;
        }

        const isInWishlist = items.some(item => item.item_id === item_id);

        try {
            await dispatch(toggleWishlist({ item_id, isInWishlist })).unwrap();
            toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
        } catch (err: unknown) {
            const errorMessage = (err as string) || "Failed to update wishlist";
            toast.error(errorMessage);
        }
    }, [user, items, dispatch]);

    const isItemInWishlist = useCallback((item_id: string) => {
        return items.some(item => item.item_id === item_id);
    }, [items]);

    return {
        items,
        loading,
        error,
        toggleWishlist: handleToggleWishlist,
        isItemInWishlist,
        fetchWishlistByUser,
    }
}
