import { publicapi } from "./api.service";
import type { LoginCredentials, AuthUser, RegisterCredentials } from "../types/auth.types";
import type { AxiosResponse } from "axios";

export interface AuthResponse {
      message: string,
      data: AuthUser
}

export const login = async (l: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => {
   try {
      return await publicapi.post<AuthResponse>("/auth/login", l);
   } catch (err) {
      throw err;
   }
};
export const register = async (r: RegisterCredentials): Promise<AxiosResponse<AuthResponse>> => {
   try {
      return await publicapi.post<AuthResponse>("/auth/register", r);
   } catch (err) {
      throw err;
   }
}

