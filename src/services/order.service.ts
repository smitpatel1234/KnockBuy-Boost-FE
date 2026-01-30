import api from "./api.service";
import type { OrderDetail, OrderAllType } from "@/types/order.types";
import type { AxiosResponse } from "axios";

export interface ConfirmOrderParams {
    address_id: string;
    payment_method: string;
}

export const helperConfirmOrder = (order_id: string, data: ConfirmOrderParams): Promise<AxiosResponse<{ message: string }>> => {
    return api.post(`/order/confirm/${order_id}`, data);
};

export const getOrderById = (order_id: string): Promise<AxiosResponse<{ message: string; data: OrderDetail }>> => {
    return api.get(`/order/get-order/${order_id}`);
};

export const getOrderHistory = (): Promise<AxiosResponse<{ message: string; data: OrderAllType[] }>> => {
    return api.get("/order/history");
};

// Admin Methods
export const getAllOrders = (params: unknown): Promise<AxiosResponse<{ message: string; data: { data: OrderAllType[]; meta: unknown } }>> => {
    return api.post("/order", params);
};

export const updateOrder = (order_id: string, data: unknown): Promise<AxiosResponse<{ message: string }>> => {
    return api.put(`/order/${order_id}`, data);
};

export const deleteOrder = (order_id: string): Promise<AxiosResponse<{ message: string }>> => {
    return api.delete(`/order/${order_id}`);
};
