import api, { publicapi } from "./api.service";
import { Discount, AddDiscountParams } from "../types/discount.type";
import { PageParams, PaginationResponse } from "../types/pagination.type";

export const getAllDiscounts = () => publicapi.get("/discount/get-all-discounts");
export const getAllDiscountsPage = async (params: PageParams): Promise<{ data: PaginationResponse<Discount> }> => {
    const response = await api.get<{ message: string; data: PaginationResponse<Discount> }>("/discount/get-all-discounts-page", {
        params: {
            page: params.pagination.page,
            limit: params.pagination.limit,
            filters: JSON.stringify(params.filters),
            sort: JSON.stringify(params.sort),
        },
    });
    return response.data;
};
export const createDiscount = (data: AddDiscountParams) => api.post("/discount/create-discount", data);
export const updateDiscount = (data: Partial<Discount>) => api.put("/discount/update-discount", data);
export const deleteDiscount = (id: string) => api.delete("/discount/delete-discount", { data: { discount_id: id } });
export const getDiscount = (id: string) => {return publicapi.get<Discount>("/discount/get-discount", { params: { id: id } });};
