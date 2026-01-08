import api from "./api.service";
import type { Address, AddAddress } from "../types/address.types";

export const createAddressInParams = (data: AddAddress, userId: string) => api.post(`/address/create-address/${userId}`, data);
export const createAddress = (data: AddAddress) => api.post("/address/create-address/", data);

export const updateAddress = (data: Address) => api.put("/address/update-address", data);

export const deleteAddress = (id: string) => api.delete("/address/delete-address", { data: { address_id: id } });

export const getAddress = (id: string) => api.get<{ data: Address }>("/address/get-address", { params: { address_id: id } });

export const getAllAddressByUserId = () =>
    api.get<{ data: Address[] }>("/address/getall-address-for-user");

export const getAllAddressByUserIdInParams = (userId: string) =>
    api.get<{ data: Address[] }>(`/address/getall-address-for-user/${userId}`);
