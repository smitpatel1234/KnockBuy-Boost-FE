import type { FormikProps } from "formik";

export interface Variant {
    variantValue_id: string;
    variantProperty_id: string;
    variant_value: string;
    property_name: string;
    item_variantvalue_mapping_id?: string;
}

export interface RichDescription {
    how_its_made?: string | null;
    how_to_use?: string | null;
    key_features?: Record<string, string>;
    specifications?: string[];
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
    images?: string[];
    rich_description?: RichDescription;
    isEdit?: boolean;
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
    rich_description?: RichDescription;
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
    rich_description?: RichDescription;
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
    rich_description?: RichDescription;
}

export interface ItemDescriptionFormProps {
    formik: FormikProps<Item>;
}

export interface KeyFeatureItem {
    id: string;
    key: string;
    value: string;
}

