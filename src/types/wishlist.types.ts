export interface WishlistItem {
  wish_list_id: string;

  item_id: string;
  item_name: string;
  item_price: number;

  category_id: string;
  category_name?: string;

  rating?: number;
  sku?: string;
  stock: number;

  description: string;
  slug?: string;

  image_url?: string;
}

export type WishlistState  = {
    items: WishlistItem[];
    loading: boolean;
    error: string | null;
}