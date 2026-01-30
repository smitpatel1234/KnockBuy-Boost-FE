import api, { publicapi } from "./api.service";
import type { Category, AddCategoryParams } from "../types/category.types";
import type { AxiosResponse } from "axios";
import type { PageParams, PaginationResponse } from "../types/pagination.types";

export const getAllCategories = async (): Promise<AxiosResponse<{ message: string; data: Category[] }>> => {
    return await publicapi.get("/category/getAll-categories");
};



export const getAllCategoriesPage = async (params: PageParams): Promise<{ data: PaginationResponse<Category> }> => {
    const response = await api.post<{ message: string; data: PaginationResponse<Category> }>("/category/get-all-categories-page", params);
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
