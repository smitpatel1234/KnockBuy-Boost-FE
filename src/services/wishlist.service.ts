import api from "./api.service";
import type { WishlistItem } from "../types/wishlist.types";

export const getUserWishlist = () =>
  api.get<{ data: WishlistItem[] }>("/wishlist/get-wishlist");

export const addToWishlist = (item_id: string) =>
  api.post("/wishlist/post-wishlist", { item_id });

export const removeFromWishlist = (item_id: string) =>
  api.delete(`/wishlist/remove-wishlist/${item_id}`);
