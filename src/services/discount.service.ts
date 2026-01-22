import api, { publicapi } from "./api.service";
import type { Discount, AddDiscountParams } from "../types/discount.types";
import type { PageParams, PaginationResponse } from "../types/pagination.types";

export const getAllDiscounts = () => publicapi.get("/discount/get-all-discounts");
export const getAllDiscountsPage = async (params: PageParams): Promise<{ data: PaginationResponse<Discount> }> => {
    const response = await api.post<{ message: string; data: PaginationResponse<Discount> }>("/discount/get-all-discounts-page", params);
    return response.data;
};
export const createDiscount = (data: AddDiscountParams) => api.post("/discount/create-discount", data);
export const updateDiscount = (data: Partial<Discount>) => api.put("/discount/update-discount", data);
export const deleteDiscount = (id: string) => api.delete("/discount/delete-discount", { data: { discount_id: id } });
export const getDiscount = (id: string) => { return publicapi.get<Discount>("/discount/get-discount", { params: { id: id } }); };
export const validatePromo = (code: string) => api.post<{ message: string; data: Discount }>("/discount/validate-promo", { code });
