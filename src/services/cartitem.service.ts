import api from "./api.service";
import type { AxiosResponse } from "axios";
import type {
   ItemCartDeleteType,
  ItemCartType,
  ItemCartUpdateType,
  GetAllItemCartType,

} from "@/types/itemcart.types";


export const createItemCart = async (
  payload: ItemCartType
): Promise<AxiosResponse<{ message: string; data: Record<string, unknown> }>> => {
  return api.post("/itemcart/create-itemcart", payload);
};

export const getItemCart = async (): Promise<AxiosResponse<{ message: string; data:GetAllItemCartType[]}>> => {
  return api.get("/itemcart/get-itemcart");  
};

export const updateItemCart = async (
  payload: ItemCartUpdateType
): Promise<AxiosResponse<{ message: string; data: Record<string, unknown> }>> => {
  return api.put("/itemcart/update-itemcart", payload);
};


export const deleteItemCart = async (
  payload: ItemCartDeleteType
): Promise<AxiosResponse<{message: string; data: Record<string, unknown>}>> => {
  return api.delete("/itemcart/delete-itemcart", {
    data: payload, 
  });
};
