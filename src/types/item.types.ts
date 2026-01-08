import type { FormikProps } from "formik";

export interface Variant {
    variantValue_id: string;
    variantProperty_id: string;
    variant_value: string;
    property_name: string;
    item_variantvalue_mapping_id?: string;
}

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
    variant_collections?: MultiSelectItem[];
    variant?: Variant[];
    isEdit?: boolean;
    images?: string[];
}
export interface ItemCart {
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

export interface AddItemParams {
    item_name: string;
    item_price: number;
    category_id: string;
    stock: number;
    description: string;
    rating?: number;
    sku?: string;
    variant?: { variantValue_id: string, variantProperty_id: string, variant_value: string, property_name: string }[];
    variant_collections: MultiSelectItem[];
    images?: string[];
}
export interface VariantCollectionProps {
    formik: FormikProps<Item>;
}

export interface MultiSelectItem {
    item_id: string;
    item_name: string;
}

export interface ItemBySlug {
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
    variant_collections?: Item[];
    variant?: Variant[];
    isEdit?: boolean;
    images?: string[];
}