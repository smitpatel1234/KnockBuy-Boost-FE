import {publicapi}from "./api.service";
import { LoginCredentials, AuthUser } from "../types/auth.type";
import { AxiosResponse } from "axios";

export interface AuthResponse {
   user: AuthUser;
   token?: string;
}

export const login = async (l: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => {
   try {
      return await publicapi.post<AuthResponse>("/auth/login", l);
   } catch (err) {
      throw err;
   }
};


