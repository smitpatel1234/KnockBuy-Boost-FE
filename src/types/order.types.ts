import type { Address } from "./address.types";
import type { Discount } from "./discount.types";

// Type for Order Item in Order Detail
export interface OrderItem {
    order_items_id: string;
    item_quantity: number;
    item_purchase_price: number; // string or number depending on transform
    item: {
        item_id: string;
        item_name: string;
        images?: { image_URL: string }[];
    }
}

// Full Order Detail Type
export interface OrderDetail {
    order_id: string;
    order_date: string;
    status: string;
    delivery_status: string;
    total_amount: number; 
    payment_status: string;
    payment_method: string;
    address?: Address;
    discount?: Discount;
    order_items: OrderItem[];
    user: {
        user_id: string;
        username: string;
        email: string;
        phone_number: string;
    }
}

// Type for List of Orders (History)
export interface OrderAllType {
    order_id: string;
    order_date: Date | string;
    status: string;
    delivery_status: string;
    username: string;
    total_amount: number;
    payment_status: string;
    payment_method: string;
}
