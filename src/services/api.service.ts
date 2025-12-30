import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { getCookie, deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { number } from "zod";
type JwtPayload = {
  sub: string | undefined;
  role: "ADMIN" | "USER";
  exp: number;
};
axios.defaults.withCredentials = true;

const ISvalidateToken = (exp: number): boolean => {
  try {
 
    if (exp == 0) {
      return true;
    }
    if (exp < Date.now() / 1000) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const privateapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

privateapi.interceptors.request.use(
  (config) => {
    const expIn = Number.parseInt(getCookie("expIn")?.toString() || "0");
    if (!ISvalidateToken(expIn)) {
       publicapi
        .post("/auth/refresh-token")
        .then(() => {
        })
        .catch((err) => {
           redirect("/auth/login");
        });
    }

    console.log("[API REQUEST]", {
      method: config.method?.toUpperCase(),
      url: config.url,
      params: config.params,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

privateapi.interceptors.response.use(
  (response) => {
    console.log("[API RESPONSE]", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("[API RESPONSE ERROR]", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

const publicapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

publicapi.interceptors.request.use(
  (config) => {
    console.log("[API REQUEST]", {
      method: config.method?.toUpperCase(),
      url: config.url,
      params: config.params,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

publicapi.interceptors.response.use(
  (response) => {
    console.log("[API RESPONSE]", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("[API RESPONSE ERROR]", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default privateapi;
export { publicapi };
