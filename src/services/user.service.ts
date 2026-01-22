import api from "./api.service";
import type { UserProfile } from "../types/user.types";
import type { PageParams, PaginationResponse } from "../types/pagination.types";

export const getAllUsers = () => {
  return api.get<{ message: string; data: UserProfile[] }>("/user/get-all-user");
};


export const getAllUsersPage = async (params: PageParams): Promise<{ data: PaginationResponse<UserProfile> }> => {
  const response = await api.post<{ message: string; data: PaginationResponse<UserProfile> }>("/user/get-all-user-page", params);
  return response.data;
};

export const updateUser = (data: Partial<UserProfile>) =>
  api.put("/user/update-user", data);

export const getUser = (id: string) =>
  api.get<{ message: string; data: UserProfile }>(`/user/get-user/${id}`);

export const deleteUser = (id: string) => {
  return api.delete("/user/delete-user", { data: { user_id: id } });
};

