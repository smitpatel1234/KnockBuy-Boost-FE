import api, { publicapi } from "./api.service";
import type { Item, AddItemParams, ItemBySlug } from "../types/item.types";
import type { PageParams, PaginationResponse, SearchPageParams } from "../types/pagination.types";
export const getAllItems = () => publicapi.get<{ message: string; data: Item[] }>("/item/get-all-items");
export const getAllItemsPage = async (params: PageParams): Promise<{ data: PaginationResponse<Item> }> => {
  const response = await api.post<{ message: string; data: PaginationResponse<Item> }>("/item/get-all-items-page", params);
  return response.data;
};
export const getPublicItems = async (params: PageParams): Promise<{ data: PaginationResponse<Item> }> => {
  const response = await publicapi.post<{ message: string; data: PaginationResponse<Item> }>("/item/public/get-all-items-page", params);
  return response.data;
};

export const searchItems = async (params: SearchPageParams): Promise<{ data: PaginationResponse<Item> }> => {
  const response = await publicapi.post<{ message: string; data: PaginationResponse<Item> }>("/item/public/search-items", params);
  return response.data;
};

export const createItem = (data: AddItemParams) => api.post("/item/create-item", data);
export const updateItem = (data: Partial<Item>) => api.put("/item/update-item", data);
export const deleteItem = (id: string) => api.delete("/item/delete-item", { data: { item_id: id } });

export const updateItemVariantCollections = (item_id: string, variant_collections: string[]) =>
  api.put("/item/update-item", { item_id, variant_collections });


export const createItemVariantCollections = (item_id: string, variant_collections: string[]) =>
  api.put("/item/update-item", { item_id, variant_collections });

export const getItem = (id: string) => {
  return publicapi.get<{ message: string, data: Item }>(`/item/get-item/${id}`);
};
export const getItemByslug = (slug: string) => {
  return publicapi.get<{ message: string, data: ItemBySlug }>(`/item/get-item/slug/${slug}`);
};

import type { Category } from "../types/category.types";
export const getSearchSuggestions = (query: string) => {
  return publicapi.get<{ message: string; data: { items: Item[]; categories: Category[] } }>(`/item/public/search-suggestions`, {
    params: { query },
  });
};
