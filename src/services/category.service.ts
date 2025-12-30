import api, { publicapi } from "./api.service";
import { Category, AddCategoryParams } from "../types/category.type";
import { AxiosResponse } from "axios";
import { PageParams, PaginationResponse } from "../types/pagination.type";

export const getAllCategories = async (): Promise<AxiosResponse<{ message: string; data: Category[] }>> => {
    return await publicapi.get("/category/getAll-categories");
};

export const getAllCategoriesPage = async (params: PageParams): Promise<{ data: PaginationResponse<Category> }> => {
    const response = await api.get<{ message: string; data: PaginationResponse<Category> }>("/category/get-all-categories-page", {
        params: {
            page: params.pagination.page,
            limit: params.pagination.limit,
            filters: JSON.stringify(params.filters),
            sort: JSON.stringify(params.sort),
        },
    });
    return response.data;
};

export const createCategory = async (data: AddCategoryParams): Promise<AxiosResponse> => {
    return await api.post("/category/create-category", data);
};

export const updateCategory = async (data: Partial<Category>): Promise<AxiosResponse> => {
    return await api.put("/category/update-category", data);
};

export const deleteCategory = async (id: string): Promise<AxiosResponse> => {
    return await api.delete("/category/delete-category", { data: { category_id: id } });
};
