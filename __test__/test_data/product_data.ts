import type { ItemCart } from "../../src/types/item.types";

export const mockProduct: ItemCart = {
    item_id: "prod_123",
    item_name: "Test Product",
    item_price: 999,
    category_id: "cat_1",
    category_name: "Test Category",
    rating: 4,
    sku: "TEST-SKU-001",
    stock: 10,
    description: "This is a test product description",
    slug: "test-product",
    image_url: "https://example.com/test-image.jpg"
};

export const mockProductNoImage: ItemCart = {
    ...mockProduct,
    image_url: undefined
};

export const mockProductNoSlug: ItemCart = {
    ...mockProduct,
    slug: undefined
};
export const mockProductOutOfStock: ItemCart = {
    ...mockProduct,
    stock: 0
};
export const mockProductNoRaiting: ItemCart = {
    ...mockProduct,
    rating: undefined
};