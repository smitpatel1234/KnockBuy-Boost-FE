export interface Discount {
    discount_id: string;
    discount_name: string;
    discount_code: string;
    discount_type: "percentage" | "flat";
    discount_amount: number;
    duration?: number;
    description?: string;
    discount_start_date?: string;
    active_flag?: 1|0;
}

export interface AddDiscountParams {
    discount_name: string;
    discount_code: string;
    discount_type: "percentage" | "flat";
    discount_amount: number;
    duration?: number;
    description?: string;
    discount_start_date?: string;
    active_flag?: 1|0;
}
