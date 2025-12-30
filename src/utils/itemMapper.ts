
import { Item } from "@/types/item.type";
import { Product } from "@/data/mockProducts";

export const mapItemToProduct = (item: Item): Product => ({
    id: item.item_id,
    name: item.item_name,
    price: Number(item.item_price),
    image: item.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', // Fallback image
    category: item.category_name || 'Uncategorized',
    description: item.description,
    rating: item.rating || 0,
    reviews: 0,
    inStock: item.stock > 0
});
