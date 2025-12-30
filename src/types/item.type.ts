export interface Item {
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
    variant_collections?: string[];
    variant?: { variantValue_id: string, variantProperty_id: string, variant_value: string, Property_name: string, item_variantvalue_mapping_id?: string }[];
    isEdit?: boolean;
    images?: string[];
}

export interface AddItemParams {
    item_name: string;
    item_price: number;
    category_id: string;
    stock: number;
    description: string;
    rating?: number;
    sku?: string;
    variant?: { variantValue_id: string, variantProperty_id: string, variant_value: string, Property_name: string }[];
    variant_collections?: string[];
    images?: string[];
}
