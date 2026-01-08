export interface Category {
    category_id: string;
    category_name: string;
    parent_category_id: string | null;
    parent_category_name?: string;
    image_url?: string;
    description?: string;
}

export interface AddCategoryParams {
    category_name: string;
    parent_category_id?: string;
    image_url?: string;
    description?: string;
}