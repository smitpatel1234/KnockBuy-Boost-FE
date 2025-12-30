import api, { publicapi } from "./api.service";
import { Item, AddItemParams } from "../types/item.type";
import { PageParams, PaginationResponse } from "../types/pagination.type";
export const getAllItems = () => publicapi.get("/item/get-all-items");
export const getAllItemsPage = async (params: PageParams): Promise<{ data: PaginationResponse<Item> }> => {
  const response = await api.get<{ message: string; data: PaginationResponse<Item> }>("/item/get-all-items-page", {
    params: {
      page: params.pagination.page,
      limit: params.pagination.limit,
      filters: JSON.stringify(params.filters),
      sort: JSON.stringify(params.sort),
    },
  });
  return response.data;
};
export const getPublicItems = async (params: PageParams): Promise<{ data: PaginationResponse<Item> }> => {
  const response = await publicapi.get<{ message: string; data: PaginationResponse<Item> }>("/item/public/get-all-items-page", {
    params: {
      page: params.pagination.page,
      limit: params.pagination.limit,
      filters: JSON.stringify(params.filters),
      sort: JSON.stringify(params.sort),
    },
  });
  return response.data;
};
export const createItem = (data: AddItemParams) => api.post("/item/create-item", data);
export const updateItem = (data: Partial<Item>) => api.put("/item/update-item", data);
export const deleteItem = (id: string) => api.delete("/item/delete-item", { data: { item_id: id } });

export const getItem = (id: string) => {
  return publicapi.get<{ message: string, data: Item }>(`/item/get-item/${id}`);
};
