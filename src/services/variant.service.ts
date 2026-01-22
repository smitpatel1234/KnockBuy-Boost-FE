import api, { publicapi } from "./api.service";
import type { PageParams, PaginationResponse } from "../types/pagination.types";

export const getAllVariantProperties = () => publicapi.get("/variant/get-all-variant-properties");

export const createVariantProperty = (data: { property_name: string }) =>
    api.post("/variant/create-variant-property", data);

export const updateVariantProperty = (data: {
    variantProperty_id: string;
    property_name: string;
}) => api.put("/variant/update-variant-property", data);

export const deleteVariantProperty = (id: string) =>
    api.delete("/variant/delete-variant-property", {
        data: { variantProperty_id: id },
    });

export const getAllVariantValues = () => publicapi.get("/variant/get-all-variant-values");

export const getAllVariantValuesPage = async (params: PageParams): Promise<{ data: PaginationResponse<Record<string, unknown>> }> => {
    const response = await api.post<{ message: string; data: PaginationResponse<Record<string, unknown>> }>("/variant/get-all-variant-values-page", params);
    return response.data;
};

export const createVariantValue = (data: {
    variant_value: string;
    variantProperty_id: string;
}) => api.post("/variant/create-variant-value", data);

export const updateVariantValue = (data: {
    variantValue_id: string;
    variant_value: string;
    variantProperty_id: string;
}) => api.put("/variant/update-variant-value", data);

export const deleteVariantValue = (id: string) =>
    api.delete("/variant/delete-variant-value", {
        data: { variantValue_id: id },
    });

// Variant Collection APIs
export const deleteVariantCollection = (variant_collection_id: string) =>
    api.delete("/variant/delete-variant-collection", {
        data: { variant_collection_id },
    });

